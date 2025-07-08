import { getDepartamentService } from "@/services/departamentService";
import { ResponseHelper } from "@/helpers/response";

export const getDepartaments = async () => {
  try {
    const departaments = await getDepartamentService();
    return ResponseHelper.success(departaments);
  } catch (error: any) {
    return ResponseHelper.handleError(error);
  }
};
