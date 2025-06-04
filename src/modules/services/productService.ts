import {
  Discount,
  DiscountListResponse,
  Product,
  ProductListResponse,
  ProductResponse,
  Publisher,
  PublisherListResponse,
} from "@/src/constant/types";
import { HttpClient } from "@/src/lib/HttpClient";

const API_PREFIX_PRODUCT_PATH = "/products";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5001";

const http = new HttpClient(BASE_URL);

export const getProduct = async (params?: {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}) => {
  const response = await http.get<ProductListResponse>(
    `${API_PREFIX_PRODUCT_PATH}`,
    {
      params,
    }
  );
  return response;
};

export const getProductByCategory = async (
  categorySlug?: string,
  params?: { page?: number; limit?: number }
) => {
  const response = await http.get<ProductListResponse>(
    `${API_PREFIX_PRODUCT_PATH}/category/${categorySlug}`,
    { params }
  );
  return response;
};

export const getAllPublishers = async () => {
  const response = await http.get<Publisher[]>(
    `${API_PREFIX_PRODUCT_PATH}/allpublishers`
  );
  return response;
};

export const getAllDiscount = async () => {
  const response = await http.get<Discount[]>(
    `${API_PREFIX_PRODUCT_PATH}/alldiscounts`
  );
  return response;
};

export const getProductById = (id: string) =>
  http.get<ProductResponse>(`${API_PREFIX_PRODUCT_PATH}/${id}`);

export const createProduct = (data: Partial<Product>) =>
  http.post<ProductResponse>(`${API_PREFIX_PRODUCT_PATH}`, data);

export const updateProduct = (id: string, data: Partial<Product>) =>
  http.put<ProductResponse>(`${API_PREFIX_PRODUCT_PATH}/${id}`, data);

export const deleteProduct = (id: string) =>
  http.delete<ProductResponse>(`${API_PREFIX_PRODUCT_PATH}/${id}`);
