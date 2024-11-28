import React from "react";
import { TiHeart } from "react-icons/ti";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center bg-tertiary text-white p-10 text-xs">
      Made with{" "}
      <span className="mx-1">
        <TiHeart className="text-red-500 text-xl" />
      </span>{" "}
      by Kamilah. 2024.
    </footer>
  );
}
