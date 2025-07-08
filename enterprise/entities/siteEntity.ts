import * as yup from "yup";
import { validateUniqueSite } from "@/validators/siteValidators";

// Interfaz Site
export interface Site {
  name: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  country_short?: string | null;
  cdp?: string | null;
  lat?: number | null;
  long?: number | null;
  radius: number | null;
  obs?: string | null;
}

// Esquema de validación para creación de site
const siteSchema: yup.Schema<Site> = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  address: yup.string().nullable().notRequired(),
  city: yup.string().nullable().notRequired(),
  country: yup.string().nullable().notRequired(),
  country_short: yup.string().nullable().notRequired(),
  cdp: yup.string().nullable().notRequired(),
  lat: yup.number().nullable().notRequired(),
  long: yup.number().nullable().notRequired(),
  radius: yup.number().nullable().required("Radius is required"),
  obs: yup.string().nullable().notRequired(),
});

// Esquema de validación para ID (numérico)
const siteIdSchema: yup.Schema<{ id: number }> = yup.object().shape({
  id: yup.number().required("Site ID is required").integer().positive(),
});

// Esquema para actualización de site (todos campos opcionales)
const siteUpdateSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters long"),
  address: yup.string().nullable(),
  city: yup.string().nullable(),
  country: yup.string().nullable(),
  country_short: yup.string().nullable(),
  cdp: yup.string().nullable(),
  lat: yup.number().nullable(),
  long: yup.number().nullable(),
  radius: yup.number().nullable(),
  obs: yup.string().nullable(),
});

// Funciones de validación exportadas
export const validateSiteParameters = async (data: Site) => {
  await siteSchema.validate(data, { abortEarly: false });
  return await validateUniqueSite(data);
};

export const validateSiteIdParameters = async (data: { id: number }) => {
  return await siteIdSchema.validate(data, { abortEarly: false });
};

export const validateSiteUpdateParameters = async (data: Partial<Site>) => {
  return await siteUpdateSchema.validate(data, { abortEarly: false });
};
