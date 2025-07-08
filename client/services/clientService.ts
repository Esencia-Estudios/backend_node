import { ClientRepository } from "@/repositories/clientRepository";

export const getClientsService = async () => {
    return await ClientRepository.findAll();
};
