import { DepartamentRepository } from "@/repositories/departamentRepository";

export const getDepartamentService = async () => {
  return await DepartamentRepository.findAll();
};
