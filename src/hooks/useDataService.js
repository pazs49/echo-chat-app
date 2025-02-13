import dataService from "@/services/dataService";

const useDataService = () => {
  const getAllUsers = async () => {
    const data = await dataService.getAllUsers(
      JSON.parse(localStorage.getItem("auth"))
    );
    console.log(data, "service");
    return data;
  };

  const getAllUsersWithMessages = async () => {
    const users = await getAllUsers();
    const usersWithMessages = users.data.data.filter((user) => {
      console.log(user);
      return user;
    });
    console.log(usersWithMessages, "users with messages");
    return usersWithMessages;
  };

  const getMessagesById = async (auth, userId) => {
    const data = await dataService.getMessagesById(auth, userId);
    return data;
  };

  const sendMessageById = async (auth, userId, message) => {
    const data = await dataService.sendMessageById(auth, userId, message);
    return data;
  };

  const createChannelWithMembers = async (auth, members, name) => {
    const data = await dataService.createChannelWithMembers(
      auth,
      members,
      name
    );
    return data;
  };

  const getAllChannelsOfLoggedUser = async (auth) => {
    const data = await dataService.getAllChannelsOfLoggedUser(auth);
    return data;
  };

  const getChannelDetailsViaChannelID = async (auth, channelId) => {
    const data = await dataService.getChannelDetailsViaChannelID(
      auth,
      channelId
    );
    return data;
  };

  const sendChannelMessageById = async (auth, channelId, message) => {
    const data = await dataService.sendChannelMessageById(
      auth,
      channelId,
      message
    );
    return data;
  };

  const getChannelMessagesById = async (auth, channelId) => {
    const data = await dataService.getChannelMessagesById(auth, channelId);
    return data;
  };

  return {
    getAllUsers,
    getAllUsersWithMessages,
    getMessagesById,
    sendMessageById,
    createChannelWithMembers,
    getAllChannelsOfLoggedUser,
    getChannelDetailsViaChannelID,
    getChannelMessagesById,
    sendChannelMessageById,
  };
};
export default useDataService;
