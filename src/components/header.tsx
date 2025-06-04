"use client";

import { Images } from "@/src/constant/images";
import {
  faBars,
  faCartShopping,
  faCaretDown,
  faSearch,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isLogin } from "@/lib/actions/auth";
import { Button } from "antd";

const Header = () => {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentLang =
    searchParams.get("lang") || localStorage.getItem("lang") || "en";
  const [scrollingUp, setScrollingUp] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollingUp(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    localStorage.setItem("lang", currentLang);
    i18n.changeLanguage(currentLang);
  }, [currentLang]);

  useEffect(() => {
    async function checkLoginStatus() {
      const loggedIn = await isLogin();
      setIsLoggedIn(loggedIn);
    }
    checkLoginStatus();
  }, []);

  return (
    <div>
      <div className="h-[75px] bg-[#ececec]">
        <header
          className={`bg-[#0B3D9180] w-full fixed left-0 right-0 z-50 transition-all duration-300 ${
            !scrollingUp ? "top-[-100px]" : "top-0"
          }`}
        >
          {/* Top bar */}
          <div className="bg-[#ffeb95] h-[30px] md:h-[25px] flex justify-between items-center text-[11px] md:text-[12px] px-4">
            <div className="flex items-center justify-between max-w-full mx-auto w-[1200px]">
              <p className="md:block hidden">
                TỔ YẾN - YẾN TƯƠI - TÁO TÀO - KỶ TỬ - HẠT CHIA
              </p>
              <p>HOTLINE: 0902816818 | Mở cửa 8:00 - 18:00 T2-CN</p>
            </div>
          </div>

          {/* Desktop + Mobile header */}
          <div className="bg-[#A20937] flex flex-col items-center">
            <div className="max-w-full w-[1200px] h-[65px] sm:h-[90px] justify-between sm:justify-start mx-auto flex items-center gap-4 px-4">
              {/* Logo */}
              <div
                className="lg:hidden text-white text-2xl cursor-pointer"
                onClick={() => setMobileMenuOpen(true)}
              >
                <FontAwesomeIcon icon={faBars} className="" />
              </div>
              <Image width={100} height={50} alt="" src={Images.logo} />
              <div className="text-white sm:hidden border border-white rounded-lg px-2 py-1 flex items-center gap-2">
                <Link href="/">
                  <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </div>

              {/* Mobile menu icon */}

              {/* Desktop search and badges */}
              <div className="hidden lg:flex items-center justify-start gap-5">
                <div className="relative sm:mr-4 w-[300px]">
                  <input
                    type="text"
                    placeholder={t("Tìm kiếm sản phẩm")}
                    className="px-2 sm:py-1 py-0 w-full bg-transparent rounded-2xl border border-white placeholder:text-[12px] focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent text-white">
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
                {["CHÍNH HÃNG", "CAM KẾT", "AN TÂM"].map((title, i) => (
                  <div className="flex gap-2" key={i}>
                    <Image
                      src={Images.checkYellow}
                      alt=""
                      className="w-[35px] h-[35px]"
                    />
                    <div>
                      <p className="text-[#ffeb95] text-[14px]">{title}</p>
                      <p className="text-white text-[12px]">
                        {i === 0
                          ? "Không Hàng Giả"
                          : i === 1
                          ? "Phục Vụ Tận Tâm"
                          : "Giá Luôn Tốt Nhất"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop menu */}
            <div className="hidden lg:flex max-w-full w-[1200px] h-[40px] text-[14px] justify-between mx-auto items-center gap-4">
              <div className="flex items-center  gap-4">
                {[
                  {
                    title: "Tổ Yến",
                    sub: ["Tổ Yến Tinh Chế", "Tổ Yến Sơ Chế", "Tổ Yến Thô"],
                  },
                  {
                    title: "Yến Chưng Tươi",
                  },
                  {
                    title: "Bổ Phẩm Khác",
                    sub: ["Nước Yến", "Hạt Chia", "Kỷ Tử"],
                  },
                  {
                    title: "Giới Thiệu",
                    sub: [
                      "Về Tổ Yến",
                      "Về Yến Sào Kim Yến",
                      "Chế Biến & Bảo Quản",
                      "Cẩm Nang & Tài Liệu",
                      "Phân Biệt Thật Giả",
                    ],
                  },
                  {
                    title: "Liên Hệ",
                  },
                ].map(({ title, sub }, i) => (
                  <div key={i} className="relative group p-1">
                    <p className="px-2 text-white">
                      {title}{" "}
                      {sub && (
                        <FontAwesomeIcon icon={faCaretDown} className="pl-2" />
                      )}
                    </p>
                    {sub && (
                      <ul className="absolute top-[50px] opacity-0 group-hover:opacity-100 group-hover:top-[30px] p-2 rounded-lg gap-2 flex flex-col text-black left-0 w-[150px] bg-white border border-gray-300 transition-all duration-500 invisible group-hover:visible">
                        {sub.map((item, j) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-white border border-white rounded-lg px-2 py-1 flex items-center gap-2">
                <Link href="/">
                  Giỏ Hàng <FontAwesomeIcon icon={faCartShopping} />
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div
        style={{
          boxShadow: "10px 2px 20px rgba(0, 0, 0, 0.4)",
        }}
        className={`fixed top-0 left-0 w-[270px] h-full bg-[#ff001f] z-[300] transform ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <p className="font-bold text-lg text-[#ffeb95]">Menu</p>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="bg-transparent text-[#ffeb95] text-2xl"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <ul className="flex flex-col gap-2 p-4 text-[#ffeb95] font-medium">
          <li>
            Tổ Yến
            <ul className="pl-4 border-l border-[#ffeb95] text-sm text-white">
              <li> Tổ Yến Tinh Chế</li>
              <li> Tổ Yến Sơ Chế</li>
              <li> Tổ Yến Thô</li>
            </ul>
          </li>
          <li>Yến Chưng Tươi</li>
          <li>
            Bổ Phẩm Khác
            <ul className="pl-4 border-l border-[#ffeb95] text-sm text-white">
              <li> Nước Yến</li>
              <li> Hạt Chia</li>
              <li> Kỷ Tử</li>
            </ul>
          </li>
          <li>
            Giới Thiệu
            <ul className="pl-4 border-l border-[#ffeb95] text-sm text-white">
              <li> Về Tổ Yến</li>
              <li> Về Yến Sào Kim Yến</li>
              <li> Chế Biến & Bảo Quản</li>
              <li> Cẩm Nang & Tài Liệu</li>
              <li> Phân Biệt Thật Giả</li>
            </ul>
          </li>
          <li>Liên Hệ</li>
        </ul>
      </div>

      <div className="fixed top-0 left-0 z-[200] w-[191px] hidden lg:block">
        <img src={Images.left.src} className="w-[191px] h-[623px]" />
      </div>
      <div className="fixed top-0 right-0 z-[200] w-[191px] hidden lg:block">
        <img src={Images.right.src} className="w-[191px] h-[623px]" />
      </div>
    </div>
  );
};

export default Header;
