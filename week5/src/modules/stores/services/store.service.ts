import { addStore } from "../repositories/store.repository.js";
import { CreateStoreRequest } from "../dtos/store.dto.js";

export const createStore = async (data: CreateStoreRequest) => {
  const storeId = await addStore(data);

  return {
    storeId,
  };
};