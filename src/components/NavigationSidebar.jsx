import { MessageCircle } from "lucide-react";
import { NotebookPen } from "lucide-react";
import { LogOut } from "lucide-react";

import useAuthentication from "@/hooks/useAuthentication";

import { useNavigate } from "react-router-dom";

const NavigationSidebar = ({ activeTab, onTabChange }) => {
  const { logout } = useAuthentication();

  const navigate = useNavigate();

  return (
    <>
      <ul className="p-1">
        <p className="text-center">Echo</p>
      </ul>
      <ul className="flex flex-col gap-2">
        <li
          onClick={() => onTabChange(0)}
          className={`mx-auto ${activeTab === 0 && "bg-slate-400"}`}
        >
          <MessageCircle />
        </li>
        <li
          onClick={() => onTabChange(1)}
          className={`mx-auto ${activeTab === 1 && "bg-slate-400"}`}
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
