import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import useSearch from "@/hooks/useSearch";
import useDataService from "@/hooks/useDataService";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddMemberToChannelModal({ channelDetails }) {
  console.log(channelDetails, "channel details");
  const [allUsers, setAllUsers] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const { setData, filteredData, search, searchTerm, setSearchTerm } =
    useSearch();

  const { getAllUsers } = useDataService();

  const navigate = useNavigate();

  const handleCreate = async () => {};

  const getAllMembers = async () => {
    const data = await getAllUsers();
    setAllUsers(data.data.data);
    const membersId = channelDetails.channel_members.map(
      (member) => member.user_id
    );
    const members = data.data.data.filter((user) =>
      membersId.includes(user.id)
    );
    console.log(members);
    return members;
  };

  useEffect(() => {
    const withoutMembers = allUsers.filter(
      (user) => !channelMembers.includes(user)
    );
    setData(withoutMembers);
  }, [searchTerm]);

  useEffect(() => {
    (async () => {
      setChannelMembers(await getAllMembers());
    })();
  }, [channelDetails.id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">{channelDetails.name}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-slate-600 text-slate-200">
        <DialogHeader>
          <DialogTitle>Add Members To Channel</DialogTitle>
          <DialogDescription className="text-slate-200">
            Select Members To Add
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2 ">
            <Input
              value={searchTerm}
              onChange={search}
              type="text"
              placeholder="Search Users"
              className="placeholder:text-white border-none bg-slate-800 text-white focus:border-indigo-500"
            />
            {searchTerm.length > 0 && (
              <div className="fixed top-[7.65rem] w-[90%] p-2 bg-slate-700 max-h-[20rem] overflow-y-auto no-scrollbar rounded-b-lg">
                <ul className="divide-y divide-slate-500">
                  {searchTerm.length > 0 &&
                    filteredData.map((item) => (
                      <li key={item.uid} className="p-[.5px]">
                        <button
                          onClick={() => {
                            setAddedUsers([...addedUsers, item]);
                            setSearchTerm("");
                          }}
                        >
                          {item.uid}
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        {/* Users display that has been added */}
        {addedUsers.length > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              {addedUsers.map((user) => (
                <div
                  key={user.uid}
                  className="flex items-center justify-between space-x-2"
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-200">{user.uid}</span>
                  </div>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setAddedUsers(
                        addedUsers.filter((u) => u.uid !== user.uid)
                      )
                    }
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* List of current members */}
        <ul>
          {channelMembers.map((member) => (
            <li key={member.id}>{member.uid}</li>
          ))}
        </ul>
        {/*  */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleCreate} type="button" variant="primary">
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemberToChannelModal;
