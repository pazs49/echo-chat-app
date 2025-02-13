import { useEffect, useLayoutEffect, useState } from "react";

const ChatBubble = ({ message, userId, type, loggedUID }) => {
  const [chatPosition, setChatPosition] = useState("");

  useLayoutEffect(() => {
    if (type === "messages") {
      setChatPosition(
        message.receiver.id === parseInt(userId) ? "ml-auto" : ""
      );
    } else if (type === "channel-messages") {
      setChatPosition(message.sender.uid === loggedUID ? "ml-auto" : "");
    }
  }, []);
  console.log(message);
  return (
    <li
      className={`flex flex-col bg-slate-600 w-fit p-2 rounded-md ${chatPosition}`}
    >
      <p>{message.body}</p>
    </li>
  );
};

export default ChatBubble;
