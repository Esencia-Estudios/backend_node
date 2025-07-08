import { getClientsService } from "@/services/clientService";
import { ResponseHelper } from "@/helpers/response";

export const getClients = async () => {
  try {
    const clients = await getClientsService();
    return ResponseHelper.success(clients);
  } catch (error: any) {
    return ResponseHelper.handleError(error);
  }
};
