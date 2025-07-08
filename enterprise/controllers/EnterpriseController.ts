import { getEnterpriseService } from "@/services/enterpriseService";
import { ResponseHelper } from "@/helpers/response";

export const getEnterprises = async () => {
  try {
    const clients = await getEnterpriseService();
    return ResponseHelper.success(clients);
  } catch (error: any) {
    return ResponseHelper.handleError(error);
  }
};
