import * as Yup from "yup";
import { DepartamentRepository } from "@/repositories/departamentRepository";

// Esquema de validación para creación de un departamento
export const departamentSchema = Yup.object().shape({
  nombre: Yup.string()
    .required("Department name is required")
    .min(3, "Name must be at least 3 characters long"),

  id_dep_mother: Yup.number()
    .nullable()
    .typeError("Mother department ID must be a number"),

  id_site: Yup.number().nullable().typeError("Site ID must be a number"),

  id_enterprise: Yup.number()
    .nullable()
    .typeError("Enterprise ID must be a number"),

  obs: Yup.string().nullable(),

  is_traffic: Yup.boolean()
    .required("Traffic flag is required")
    .typeError("Traffic must be true or false"),

  is_store: Yup.boolean()
    .required("Store flag is required")
    .typeError("Store must be true or false"),
});

// Esquema para validación de ID
export const departamentIdSchema = Yup.object().shape({
  id: Yup.number()
    .required("Department ID is required")
    .typeError("Department ID must be a number"),
});

// Esquema para actualización (todos los campos opcionales)
export const departamentUpdateSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .notRequired(),

  id_dep_mother: Yup.number()
    .nullable()
    .typeError("Mother department ID must be a number")
    .notRequired(),

  id_site: Yup.number()
    .nullable()
    .typeError("Site ID must be a number")
    .notRequired(),

  id_enterprise: Yup.number()
    .nullable()
    .typeError("Enterprise ID must be a number")
    .notRequired(),

  obs: Yup.string().nullable().notRequired(),

  is_traffic: Yup.boolean().notRequired(),

  is_store: Yup.boolean().notRequired(),
});

// Validación de unicidad (por nombre dentro de una empresa o site)
export const validateUniqueDepartament = async (data: {
  nombre: string;
  id_site?: number;
  id_enterprise?: number;
}) => {
  const existing = await DepartamentRepository.findByName(data.nombre);

  if (existing) {
    // Si deseas validar por sitio o empresa, aquí deberías comparar contextualmente
    if (
      (data.id_site && existing.id_site === data.id_site) ||
      (data.id_enterprise && existing.id_enterprise === data.id_enterprise)
    ) {
      throw new Error(
        `Department "${data.nombre}" already exists in this context.`
      );
    }
  }

  return true;
};

// Validación de ID
export const validateDepartamentIdParameters = async (data: { id: number }) => {
  return await departamentIdSchema.validate(data, { abortEarly: false });
};

// Validación para crear
export const validateDepartamentParameters = async (data: any) => {
  await departamentSchema.validate(data, { abortEarly: false });
  return await validateUniqueDepartament(data);
};

// Validación para actualizar
export const validateDepartamentUpdateParameters = async (data: any) => {
  return await departamentUpdateSchema.validate(data, { abortEarly: false });
};
