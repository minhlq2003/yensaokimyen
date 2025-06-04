"use client";

import Image from "next/image";
import { Images } from "../constant/images";
import { Product } from "../constant/types";
import { useEffect, useState } from "react";
import { getProduct } from "../modules/services/productService";
import { ProductCard } from "./product-item";

function Home() {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProduct();
        if (!response?.status) {
          throw new Error("Network response was not ok");
        }
        const data = await response.data;
        setItems(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const categories = [
    { id: 1, name: "Tổ Yến", image: Images.toyen.src },
    { id: 2, name: "Yến Chưng Tươi", image: Images.yenchung.src },
    { id: 3, name: "Đông Trùng Hạ Thảo", image: Images.dongtrung.src },
    { id: 4, name: "Hồng Sâm", image: Images.hongsam.src },
    { id: 5, name: "Hắc Sâm", image: Images.samkho.src },
  ];

  return (
    <div className="py-2">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex-col gap-2">
          <Image
            width={1200}
            height={400}
            alt=""
            src={Images.banner1.src}
            className="mb-2"
          />
          <Image width={1200} height={200} alt="" src={Images.banner2.src} />
        </div>
        <div className="mx-2 md:mx-0">
          <div className="flex gap-2 my-4 sm:my-10 w-full overflow-x-auto whitespace-nowrap">
            {categories.map((category) => (
              <div
                key={category.id}
                className="pb-1 flex flex-col items-center rounded-lg w-[120px] md:w-[180px] h-[90px] justify-center gap-2 flex-shrink-0"
                style={{
                  boxShadow:
                    "0 1px 3px -2px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)",
                }}
              >
                <Image alt="" width={40} height={40} src={category.image} />
                <p className="text-[11px] md:text-[16px]">{category.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="sm:my-5 my-2 mx-2 md:mx-0">
          <div className="bg-[#ff001f] text-center w-full py-2 sm:py-3 text-white rounded-2xl font-bold text-[13px] sm:text-[23px]">
            TỔ YẾN
          </div>
        </div>
        <div className="mt-5">
          <h2 className="flex justify-between items-center text-[12px] md:text-[20px] font-semibold my-5">
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
            <span className="text-[#A20937] text-center mx-[15px]">
              TỔ YẾN SẠCH - TINH CHẾ
            </span>
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 px-2 gap-2">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="flex justify-between items-center text-[12px] md:text-[20px] font-semibold my-5">
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
            <span className="text-[#A20937] text-center mx-[15px]">
              TỔ YẾN SẠCH THƯỢNG HẠNG - SƠ CHẾ
            </span>
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 px-2 gap-2">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="flex justify-between items-center text-[12px] md:text-[20px] font-semibold my-5">
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
            <span className="text-[#A20937] text-center mx-[15px]">
              TỔ YẾN CÒN LÔNG - THÔ
            </span>
            <b className="bg-[#ffeb95] h-[2px] flex-1"></b>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 px-2 gap-2">
            {items.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
        <div className="sm:my-5 my-2 mx-2 md:mx-0">
          <div className="bg-[#ff001f] text-center w-full py-2 sm:py-3 text-white rounded-2xl font-bold text-[13px] sm:text-[23px]">
            YẾN CHƯNG TƯƠI
          </div>
          <p className="text-[12px] md:text-[16px]">Không có sản phẩm nào</p>
        </div>
        <div className="sm:my-5 my-2 mx-2 md:mx-0">
          <div className="bg-[#ff001f] text-center w-full py-2 sm:py-3 text-white rounded-2xl font-bold text-[13px] sm:text-[23px]">
            HẠT CHIA - KỶ TỬ
          </div>
          <p className="text-[12px] md:text-[16px]"> Không có sản phẩm nào</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
