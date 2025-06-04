"use client";

import { Product } from "@/src/constant/types";
import { Button, Modal, Table } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { SorterResult } from "antd/es/table/interface";
import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteProduct, getProduct } from "../services/productService";

interface ListProductProps {
  searchTerm: string;
}

export default function ProductList({ searchTerm }: ListProductProps) {
  const [data, setData] = useState<Product[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalProducts, setTotalProducts] = useState(0);
  const [sortBy, setSortBy] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<string | undefined>();

  const showDeleteModal = (record: Product) => {
    setProductToDelete(record);
    setIsModalVisible(true);
  };

  const fetchProducts = async (
    page: number,
    limit: number,
    sortBy?: string,
    sortOrder?: string
  ) => {
    const response = await getProduct({
      page,
      limit,
      sortBy,
      sortOrder,
      search: searchTerm,
    });
    setData(response?.data ?? []);
    setTotalProducts(response?.total ?? 0);
  };

  useEffect(() => {
    fetchProducts(currentPage, pageSize, sortBy, sortOrder);
  }, [currentPage, pageSize, sortBy, sortOrder, searchTerm]);

  const handleDelete = () => {
    deleteProduct(String(productToDelete?.id ?? "")).then(() => {
      setIsModalVisible(false);
      setProductToDelete(null);
      fetchProducts(currentPage, pageSize);
    });
  };

  const handleTableChange = (
    pagination: TablePaginationConfig,
    _: Record<string, unknown>,
    sorter: SorterResult<Product> | SorterResult<Product>[]
  ) => {
    setCurrentPage(pagination.current ?? 1);
    setPageSize(pagination.pageSize ?? 5);
    if (!Array.isArray(sorter)) {
      setSortBy(sorter.field as string);
      setSortOrder(
        sorter.order === "ascend"
          ? "asc"
          : sorter.order === "descend"
          ? "desc"
          : undefined
      );
    }
  };

  const columns: ColumnsType<Product> = [
    {
      title: "Ảnh",
      dataIndex: ["images", 0, "url"],
      key: "image",
      render: (url: string) => (
        <Image src={url ?? ""} alt="product" width={100} height={100} />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name", sorter: true },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      sorter: true,
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Kho",
      dataIndex: "stock",
      key: "stock",
      sorter: true,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      sorter: true,
    },
    {
      title: "Danh mục",
      dataIndex: ["category", "name"],
      key: "category",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status?: boolean) => (status ? "Hiển thị" : "Ẩn"),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            danger
            onClick={() => showDeleteModal(record)}
            style={{ marginRight: 8 }}
          >
            Xóa
          </Button>
          <Button type="primary">
            <a href={`/admin/product/edit?id=${record.id}`}>Sửa</a>
          </Button>
        </>
      ),
    },
  ];

  if (!data || data.length === 0) {
    return (
      <div className="w-full mt-5">
        <h2 className="text-center text-xl font-semibold">
          Không có sản phẩm nào
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full mt-5">
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          total: totalProducts,
        }}
        onChange={handleTableChange}
      />

      <Modal
        title="Xác nhận xóa"
        open={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>
    </div>
  );
}
