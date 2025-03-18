import { getUsersService } from "../services/userService";
import { ResponseHelper } from "../helpers/response";

export const getUsers = async () => {
  try {
    // Código que puede lanzar un error
    return await getUsersService();
  } catch (error: unknown) {
    if (error instanceof Error) {
      return ResponseHelper.handleError(error);
    } else {
      return ResponseHelper.internalServerError("Unexpected error", String(error));
    }
  }
};
