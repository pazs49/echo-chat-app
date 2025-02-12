import { useEffect, useLayoutEffect, useState } from "react";

const ChatBubble = ({ message, userId }) => {
  const [chatPosition, setChatPosition] = useState("");

  useLayoutEffect(() => {
    setChatPosition(message.receiver.id === parseInt(userId) ? "ml-auto" : "");
  }, []);

  return (
    <li
      className={`flex flex-col bg-slate-600 w-fit p-2 rounded-md ${chatPosition}`}
    >
      <p>{message.body}</p>
    </li>
  );
};

export default ChatBubble;
