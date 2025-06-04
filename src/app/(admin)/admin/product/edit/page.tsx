"use client";

import { Button, Form, Spin } from "antd";
import { CheckCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Product } from "@/src/constant/types";
import {
  getProductById,
  updateProduct,
} from "@/src/modules/services/productService";
import { useTranslation } from "react-i18next";
import ProductForm from "@/src/modules/product/ProductForm";
import { toast } from "sonner";

const EditProduct = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const fetchProduct = useCallback(async (id: string) => {
    setLoading(true);
    try {
      const res = await getProductById(id);
      const data = res?.data;
      if (data) {
        setProduct(data);
        form.setFieldsValue(data);
        const images =
          data.images?.map((img: { url: string }) => img.url) || [];
        setUploadedImages(images);
      }
    } catch {
      toast.error("Failed to fetch product.");
    }
    setLoading(false);
  }, []);

  const onFinish = async (values: Product) => {
    console.log("Form values:", values);

    const dataPayload = {
      ...values,
      price: Number(values.price),
      stock: Number(values.stock),
      images: uploadedImages.map((url) => ({ url })),
    };

    try {
      if (id) {
        await updateProduct(id, dataPayload);
        toast.success("Product updated successfully!");
        router.push("/admin/product");
      } else {
        toast.error("Invalid product ID.");
      }
    } catch {
      toast.error("Failed to update product. Please try again.");
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id, fetchProduct]);

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      {loading ? (
        <div className="flex items-center justify-center min-h-[500px]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="w-full">
          <h1 className="ml-[10px] text-3xl font-bold pb-6">
            {"Edit Product"}
          </h1>
          <ProductForm
            form={form}
            onFinish={onFinish}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
          <Button
            type="primary"
            htmlType="submit"
            onClick={() => onFinish(form.getFieldsValue())}
            icon={<CheckCircleIcon />}
          >
            {"Save Change"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
