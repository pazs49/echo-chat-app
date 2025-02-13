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

  const fetchAllUsersAndSetUsers = async () => {
    const data = await getAllUsers();
    const users = data.data.data;
    setUsers(users);
    return users;
  };

  const fetchAllChannels = async () => {
    const allChannels = await getAllChannelsOfLoggedUser(
      JSON.parse(localStorage.getItem("auth"))
    );
    if (!allChannels) return;
    return allChannels;
  };

  const fetchChannelsWithTheirLastMessagesAndSetChannels = async () => {
    const allChannels = await fetchAllChannels();
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
    fetchAllUsersAndSetUsers();
    fetchChannelsWithTheirLastMessagesAndSetChannels();
  }, []);

  useEffect(() => {
    // Combining users and channels to both get searched
    const allUsers = users;
    const allChannels = channels;
    const usersAndChannels = [...allUsers, ...allChannels];
    setData(usersAndChannels);
  }, [channels, users]);

  return (
    <section className="h-full flex flex-col relative">
      {/* Search */}
      <div className="p-2 border-slate-400 border-b">
        <Input
          onChange={search}
          className="w-full sticky top-2 max-h-8 min-h-8 z-[2] placeholder:text-white border-none bg-slate-800 text-white focus:border-indigo-500"
          type="text"
          placeholder="Search"
        />
      </div>
      {/* List of search results */}
      <ul className="absolute top-12 overflow-auto no-scrollbar max-h-[40rem] z-[2] divide-y divide-slate-500 rounded-b-lg w-full">
        {searchTerm.length > 0 &&
          filteredData.map((item) => (
            <li className="px-[20px] bg-slate-700" key={item.name || item.uid}>
              <div
                className="flex justify-between w-full cursor-pointer"
                onClick={() => {
                  if (item.name) {
                    navigate(`channel-messages/${item.id}`);
                  } else {
                    navigate(`messages/${item.id}`);
                  }
                }}
              >
                <span>{item.name ? item.name : item.uid}</span>
                <span className="font-semibold">
                  {item.name ? " Channel" : " User"}
                </span>
              </div>
            </li>
          ))}
      </ul>
      {/* Channel List */}

      <ul className="overflow-auto no-scrollbar h-full w-full z-[1] divide-y divide-slate-400">
        {channels.map((channel) => {
          return (
            <li
              className="last:mb-[2.5rem]"
              onClick={() => navigate(`channel-messages/${channel.id}`)}
              key={channel.id}
            >
              <div className="cursor-pointer p-2">
                <p className="font-semibold">{channel.name}</p>
                <p>
                  {/* Gets last message and renders it */}
                  {channel.lastMessage &&
                    channel.lastMessage.body &&
                    channel.lastMessage.body.substring(0, 20) +
                      (channel.lastMessage.body.length < 20 ? "" : "...")}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="fixed bottom-2 z-[2] ml-2">
        <CreateChannelModal onSetChannels={setChannels} users={users} />
      </div>
    </section>
  );
};
export default ChatSidebar;
