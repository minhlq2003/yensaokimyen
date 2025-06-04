"use client";

import { Button, Form } from "antd";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Product } from "@/src/constant/types";
import { createProduct } from "@/src/modules/services/productService";
import { useTranslation } from "react-i18next";
import ProductForm from "@/src/modules/product/ProductForm";
import { toast } from "sonner";

export default function AddProduct() {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const onFinish = async (values: Product) => {
    const dataPayload = {
      ...values,
      images: uploadedImages.map((url) => ({ url })),
    };

    try {
      await createProduct(dataPayload);
      toast.success("Product added successfully!");
      form.resetFields();
      setUploadedImages([]);
    } catch {
      toast.error("Failed to add product. Please try again.");
    }
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-full">
        <h1 className="ml-[10px] text-3xl font-bold pb-6">
          {t("Create Product")}
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
          icon={<PlusCircleIcon />}
        >
          {t("Add Product")}
        </Button>
      </div>
    </div>
  );
}
