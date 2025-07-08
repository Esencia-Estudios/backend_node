import * as Yup from "yup";
import { EnterpriseRepository } from "@/repositories/enterpriseRepository";

// Esquema de validación para crear una Enterprise
export const enterpriseSchema = Yup.object().shape({
  name: Yup.string()
    .required("Enterprise name is required")
    .min(3, "Name must be at least 3 characters long"),

  alias: Yup.string()
    .min(2, "Alias must be at least 2 characters long")
    .notRequired(),

  nif: Yup.string()
    .required("NIF is required")
    .min(5, "NIF must be at least 5 characters long"),

  active: Yup.boolean().required("Active status is required"),

  obs: Yup.string().notRequired(),

  id_organitation: Yup.number()
    .required("Organization ID is required")
    .typeError("Organization ID must be a number"),

  id_enterprise_mother: Yup.number()
    .notRequired()
    .typeError("Enterprise mother ID must be a number"),
});

// Validación del ID (número, no UUID)
export const enterpriseIdSchema = Yup.object().shape({
  id: Yup.number()
    .required("Enterprise ID is required")
    .typeError("Enterprise ID must be a valid number"),
});

// Esquema de validación para actualización (campos opcionales)
export const enterpriseUpdateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters long")
    .notRequired(),

  alias: Yup.string()
    .min(2, "Alias must be at least 2 characters long")
    .notRequired(),

  nif: Yup.string()
    .min(5, "NIF must be at least 5 characters long")
    .notRequired(),

  active: Yup.boolean().notRequired(),

  obs: Yup.string().notRequired(),

  id_organitation: Yup.number()
    .typeError("Organization ID must be a number")
    .notRequired(),

  id_enterprise_mother: Yup.number()
    .typeError("Enterprise mother ID must be a number")
    .notRequired(),
});

// Validación de existencia única
export const validateUniqueEnterprise = async (data: {
  name: string;
  nif: string;
  alias?: string | null;
}) => {
  const { name, nif, alias } = data;

  const existingName = await EnterpriseRepository.findByEnterprisename(name);
  if (existingName) {
    throw new Error(`Enterprise "${name}" already exists.`);
  }

  const existingNif = await EnterpriseRepository.findByEnterprisenif(nif);
  if (existingNif) {
    throw new Error(`Enterprise with NIF "${nif}" already exists.`);
  }

  if (alias) {
    const existingAlias = await EnterpriseRepository.findByEnterpriseAlias(
      alias
    );
    if (existingAlias) {
      throw new Error(`Alias "${alias}" already exists.`);
    }
  }

  return true;
};

// Función para validar ID
export const validateEnterpriseIdParameters = async (data: { id: number }) => {
  return await enterpriseIdSchema.validate(data, { abortEarly: false });
};

// Función para validar creación
export const validateEnterpriseParameters = async (data: any) => {
  await enterpriseSchema.validate(data, { abortEarly: false });
  return await validateUniqueEnterprise(data);
};

// Función para validar actualización
export const validateEnterpriseUpdateParameters = async (data: any) => {
  return await enterpriseUpdateSchema.validate(data, { abortEarly: false });
};
