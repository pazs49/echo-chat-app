import { useEffect, useLayoutEffect, useState } from "react";

const ChatBubble = ({ message, userId, type, loggedUID }) => {
  // console.log(message, "message");
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
  return (
    <li
      className={`flex flex-col max-w-[30rem] break-words bg-slate-600 w-fit p-2 rounded-md ${chatPosition}`}
    >
      <p>{message.body}</p>
      <p className="text-xs">
        {type === "channel-messages" &&
          message.sender.uid !== loggedUID &&
          message.sender.uid}
      </p>
    </li>
  );
};

export default ChatBubble;
