import { getSiteService } from "@/services/siteService";
import { ResponseHelper } from "@/helpers/response";

export const getSites = async () => {
  try {
    const sites = await getSiteService();
    return ResponseHelper.success(sites);
  } catch (error: any) {
    return ResponseHelper.handleError(error);
  }
};
