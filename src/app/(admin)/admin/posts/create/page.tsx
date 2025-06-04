"use client";

import { Button, Form, message } from "antd";
import Title from "antd/es/typography/Title";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { Post } from "@/src/constant/types";
import { createPost } from "@/src/modules/services/postService";
import { useTranslation } from "react-i18next";
import PostForm from "@/src/modules/post/PostForm";
import Publish from "@/src/modules/post/Publish";
import FeaturedImage from "@/src/modules/post/FeaturedImage";
import Categories from "@/src/modules/post/Categories";
import { toast } from "sonner";

export default function AddPost() {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [uploadedImage, setUploadedImage] = useState<string>("");
  const [categories, setCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("draft");

  const onFinish = async (values: Post) => {
    const slug = values.title?.trim().replace(/\s+/g, "-").toLowerCase() || "";
    const categoryString = Array.isArray(categories)
      ? categories.join(",")
      : "";
    const dataPayload: Post = {
      ...values,
      title: values.title,
      slug,
      content: values.content,
      category: categoryString,
      status: status,
      image: uploadedImage,
    };

    try {
      await createPost(dataPayload);
      toast.success(t("Post added successfully!"));
      form.resetFields();
      setUploadedImage("");
    } catch {
      toast.error(t("Failed to add post. Please try again."));
    }
  };

  return (
    <div className="min-h-[85vh] bg-white dark:bg-gray-900 flex flex-col items-center justify-start rounded-lg shadow-sm gap-4 px-4 pt-10">
      <div className="w-full">
        <h1 className="ml-[10px] text-3xl font-bold pb-6">
          {t("Create Post")}
        </h1>

        <div className="flex justify-between w-full">
          <PostForm
            form={form}
            onFinish={onFinish}
            uploadedImages={uploadedImage}
            setUploadedImages={setUploadedImage}
          />

          <div className="w-[22%] pl-5">
            <Publish
              onSubmit={() => onFinish(form.getFieldsValue())}
              setStatus={setStatus}
              status={status}
            />
            <FeaturedImage
              selectedMedia={uploadedImage}
              setSelectedMedia={setUploadedImage}
            />
            <Categories
              onChangeCategories={setCategories}
              selectedCategories={categories}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
