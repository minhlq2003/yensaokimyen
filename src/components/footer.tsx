"use client";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import { Images } from "../constant/images";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import FacebookPagePlugin from "./facebook-plugin";

const Footer = () => {
  const { t } = useTranslation("common");

  return (
    <footer className="bg-[#a20937]  text-white sm:p-10 p-3 overflow-hidden">
      <div className="max-w-[1200px] w-full mx-auto pt-5 flex justify-between sm:flex-row flex-col gap-6 sm:gap-4">
        <div className="text-center sm:w-1/4 w-full flex items-center flex-col gap-3 sm:gap-5">
          <Image src={Images.logo.src} width={167} height={83} alt="" />
          <p className="sm:text-md text-[12px] sm:text-[14px] leading-6">
            Điều đặc biệt làm nên và chỉ có duy nhất ở Yến Sào Kim Yến là khách
            hàng không còn phải đau đầu chọn lựa và lo lắng về chất lượng, hiệu
            quả hay mẫu mã của sản phẩm nữa mà vẫn có giá thành luôn tốt nhất.
          </p>
          <p className="text-[#ffeb95] font-bold text-[14px] sm:text-[18px]">
            Tổ Yến - Yến Sào Kim Yến
          </p>
        </div>
        <div className="text-[12px] sm:text-[14px] sm:w-1/4 w-full flex items-start flex-col gap-3 sm:gap-5">
          <p>THÔNG TIN LIÊN HỆ</p>
          <div className="h-[3px] bg-[#FFFFFF4D] w-[30px] "></div>
          <p className="text-[#ffeb95] text-[11px] sm:text-[14px]">
            <FontAwesomeIcon icon={faStore} className="mr-1" /> CÔNG TY TNHH YẾN
            SÀO KIM YẾN
          </p>
          <Link
            href={"tel:0902816818"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-1" /> Hotline: 0902
            816 818
          </Link>
          <Link
            href={"mailTo:yensaokimyen@gmail.com"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-1" /> CSKH:
            yensaokimyen@gmail.com
          </Link>
          <Link
            href={
              "https://www.google.com/maps/place/Y%E1%BA%BFn+s%C3%A0o+Kim+Y%E1%BA%BFn/@9.6985465,106.2628203,19.05z/data=!4m14!1m7!3m6!1s0x31a03b8a960e6031:0x74cb3e82a7775c6e!2zWeG6v24gc8OgbyBLaW0gWeG6v24!8m2!3d9.6980083!4d106.2641017!16s%2Fg%2F11p_0n0fks!3m5!1s0x31a03b8a960e6031:0x74cb3e82a7775c6e!8m2!3d9.6980083!4d106.2641017!16s%2Fg%2F11p_0n0fks?hl=vi&entry=ttu&g_ep=EgoyMDI1MDUyOC4wIKXMDSoASAFQAw%3D%3D"
            }
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            <FontAwesomeIcon icon={faLocationDot} className="mr-1" /> Địa chỉ:
            Yến Sào Kim Yến, TT. Trà Cú, Trà Cú, Trà Vinh
          </Link>
        </div>
        <div className="text-[12px] sm:text-[14px] sm:w-1/4 w-full flex items-start flex-col gap-3 sm:gap-5">
          <p>HỖ TRỢ</p>
          <div className="h-[3px] bg-[#FFFFFF4D] w-[30px] "></div>
          <Link
            href={"/"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            Liên hệ
          </Link>
          <Link
            href={"/"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            Câu hỏi thường gặp
          </Link>
          <Link
            href={"/"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            Hướng dẫn thanh toán
          </Link>
          <Link
            href={"/"}
            className="text-[#ffeb95] text-[11px] sm:text-[14px]"
          >
            Chính sách đổi trả
          </Link>
          <Image src={Images.chungnhan.src} width={270} height={65} alt="" />
        </div>
        <div className="text-[14px] sm:w-1/4 w-full flex items-start flex-col gap-3 sm:gap-5">
          <FacebookPagePlugin />
        </div>
      </div>
      <div className="text-center mt-8 text-[12px] sm:text-sm sm:mb-0 mb-5 text-[#ffeb95]">
        <p>Copyright © 2025. Lý Quốc Minh.</p>
      </div>
    </footer>
  );
};

export default Footer;
