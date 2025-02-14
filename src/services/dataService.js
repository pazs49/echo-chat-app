import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const dataService = {
  getAllUsers: async (auth) => {
    try {
      const data = await axios.get(`${API_BASE_URL}/users`, {
        headers: {
          ...auth,
          "Content-Type": "application/json",
        },
      });
      return data;
    } catch (error) {
      console.log(error, "data service error");
    }
  },
  getMessagesById: async (auth, userId) => {
    try {
      const data = await axios.get(
        `${API_BASE_URL}/messages?receiver_id=${userId}&receiver_class=User`,
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      return data.data.data;
    } catch (error) {}
  },

  sendMessageById: async (auth, userId, message) => {
    try {
      const data = await axios.post(
        `${API_BASE_URL}/messages`,
        {
          receiver_id: userId,
          receiver_class: "User",
          body: message,
        },
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            "access-token": data.headers["access-token"],
            client: data.headers.client,
            expiry: data.headers.expiry,
            uid: data.headers.uid,
          })
        );

        console.log(localStorage.getItem("auth"));
      }
      return data;
    } catch (error) {
      console.log(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  },

  createChannelWithMembers: async (auth, members, channelName) => {
    try {
      const _members = members.map((member) => member.id);
      const data = await axios.post(
        `${API_BASE_URL}/channels`,
        {
          name: channelName,
          user_ids: _members,
        },
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Channel created", data.data.data);
      console.log("Channel created: ID", data.data.data.id);
      console.log("Channel created: Owner ID", data.data.data.owner_id);
      return data.data.data;
    } catch (error) {
      return {
        error: true,
        message: "Error creating channel, try again with a different name",
      };
    }
  },

  getAllChannelsOfLoggedUser: async (auth) => {
    try {
      const data = await axios.get(`${API_BASE_URL}/channels`, {
        headers: {
          ...auth,
          "Content-Type": "application/json",
        },
      });
      return data.data.data;
    } catch (error) {}
  },

  sendChannelMessageById: async (auth, channelId, message) => {
    try {
      const data = await axios.post(
        `${API_BASE_URL}/messages`,
        {
          receiver_id: channelId,
          receiver_class: "Channel",
          body: message,
        },
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      if (data) {
        localStorage.setItem(
          "auth",
          JSON.stringify({
            "access-token": data.headers["access-token"],
            client: data.headers.client,
            expiry: data.headers.expiry,
            uid: data.headers.uid,
          })
        );

        // console.log(localStorage.getItem("auth"));
      }
      return data;
    } catch (error) {
      console.log(
        "Login failed",
        error.response ? error.response.data : error.message
      );
    }
  },

  getChannelMessagesById: async (auth, channelId) => {
    try {
      const data = await axios.get(
        `${API_BASE_URL}/messages?receiver_id=${channelId}&receiver_class=Channel`,
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      return data.data.data;
    } catch (error) {}
  },

  getChannelDetailsViaChannelID: async (auth, channelId) => {
    try {
      const data = await axios.get(`${API_BASE_URL}/channels/${channelId}`, {
        headers: {
          ...auth,
          "Content-Type": "application/json",
        },
      });
      return data.data.data;
    } catch (error) {}
  },

  addMemberToChannel: async (auth, channelId, userId) => {
    try {
      const data = await axios.post(
        `${API_BASE_URL}/channel/add_member`,
        {
          id: channelId,
          member_id: userId,
        },
        {
          headers: {
            ...auth,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (error) {}
  },
};
export default dataService;
