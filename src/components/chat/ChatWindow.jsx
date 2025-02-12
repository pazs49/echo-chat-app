import ChatBubble from "./ChatBubble";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

import { useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import useDataService from "@/hooks/useDataService";

const ChatWindow = () => {
  const [messages, setMessages] = useState("");

  const [message, setMessage] = useState("");

  const messagesEndRef = useRef(null);

  const { id: idParam, type } = useParams(); // channel-messages or messages

  const { getMessagesById, sendMessageById } = useDataService();

  const id = useMemo(() => {
    return idParam;
  }, [idParam]);

  const loadMessages = async () => {
    const data = await getMessagesById(
      JSON.parse(localStorage.getItem("auth")),
      idParam
    );
    console.log(data);
    setMessages(data);
  };

  useEffect(() => {
    loadMessages();
  }, [id]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    id && (
      <div className="flex flex-col h-full p-2">
        <div
          ref={messagesEndRef}
          className="flex-col flex-grow overflow-y-scroll no-scrollbar"
        >
          <ul className="space-y-2 pb-2">
            {messages &&
              messages.map((message) => (
                <ChatBubble key={message.id} message={message} userId={id} />
              ))}
          </ul>
        </div>
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="Message"
          />
          <Button
            onClick={async () => {
              const data = await sendMessageById(
                JSON.parse(localStorage.getItem("auth")),
                id,
                message
              );

              console.log(data);
              setMessage("");
              await loadMessages();
            }}
          >
            Send
          </Button>
        </div>
      </div>
    )
  );
};
export default ChatWindow;
