import { SiteRepository } from "@/repositories/siteRepository";

export const getSiteService = async () => {
  return await SiteRepository.findAll();
};
