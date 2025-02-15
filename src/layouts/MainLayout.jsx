import NavigationSidebar from "../components/NavigationSidebar";
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatWindow from "@/components/chat/ChatWindow";

import { useState, useEffect } from "react";

import axios from "axios";

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState(0); //0=chats 1=notes

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <>
      <main className="flex flex-row h-screen">
        {/*  */}
        <section className="bg-slate-500 text-slate-100 flex-grow-[.05] flex flex-col justify-between border-r border-slate-400">
          <NavigationSidebar
            activeTab={activeTab}
            onTabChange={handleTabClick}
          />
        </section>
        {/*  */}
        <section className="bg-slate-600 text-slate-200 flex-[2] overflow-auto no-scrollbar border-r border-slate-400">
          {activeTab === 0 && <ChatSidebar />}
        </section>
        {/*  */}
        <section className="bg-slate-700 text-slate-300 flex-[1] flex-grow-[7] ">
          {activeTab === 0 && <ChatWindow />}
        </section>
        {/*  */}
      </main>
    </>
  );
};
export default MainLayout;
