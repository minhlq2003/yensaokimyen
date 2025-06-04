import React from "react";
import Image from "next/image";
import { Product } from "../constant/types";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="sm:w-[280px] w-full rounded-lg shadow-md border border-gray-200 bg-white overflow-hidden">
      <div className="relative w-full h-[170px] sm:h-[270px]">
        <Image
          src={product.images?.[0].url ?? ""}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-md"
        />
      </div>

      <div className="p-2">
        <h3 className="sm:text-sm text-[12px] font-medium text-center text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>

        <div className="relative h-4 sm:h-6 bg-pink-100 rounded-full my-1">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full text-white text-[10px] sm:text-xs px-2 flex items-center"
            style={{ width: "75%" }}
          >
            🔥 Đã bán {product.sold}
          </div>
        </div>

        {/* Giá */}
        <div className="text-center mt-1">
          <p className="line-through text-[12px] sm:text-sm text-gray-400">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
          <p className="text-red-600 text-[13px] sm:text-lg font-semibold">
            {product.price.toLocaleString("vi-VN")}₫
          </p>
        </div>

        {/* Giảm giá */}
        <div className="mt-2 text-center">
          <span className="bg-red-500 text-white text-[11px] sm:text-sm px-3 py-1 rounded-full">
            Giảm 0%
          </span>
        </div>
      </div>
    </div>
  );
};
