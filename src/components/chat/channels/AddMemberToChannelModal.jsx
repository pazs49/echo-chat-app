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

import { useToast } from "@/hooks/use-toast";

function AddMemberToChannelModal({ channelDetails, onUpdateChannel }) {
  const [allUsers, setAllUsers] = useState([]);
  const [channelMembers, setChannelMembers] = useState([]);
  const [addedUsers, setAddedUsers] = useState([]);

  const { setData, filteredData, search, searchTerm, setSearchTerm } =
    useSearch();

  const { getAllUsers, addMemberToChannel } = useDataService();

  const { toast } = useToast();

  const getAllMembers = async () => {
    const data = await getAllUsers();
    setAllUsers(data.data.data);
    const membersId = channelDetails.channel_members.map(
      (member) => member.user_id
    );
    const members = data.data.data.filter((user) =>
      membersId.includes(user.id)
    );
    // console.log(members);
    return members;
  };

  const resetModal = () => {
    setSearchTerm("");
    setAddedUsers([]);
  };

  const fetchAddMembersToChannel = async () => {
    for (const user of addedUsers) {
      const data = await addMemberToChannel(
        JSON.parse(localStorage.getItem("auth")),
        channelDetails.id,
        user.id
      );
      console.log(data, "added member fetch");
    }
    await onUpdateChannel();
    resetModal();
  };

  const handleAddMember = () => {
    if (addedUsers.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one user to add",
        variant: "destructive",
      });
      return;
    }
    fetchAddMembersToChannel();
  };

  useEffect(() => {
    // console.log("onUpdateChannel called");
    (async () => {
      setChannelMembers(await getAllMembers());
    })();
    // console.log("added users", addedUsers);
  }, [onUpdateChannel]);

  useEffect(() => {
    // prevent duplicates
    const withoutMembers = allUsers.filter(
      (user) => !channelMembers.includes(user) && !addedUsers.includes(user)
    );
    setData(withoutMembers);
  }, [searchTerm]);

  return (
    <Dialog key={channelMembers.length}>
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
                            if (
                              addedUsers.some((user) => user.uid === item.uid)
                            ) {
                              setSearchTerm("");
                              toast({
                                title: "Error",
                                description: "User already added",
                                variant: "destructive",
                              });
                              return;
                            }
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
        {/* Displays the users that has been added */}
        {addedUsers.length > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            <div className="grid flex-1 gap-2 max-h-[10rem] overflow-y-auto no-scrollbar">
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
        <ul className="max-h-[10rem] overflow-y-auto no-scrollbar">
          {channelMembers.map((member) => (
            <li key={member.id}>{member.uid}</li>
          ))}
        </ul>
        {/* Add Button */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={handleAddMember} type="button" variant="primary">
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddMemberToChannelModal;
