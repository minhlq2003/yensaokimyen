import { Form, Input, InputNumber, Select, FormInstance, Button } from "antd";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ModalSelectMedia from "@/src/modules/media/pages/ModalSelectMedia";
import { Category, Discount, Product } from "@/src/constant/types";
import { getCategories } from "../services/categoryService";
import { getAllDiscount } from "../services/productService";
import CKEditorComponent from "@/src/lib/ckeditor";

const { TextArea } = Input;

const ProductForm: React.FC<{
  form: FormInstance;
  onFinish: (values: Product) => void;
  uploadedImages: string[];
  setUploadedImages: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({ form, onFinish, uploadedImages, setUploadedImages }) => {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState<Category[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const categoryData = await getCategories({ limit: 1000 });
      const discountData = await getAllDiscount();
      setCategories(categoryData?.data ?? []);
      setDiscounts(discountData ?? []);
    })();
  }, []);

  const handleSelectMedia = (media: string) => {
    setUploadedImages([...uploadedImages, media]);
    setIsModalOpen(false);
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={() => onFinish(form.getFieldsValue())}
        className="w-full"
      >
        <div className="border border-[#d9d9d9] p-4 rounded-md">
          <Form.Item
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input placeholder="Nhập tên sản phẩm" />
          </Form.Item>

          <Form.Item label="Mô tả" name="description">
            <div className="">
              <CKEditorComponent
                value={form.getFieldValue("description")}
                onChange={(data: string) => {
                  form.setFieldsValue({ description: data });
                }}
              />
            </div>
          </Form.Item>

          <div className="flex gap-4">
            <Form.Item
              name="price"
              label="Giá"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
              className="w-1/3"
            >
              <InputNumber className="w-full" min={0} placeholder="VND" />
            </Form.Item>

            <Form.Item name="stock" label="Tồn kho" className="w-1/3">
              <InputNumber className="w-full" min={0} />
            </Form.Item>

            <Form.Item name="discount_id" label="Giảm giá" className="w-1/3">
              <Select placeholder="Chọn giảm giá">
                {discounts.map((d) => (
                  <Select.Option key={d.id} value={d.id}>
                    {d.code}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="flex gap-4">
            <Form.Item name="category_id" label="Danh mục" className="w-1/2">
              <Select placeholder="Chọn danh mục">
                {categories.map((cat) => (
                  <Select.Option key={cat.id} value={cat.id}>
                    {cat.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="brand" label="Thương hiệu" className="w-1/2">
              <Input placeholder="Nhập thương hiệu" />
            </Form.Item>
          </div>
        </div>

        <div className="border border-[#d9d9d9] p-4 rounded-md mt-4">
          <Form.Item label={t("Images")}>
            <Button type="primary" onClick={() => setIsModalOpen(true)}>
              {t("Add image")}
            </Button>
            <div className="flex gap-2 mt-2 flex-wrap">
              {uploadedImages.map((url, i) => (
                <div key={i} className="relative">
                  <img
                    src={url}
                    alt={`uploaded-${i}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <TrashIcon
                    onClick={() => handleRemoveImage(i)}
                    className="absolute top-0 right-0 text-red-500 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </Form.Item>
        </div>

        <div className="mt-4 border border-gray-300 p-4 rounded-md">
          <p className="font-semibold text-lg">{t("SEO")}</p>

          <Form.Item name="meta_title" label={t("Meta Title")}>
            <Input />
          </Form.Item>

          <Form.Item name="keywords" label={t("Meta Keywords")}>
            <Input />
          </Form.Item>

          <Form.Item name="meta_desc" label={t("Meta Description")}>
            <TextArea rows={3} />
          </Form.Item>
        </div>
      </Form>

      <ModalSelectMedia
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectMedia={handleSelectMedia}
      />
    </>
  );
};

export default ProductForm;
