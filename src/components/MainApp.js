import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import { BsPlusCircle } from "react-icons/bs";
import NavigationLink from "./NavigationLink";
import AddExpensePage from "../pages/AddExpensePage.js";
import HomePage from "../pages/HomePage.js";

const MainApp = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className={`min-h-screen `}>
      <BrowserRouter>
        <header className=" p-1 px-4 flex justify-between items-center">
          <div className="flex justify-between items-center">
            <img src="logo192.png" width="55px" alt="" />
            <span className="ml-2 text-xl ">Expense Tracker</span>
          </div>
          <div>
            <button className="lg:hidden mr-4 text-gray-500 text-2xl" onClick={() => setOpened(!opened)}>
              ☰
            </button>
          </div>
        </header>
        <div className="flex">
          <nav className={`${opened ? "block" : "hidden"} lg:block  p-4 w-68`}>
            <NavigationLink label="Home" icon={<AiOutlineHome />} link="/" />
            <NavigationLink label="Add an Expense" icon={<BsPlusCircle />} link="/newExpense" />
          </nav>

          <main className="flex-grow p-6 bg-neutral-100">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/newExpense" element={<AddExpensePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default MainApp;
