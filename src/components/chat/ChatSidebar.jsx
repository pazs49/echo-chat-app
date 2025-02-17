import useSearch from "@/hooks/useSearch";
import useDataService from "@/hooks/useDataService";

import useSyncStore from "@/store/useSyncStore";

import { Skeleton } from "../ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { CreateChannelModal } from "./channels/CreateChannelModal";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import moment from "moment";

const ChatSidebar = () => {
  const { data: syncData, updateData } = useSyncStore();

  const { id: idParam } = useParams();

  const {
    getAllUsers,
    getAllUsersWithMessages,
    getAllChannelsOfLoggedUser,
    getChannelDetailsViaChannelID,
    getChannelMessagesById,
  } = useDataService();
  const { setData, filteredData, search, searchTerm, setSearchTerm } =
    useSearch();

  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
    if (!allChannels) {
      setIsLoading(false);
      return;
    }
    const allChannelsWithMessages = await Promise.all(
      allChannels.map(async (channel) => {
        const messages = await getChannelMessagesById(
          JSON.parse(localStorage.getItem("auth")),
          channel.id
        );
        const lastMessage = messages[messages.length - 1] || null;
        return { ...channel, lastMessage };
      })
    );
    setIsLoading(false);
    setChannels(allChannelsWithMessages);
  };

  channels.sort((a, b) => {
    const dateA = new Date(a.lastMessage?.created_at || a.updated_at).getTime();
    const dateB = new Date(b.lastMessage?.created_at || b.updated_at).getTime();
    return dateB - dateA;
  });

  useEffect(() => {
    fetchAllUsersAndSetUsers();
    fetchChannelsWithTheirLastMessagesAndSetChannels();
  }, [syncData]);

  useEffect(() => {
    // Combining users and channels to both get searched
    const allUsers = users;
    const allChannels = channels;
    const usersAndChannels = [...allUsers, ...allChannels];
    setData(usersAndChannels);
  }, [channels, users]);

  // For syncing of update : chatsidebar and chatwindow
  // Date.now is just used to have different data every time to cause a rerender
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newData = `new data ${Date.now()}`;

      updateData({ data: newData });
    }, 5000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <section className="h-full flex flex-col relative">
      {/* Search */}
      <div className="p-2 border-slate-400 border-b">
        <Input
          value={searchTerm}
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
                  setSearchTerm("");
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

      {!isLoading ? (
        <ul className="overflow-auto no-scrollbar h-full w-full z-[1] divide-y divide-slate-400">
          {channels.map((channel) => {
            const timestamp = moment(
              channel.lastMessage?.created_at || channel.updated_at
            ).fromNow();
            return (
              <li
                className="last:mb-[2.5rem]"
                onClick={() => navigate(`channel-messages/${channel.id}`)}
                key={channel.id}
              >
                <div
                  className={`cursor-pointer p-2 ${
                    parseInt(idParam) === channel.id && "bg-slate-700"
                  }`}
                >
                  <p className="font-semibold">{channel.name}</p>
                  <div className="flex justify-between">
                    <p>
                      {/* Gets last message and renders it */}
                      {channel.lastMessage &&
                        channel.lastMessage.body &&
                        channel.lastMessage.body.substring(0, 20) +
                          (channel.lastMessage.body.length < 20 ? "" : "...")}
                    </p>
                    <p>{timestamp}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="p-2 space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/4" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-2/4" />
          </div>
        </div>
      )}
      {/* Create Channel  */}
      <div className="fixed bottom-2 z-[2] ml-2">
        <CreateChannelModal
          onChannelCreated={fetchChannelsWithTheirLastMessagesAndSetChannels}
          users={users}
        />
      </div>
    </section>
  );
};
export default ChatSidebar;
