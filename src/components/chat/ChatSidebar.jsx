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

  const navigate = useNavigate();

  const fetchAllUsersAndSetDataUsers = async () => {
    const data = await getAllUsers();
    const users = data.data.data;
    setData(users);
    setUsers(users);
    return users;
  };

  const fetchChannelsWithTheirLastMessagesAndSetChannels = async () => {
    const allChannels = await getAllChannelsOfLoggedUser(
      JSON.parse(localStorage.getItem("auth"))
    );
    const allChannelsWithMessages = await Promise.all(
      allChannels.map(async (channel) => {
        const messages = await getChannelMessagesById(
          JSON.parse(localStorage.getItem("auth")),
          channel.id
        );
        const lastMessage = messages[messages.length - 1];
        return { ...channel, lastMessage };
      })
    );
    setChannels(allChannelsWithMessages);
  };

  useEffect(() => {
    fetchAllUsersAndSetDataUsers();
    fetchChannelsWithTheirLastMessagesAndSetChannels();
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
      <ul className="fixed top-12 overflow-auto no-scrollbar h-[40rem] z-[2]">
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
            <li
              onClick={() => navigate(`channel-messages/${channel.id}`)}
              key={channel.id}
            >
              <div className="cursor-pointer bg-black p-2">
                <p>{channel.name}</p>
                <p>
                  {channel.lastMessage &&
                    channel.lastMessage.body &&
                    channel.lastMessage.body}
                </p>
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
