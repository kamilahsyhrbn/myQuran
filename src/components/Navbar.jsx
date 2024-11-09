import React, { useEffect, useState } from "react";
import Logo from "../assets/Quran1.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <nav
      className={`fixed w-full z-20 top-0 start-0 md:transition-colors md:duration-300
        ${isScrolled || isOpen ? "bg-accent shadow-md" : "bg-transparent"}`}
    >
      <div className=" flex flex-wrap items-center justify-between mx-3 md:mx-8 p-4">
        <a
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse flex-1"
        >
          <img src={Logo} className="h-10" alt="MyQuran Logo" />
          <span className="self-center text-3xl font-extrabold whitespace-nowrap text-tertiary arabic">
            MyQuran
          </span>
        </a>

        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-600 rounded-lg md:hidden focus:outline-none"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0">
            <li>
              <a
                href="/"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/"
                    ? "text-white bg-primary md:bg-transparent md:text-primary font-semibold"
                    : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                }`}
              >
                Al-Quran
              </a>
            </li>
            <li>
              <a
                href="/hadits"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/hadits"
                    ? "text-white bg-primary md:bg-transparent md:text-primary font-semibold"
                    : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                }`}
              >
                Hadits
              </a>
            </li>
            <li>
              <a
                href="/doa"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/doa" ||
                  location.pathname === "/baca-doa/:doa"
                    ? "text-white bg-primary md:bg-transparent md:text-primary font-semibold"
                    : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                }`}
              >
                Doa
              </a>
            </li>
            <li>
              <a
                href="/asmaul-husna"
                className={`block py-2 px-3 rounded md:p-0 ${
                  location.pathname === "/asmaul-husna"
                    ? "text-white bg-primary md:bg-transparent md:text-primary font-semibold"
                    : "hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary"
                }`}
              >
                Asmaul Husna
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
