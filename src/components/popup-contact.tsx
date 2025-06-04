"use client";

import {
  faFacebookMessenger,
  faSignalMessenger,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import { Images } from "../constant/images";
import Link from "next/link";

const PopupContact = () => {
  return (
    <div className="relative">
      <Link
        target="_blank"
        href="https://www.facebook.com/messages/t/105026507836519"
        className={`fixed bottom-10 right-2 z-50 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] bg-[#0084ff] text-white p-2 rounded-full shadow-lg hover:bg-[#005bb5] transition-all duration-300`}
      >
        <FontAwesomeIcon icon={faFacebookMessenger} className="w-full h-full" />
      </Link>
      <Link
        target="_blank"
        className={`fixed bottom-[100px] right-2 z-50 h-[40px] sm:h-[50px] w-[40px] sm:w-[50px] rounded-full shadow-lg bg-[#0084ff]  transition-all duration-300`}
        href="https://zalo.me/0902816818"
      >
        <img
          alt=""
          src={Images.zalo.src}
          className="sm:w-full w-[40px] h-[40px] sm:h-full"
        />
      </Link>
    </div>
  );
};

export default PopupContact;
