import {
  User,
  UserResponse,
  ChangePasswordResponse,
  GetAddressResponse,
  Address,
  AddressResponse,
  AddNewAddressResponse,
} from "@/src/constant/types";
import { HttpClient } from "@/src/lib/HttpClient";

const API_PREFIX_PATH = "/user";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_USERSERVICE_URL ?? "http://localhost:5003";

const http = new HttpClient(BASE_URL);

export const getUserById = (id: string) =>
  http.get<User>(`${API_PREFIX_PATH}/${id}`);

export const getAllAddressByUserId = (userId: number) =>
  http.get<GetAddressResponse>(`${API_PREFIX_PATH}/alladdress/${userId}`);

export const getProfile = async (): Promise<UserResponse> => {
  const response = await http.get<UserResponse | null>(
    `${API_PREFIX_PATH}/profile`
  );
  if (!response) {
    console.log("Failed to fetch user profile");
    return {} as UserResponse;
  }
  return response;
};

export const signup = async (
  username: string,
  password: string,
  name: string | null | undefined,
  email: string
): Promise<UserResponse> => {
  const response = await http.post<UserResponse | null>(
    `${API_PREFIX_PATH}/signup`,
    {
      username,
      password,
      name,
      email,
    }
  );
  if (!response) {
    console.log("Failed to fetch user profile");
    return {} as UserResponse;
  }
  return response;
};

export const login = async (
  username: string,
  password: string
): Promise<UserResponse> => {
  const response = await http.post<UserResponse | null>(
    `${API_PREFIX_PATH}/login`,
    {
      username,
      password,
    }
  );
  if (!response) {
    return {} as UserResponse;
  }
  return response;
};

export const changePassword = (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  return http.post<ChangePasswordResponse>(
    `${API_PREFIX_PATH}/change-password`,
    {
      userId,
      currentPassword,
      newPassword,
    }
  );
};

export const uploadAvatar = (userId: number, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  return http.post<any>(`${API_PREFIX_PATH}/upload/${userId}`, formData);
};

export const updateUser = (
  userId: number,
  username: string,
  name: string,
  email: string,
  avatar?: string | null
): Promise<UserResponse | null> => {
  const payload: any = {
    username,
    name,
    email,
  };
  if (avatar !== undefined && avatar !== null) {
    payload.avatar = avatar;
  }
  return http.put<UserResponse>(
    `${API_PREFIX_PATH}/updateuser/${userId}`,
    payload
  );
};

export const getUserAddresses = (userId: string | number) => {
  http.get<GetAddressResponse>(`${API_PREFIX_PATH}/alladdress/${userId}`);
};

export const addNewAddress = (
  userId: number,
  address: String,
  receiverName: String,
  receiverPhone: String
) =>
  http.post<AddNewAddressResponse>(`${API_PREFIX_PATH}/addnewaddress`, {
    userId,
    address,
    receiverName,
    receiverPhone,
  });

export const updateAddress = (
  addressId: number,
  payload: Partial<Omit<Address, "id" | "user_id">>
) => {
  http.put<AddressResponse>(
    `${API_PREFIX_PATH}/updateaddress/${addressId}`,
    payload
  );
};

export const deleteAddress = (addressId: number) => {
  http.post<AddressResponse>(`${API_PREFIX_PATH}/deleteaddress/${addressId}`);
};
