import { EnterpriseRepository } from "@/repositories/enterpriseRepository";

export const getEnterpriseService = async () => {
  return await EnterpriseRepository.findAll();
};
