import * as yup from "yup";
import { validateUniqueEnterprise } from "@/validators/enterpriseValidators";

export interface Enterprise {
  name: string;
  alias?: string | null;
  nif: string;
  active: boolean;
  obs?: string | null;
  id_organitation: number;
  id_enterprise_mother?: number | null;
}

// Esquema de validación para creación de enterprise
const enterpriseSchema: yup.Schema<Enterprise> = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  alias: yup.string().nullable().notRequired(),
  nif: yup
    .string()
    .required("NIF is required")
    .min(5, "NIF must be at least 5 characters long"),
  active: yup.boolean().required("Active status is required"),
  obs: yup.string().nullable().notRequired(),
  id_organitation: yup
    .number()
    .required("Organization ID is required")
    .integer()
    .positive(),
  id_enterprise_mother: yup
    .number()
    .nullable()
    .notRequired()
    .integer()
    .positive(),
});

// Esquema de validación para ID (numérico)
const enterpriseIdSchema: yup.Schema<{ id: number }> = yup.object().shape({
  id: yup.number().required("Enterprise ID is required").integer().positive(),
});

// Esquema para actualización de enterprise (todos campos opcionales)
const enterpriseUpdateSchema = yup.object({
  name: yup.string().min(3, "Name must be at least 3 characters long"),
  alias: yup.string().nullable(),
  nif: yup.string().min(5, "NIF must be at least 5 characters long"),
  active: yup.boolean(),
  obs: yup.string().nullable(),
  id_organitation: yup.number().integer().positive(),
  id_enterprise_mother: yup.number().nullable().integer().positive(),
});

// Funciones de validación exportadas
export const validateEnterpriseParameters = async (data: Enterprise) => {
  await enterpriseSchema.validate(data, { abortEarly: false });
  return await validateUniqueEnterprise(data);
};

export const validateEnterpriseIdParameters = async (data: { id: number }) => {
  return await enterpriseIdSchema.validate(data, { abortEarly: false });
};

export const validateEnterpriseUpdateParameters = async (
  data: Partial<Enterprise>
) => {
  return await enterpriseUpdateSchema.validate(data, { abortEarly: false });
};
