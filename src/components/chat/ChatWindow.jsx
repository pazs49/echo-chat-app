import ChatBubble from "./ChatBubble";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import useDataService from "@/hooks/useDataService";
import useAuthentication from "@/hooks/useAuthentication";

import AddMemberToChannelModal from "./channels/AddMemberToChannelModal";

const ChatWindow = () => {
  const { getAuth } = useAuthentication();
  const loggedUID = getAuth().uid;

  const [messages, setMessages] = useState("");
  const [message, setMessage] = useState("");
  const [chatDetails, setChatDetails] = useState();

  const messagesEndRef = useRef(null);

  const { id: idParam, type } = useParams(); // channel-messages or messages

  const {
    getMessagesById,
    sendMessageById,
    getChannelMessagesById,
    sendChannelMessageById,
    getChannelDetailsViaChannelID,
    getAllUsers,
  } = useDataService();

  const id = useMemo(() => {
    return idParam;
  }, [idParam]);

  const sendMessage = async () => {
    let data;

    if (type === "messages") {
      data = await sendMessageById(
        JSON.parse(localStorage.getItem("auth")),
        id,
        message
      );
    } else if (type === "channel-messages") {
      data = await sendChannelMessageById(
        JSON.parse(localStorage.getItem("auth")),
        id,
        message
      );
    }

    console.log(data);
    setMessage("");
    await loadMessages();
  };

  const loadMessages = async () => {
    let data;
    if (type === "messages") {
      data = await getMessagesById(
        JSON.parse(localStorage.getItem("auth")),
        idParam
      );
    } else if (type === "channel-messages") {
      data = await getChannelMessagesById(
        JSON.parse(localStorage.getItem("auth")),
        idParam
      );
    }
    console.log(data);
    setMessages(data);
  };

  const getChatDetails = async () => {
    let data;
    if (type === "messages") {
      const allUsers = await getAllUsers(
        JSON.parse(localStorage.getItem("auth"))
      );
      data = allUsers.data.data.find((user) => user.id === parseInt(idParam));
      console.log(data, "all");
      setChatDetails(data);
    } else if (type === "channel-messages") {
      data = await getChannelDetailsViaChannelID(
        JSON.parse(localStorage.getItem("auth")),
        idParam
      );
      console.log(data);
      setChatDetails(data);
    }
  };

  useEffect(() => {
    loadMessages();
    getChatDetails();
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    id && (
      <div className="flex flex-col h-full">
        <div
          ref={messagesEndRef}
          className="flex-col flex-grow overflow-y-scroll no-scrollbar"
        >
          {/* Chat Header */}
          <div className="sticky top-0 bg-slate-600 h-[49px] w-full border-b border-slate-400 flex items-center p-2">
            <p>
              {/* Channels */}

              {chatDetails?.name && (
                <AddMemberToChannelModal channelDetails={chatDetails} />
              )}
            </p>
            <p>
              {/* Users */}
              {chatDetails?.email && (
                <Button variant="link">{chatDetails.email}</Button>
              )}
            </p>
            {/* <p>{chatDetails && (chatDetails.name || chatDetails.email)}</p> */}
          </div>
          {/*  */}
          <ul className="space-y-2 pb-2 p-2">
            {messages &&
              messages.map((message) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  loggedUID={loggedUID}
                  userId={id}
                  type={type}
                />
              ))}
          </ul>
        </div>
        <div className="flex gap-2 p-2">
          <Input
            className="placeholder:text-white border-none bg-slate-800 text-white focus:border-indigo-500"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Message"
          />
          <Button variant="primary" type="submit" onClick={sendMessage}>
            Send
          </Button>
        </div>
      </div>
    )
  );
};
export default ChatWindow;
