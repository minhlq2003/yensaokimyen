"use client";

import { Images } from "@/src/constant/images";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  faBagShopping,
  faBars,
  faCaretDown,
  faSearch,
  faTableCellsLarge,
  faTriangleExclamation,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isLogin, logout } from "@/lib/actions/auth";
import { faTriangleCircleSquare } from "@fortawesome/free-solid-svg-icons/faTriangleCircleSquare";

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

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrollingUp(currentScrollPos < prevScrollPos);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const changeLanguage = (newLang: string) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);

    const params = new URLSearchParams(searchParams);
    params.set("lang", newLang);
    router.push(`${pathname}?${params.toString()}`);
  };

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
          <div className="bg-[#ffeb95] h-[25px] flex justify-between items-center text-[12px]">
            <div className="flex items-center justify-between max-w-full mx-auto w-[1200px]">
              <p>TỔ YẾN - YẾN TƯƠI - TÁO TÀO - KỶ TỬ - HẠT CHIA</p>
              <p>HOTLINE: 0902816818 | Mở cửa 8:00 - 18:00 T2-CN</p>
            </div>
          </div>
          <div className="bg-[#a20937] flex flex-col items-center">
            <div className="max-w-full w-[1200px] h-[90px] mx-auto flex items-center gap-4">
              <Image alt="" src={Images.logo} />
              <div className="flex items-center justify-start gap-5">
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
                <div className="flex gap-2">
                  <Image
                    src={Images.checkYellow}
                    alt=""
                    className="w-[35px] h-[35px]"
                  />
                  <div>
                    <p className="text-[#ffeb95] text-[14px]">CHÍNH HÃNG</p>
                    <p className="text-white text-[12px]">Không Hàng Giả</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Image
                    src={Images.checkYellow}
                    alt=""
                    className="w-[35px] h-[35px]"
                  />
                  <div>
                    <p className="text-[#ffeb95] text-[14px]">CAM KẾT</p>
                    <p className="text-white text-[12px]">Phục Vụ Tận Tâm</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Image
                    src={Images.checkYellow}
                    alt=""
                    className="w-[35px] h-[35px]"
                  />
                  <div>
                    <p className="text-[#ffeb95] text-[14px]">AN TÂM</p>
                    <p className="text-white text-[12px]">Giá Luôn Tốt Nhất</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="max-w-full w-[1200px] h-[40px] text-[14px] mx-auto flex items-center gap-4">
              <div className="relative group p-1">
                <p className="px-2 text-white">
                  Tổ Yến <FontAwesomeIcon icon={faCaretDown} className="pl-2" />
                </p>
                <ul className="absolute top-[50px] opacity-0 group-hover:opacity-100 group-hover:top-[30px] p-2 rounded-lg gap-2 flex flex-col text-black left-0 w-[150px] bg-white border border-gray-300 transition-all duration-500 invisible group-hover:visible">
                  <li>Tổ Yến Tinh Chế</li>
                  <li>Tổ Yến Sơ Chế</li>
                  <li>Tổ Yến Thô</li>
                </ul>
              </div>
            </div>
          </div>
        </header>
      </div>

      <div className="fixed sm:hidden bottom-0 left-0 right-0 bg-white translate-x-0 z-50 py-3">
        <ul className="flex justify-evenly">
          <li>
            <Link href="/" className="flex flex-col">
              <FontAwesomeIcon icon={faBars} />
              {t("Home")}
            </Link>
          </li>
          <li>
            <Link href="/category" className="flex flex-col">
              <FontAwesomeIcon icon={faTableCellsLarge} />
              {t("Category")}
            </Link>
          </li>
          <li>
            <Link href="/cart" className="flex flex-col">
              <FontAwesomeIcon icon={faBagShopping} />
              {t("Cart")}
            </Link>
          </li>
          <li>
            <Link href="/account" className="flex flex-col">
              <FontAwesomeIcon icon={faUser} />
              {t("Account")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
