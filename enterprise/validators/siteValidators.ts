import * as Yup from "yup";
import { SiteRepository } from "@/repositories/siteRepository";

// Esquema de validación para crear un Site
export const siteSchema = Yup.object().shape({
  name: Yup.string()
    .required("Site name is required")
    .min(3, "Name must be at least 3 characters long"),

  address: Yup.string().nullable().notRequired(),

  city: Yup.string().nullable().notRequired(),

  country: Yup.string().nullable().notRequired(),

  country_short: Yup.string()
    .nullable()
    .notRequired()
    .max(3, "Country short code must be at most 3 characters"),

  cdp: Yup.string().nullable().notRequired(),

  lat: Yup.number()
    .nullable()
    .notRequired()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),

  long: Yup.number()
    .nullable()
    .notRequired()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),

  radius: Yup.number()
    .nullable()
    .notRequired()
    .min(0, "Radius must be a positive number"),

  obs: Yup.string().nullable().notRequired(),
});

// Validación del ID (numérico)
export const siteIdSchema = Yup.object().shape({
  id: Yup.number()
    .required("Site ID is required")
    .typeError("Site ID must be a valid number"),
});

// Esquema de validación para actualización (campos opcionales)
export const siteUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .notRequired(),

  address: Yup.string().nullable().notRequired(),

  city: Yup.string().nullable().notRequired(),

  country: Yup.string().nullable().notRequired(),

  country_short: Yup.string()
    .nullable()
    .max(3, "Country short code must be at most 3 characters")
    .notRequired(),

  cdp: Yup.string().nullable().notRequired(),

  lat: Yup.number()
    .nullable()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90")
    .notRequired(),

  long: Yup.number()
    .nullable()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180")
    .notRequired(),

  radius: Yup.number()
    .nullable()
    .min(0, "Radius must be a positive number")
    .notRequired(),

  obs: Yup.string().nullable().notRequired(),
});

// Validación de existencia única (ejemplo solo nombre único)
export const validateUniqueSite = async (data: { name: string }) => {
  const existingSite = await SiteRepository.findByName(data.name);
  if (existingSite) {
    throw new Error(`Site with name "${data.name}" already exists.`);
  }
  return true;
};

// Función para validar ID
export const validateSiteIdParameters = async (data: { id: number }) => {
  return await siteIdSchema.validate(data, { abortEarly: false });
};

// Función para validar creación
export const validateSiteParameters = async (data: any) => {
  await siteSchema.validate(data, { abortEarly: false });
  return await validateUniqueSite(data);
};

// Función para validar actualización
export const validateSiteUpdateParameters = async (data: any) => {
  return await siteUpdateSchema.validate(data, { abortEarly: false });
};
