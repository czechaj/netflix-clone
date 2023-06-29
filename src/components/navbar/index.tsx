import { useEffect, useCallback, useState } from "react";
import { ChevronDownIcon, Logo } from "../icons";
import { NavbarItem } from "./navbar-item";
import { MobileDropdown } from "./mobile-dropdown";
import { SearchIcon } from "../icons/search";
import { BellIcon } from "../icons/bell";
import Image from "next/image";
import { AccountDropdown } from "./account-dropdown";

const TOP_OFFSET = 60;

export const Navbar = () => {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileDropdown = useCallback(
    () => setShowMobileDropdown((prev) => !prev),
    []
  );
  const toggleAccountDropdown = useCallback(
    () => setShowAccountDropdown((prev) => !prev),
    []
  );

  return (
    <nav className="w-full fixed z-30 ">
      <div
        className={`flex flex-row items-center pr-12 md:px-16 transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <Logo />
        <div className="flex-row ml-8 gap-x-6 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Movies" />
          <NavbarItem label="My List" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="Browse by Language" />
        </div>

        <div
          onClick={toggleMobileDropdown}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white">Browse</p>
          <span
            className={`text-white transition ${
              showMobileDropdown ? "rotate-180" : "rotate-0"
            }`}
          >
            <ChevronDownIcon />
          </span>
          <MobileDropdown visible={showMobileDropdown} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center ">
          <span className="text-white">
            <SearchIcon />
          </span>
          <span className="text-white">
            <BellIcon />
          </span>
          <div
            onClick={toggleAccountDropdown}
            className="flex flex-row items-center gap-1 cursor-pointer relative"
          >
            <div className="flex items-center w-6 h-6 lg-w-10 lg:h-10 rounded-md overflow-hidden ">
              <Image
                width={150}
                height={150}
                alt="avatar"
                src={"/images/avatar-3.png"}
              />
            </div>
            <span
              className={`text-white transition ${
                showAccountDropdown ? "rotate-180" : "rotate-0"
              }`}
            >
              <ChevronDownIcon />
            </span>
            <AccountDropdown visible={showAccountDropdown} />
          </div>
        </div>
      </div>
    </nav>
  );
};

/* 
       <button
            onClick={() => signOut()}
            className="bg-white rounded-sm px-2"
          >
            Sign out
          </button> * 
*/
