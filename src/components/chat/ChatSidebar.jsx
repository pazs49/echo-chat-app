import useSearch from "@/hooks/useSearch";
import useDataService from "@/hooks/useDataService";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { CreateChannelModal } from "./channels/CreateChannelModal";

import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ChatSidebar = () => {
  const {
    getAllUsers,
    getAllUsersWithMessages,
    getAllChannelsOfLoggedUser,
    getChannelDetailsViaChannelID,
    getChannelMessagesById,
  } = useDataService();
  const { setData, filteredData, search, searchTerm } = useSearch();

  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  const navigate = useNavigate();

  const getLastMessages = async (channels) => {
    channels.map(async (channel) => {
      const data = await getChannelMessagesById(
        JSON.parse(localStorage.getItem("auth")),
        channel.id
      );
      setLastMessages((prev) => [...prev, data]);
    });
  };

  const fetchAllUsers = async () => {
    const data = await getAllUsers();
    const users = data.data.data;
    setData(users);
    setUsers(users);
    return users;
  };

  useEffect(() => {
    const fetchData = async () => {
      const allChannels = await getAllChannelsOfLoggedUser(
        JSON.parse(localStorage.getItem("auth"))
      );
      setChannels(allChannels);
    };

    fetchData();
    fetchAllUsers();
  }, []);

  return (
    <section className="p-2 h-full flex flex-col relative">
      {/* Search */}
      <Input
        onChange={search}
        className="w-full sticky top-2 max-h-8 min-h-8 z-[2] bg-yellow-200"
        type="text"
        placeholder="Search"
      />
      <ul className="fixed top-12 overflow-auto no-scrollbar h-[40rem]">
        {searchTerm.length > 0 &&
          filteredData.map((item) => (
            <li key={item.uid}>
              <button
                onClick={() => {
                  navigate(`messages/${item.id}`);
                }}
              >
                {item.uid + " " + item.id}
              </button>
            </li>
          ))}
      </ul>
      {/* Channel List */}

      <ul className="absolute top-12 overflow-auto no-scrollbar h-full w-full z-[1]">
        {channels.map((channel) => {
          return (
            <li key={channel.id}>
              <div className="cursor-pointer bg-black p-2">
                <p>{channel.name}</p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="fixed bottom-2 z-[2]">
        <CreateChannelModal onSetChannels={setChannels} users={users} />
      </div>
    </section>
  );
};
export default ChatSidebar;
