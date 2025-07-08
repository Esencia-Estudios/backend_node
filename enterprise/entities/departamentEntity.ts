import * as yup from "yup";
import { validateUniqueDepartament } from "@/validators/departamentValidators";

// Interfaz Departament
export interface Departament {
  nombre: string;
  id_dep_mother?: number | null;
  id_site?: number | null;
  id_enterprise?: number | null;
  obs?: string | null;
  is_traffic: boolean;
  is_store: boolean;
}

// Esquema de validación para creación
const departamentSchema: yup.Schema<Departament> = yup.object().shape({
  nombre: yup
    .string()
    .required("Nombre is required")
    .min(3, "Nombre must be at least 3 characters long"),
  id_dep_mother: yup.number().nullable().positive().integer(),
  id_site: yup.number().nullable().positive().integer(),
  id_enterprise: yup.number().nullable().positive().integer(),
  obs: yup.string().nullable(),
  is_traffic: yup.boolean().required("Traffic flag is required"),
  is_store: yup.boolean().required("Store flag is required"),
});

// Esquema de validación para ID (numérico)
const departamentIdSchema: yup.Schema<{ id: number }> = yup.object().shape({
  id: yup.number().required("Departament ID is required").integer().positive(),
});

// Esquema para actualización (todos campos opcionales)
const departamentUpdateSchema = yup.object({
  nombre: yup.string().min(3, "Nombre must be at least 3 characters long"),
  id_dep_mother: yup.number().nullable().positive().integer(),
  id_site: yup.number().nullable().positive().integer(),
  id_enterprise: yup.number().nullable().positive().integer(),
  obs: yup.string().nullable(),
  is_traffic: yup.boolean(),
  is_store: yup.boolean(),
});

// Función para validar creación
export const validateDepartamentParameters = async (data: Departament) => {
  await departamentSchema.validate(data, { abortEarly: false });

  return await validateUniqueDepartament({
    nombre: data.nombre,
    id_site: data.id_site ?? undefined,
    id_enterprise: data.id_enterprise ?? undefined,
  });
};

// Función para validar ID
export const validateDepartamentIdParameters = async (data: { id: number }) => {
  return await departamentIdSchema.validate(data, { abortEarly: false });
};

// Función para validar actualización
export const validateDepartamentUpdateParameters = async (
  data: Partial<Departament>
) => {
  return await departamentUpdateSchema.validate(data, { abortEarly: false });
};
