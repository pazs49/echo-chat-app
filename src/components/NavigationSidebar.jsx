import { MessageCircle } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { LogOut } from "lucide-react";
import { MessageSquareHeart } from "lucide-react";

import useAuthentication from "@/hooks/useAuthentication";

import { useNavigate } from "react-router-dom";

const activeTabStyle = "bg-slate-400 p-2 rounded-full hover:bg-slate-300";

const NavigationSidebar = ({ activeTab, onTabChange }) => {
  const { logout } = useAuthentication();

  const navigate = useNavigate();
  return (
    <>
      <ul className="px-1 py-2 flex flex-col items-center">
        <MessageSquareHeart />
        <p className="text-center">echo</p>
      </ul>
      <ul className="flex flex-col gap-2">
        <li
          onClick={() => onTabChange(0)}
          className={`mx-auto ${activeTab === 0 && activeTabStyle}`}
        >
          <MessageCircle />
        </li>
        <li
          onClick={() => onTabChange(1)}
          className={`mx-auto ${activeTab === 1 && activeTabStyle}`}
        >
          <NotebookPen />
        </li>
      </ul>
      <ul>
        <li
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="pb-2"
        >
          <LogOut className="mx-auto" />
        </li>
      </ul>
    </>
  );
};
export default NavigationSidebar;
