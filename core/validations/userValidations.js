import yup from "yup";
import { validateUniqueUser } from "../validators/userValidators.js";

const userSchema = yup.object().shape({
  user_code: yup
    .string()
    .required("User code is required")
    .matches(/^\d{4}$/, "User code must be a 4-digit number"),
  email: yup
    .string()
    .required("Email is required")
    .email("Email must be a valid email address"),
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one letter, one number, and one special character"
    ),
  is_active: yup.boolean(),
  is_staff: yup.boolean(),
  is_superuser: yup.boolean(),
  profile_image: yup.string().url("Profile image must be a valid URL"),
  hide_email: yup.boolean(),
  is_admin: yup.boolean(),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be either active or inactive"),
  is_primary_contact: yup.boolean(),
  job_title: yup.string().required("Job title is required"),
  disable_login: yup.boolean(),
  note: yup.string(),
  language: yup
    .string()
    .oneOf(["en", "es", "fr"], "Language must be one of: en, es, fr"),
  enable_web_notification: yup.boolean(),
  enable_email_notification: yup.boolean(),
  requested_account_removal: yup.boolean(),
  role_ids: yup.array().of(yup.number().required("Role ID must be a number")),
});

const userIdSchema = yup.object().shape({
  id: yup
    .string()
    .required("User ID is required")
    .matches(/^[0-9a-fA-F-]{36}$/, "User ID must be a valid UUID format"),
});

const userUpdateSchema = yup.object().shape({
  user_code: yup
    .string()
    .matches(/^\d{4}$/, "User code must be a 4-digit number")
    .notRequired(),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .notRequired(),
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters long")
    .notRequired(),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one letter, one number, and one special character"
    )
    .notRequired(),
  is_active: yup.boolean().notRequired(),
  is_staff: yup.boolean().notRequired(),
  is_superuser: yup.boolean().notRequired(),
  profile_image: yup
    .string()
    .url("Profile image must be a valid URL")
    .notRequired(),
  hide_email: yup.boolean().notRequired(),
  is_admin: yup.boolean().notRequired(),
  status: yup
    .string()
    .oneOf(["active", "inactive"], "Status must be either active or inactive")
    .notRequired(),
  is_primary_contact: yup.boolean().notRequired(),
  job_title: yup.string().notRequired(),
  disable_login: yup.boolean().notRequired(),
  note: yup.string().notRequired(),
  language: yup
    .string()
    .oneOf(["en", "es", "fr"], "Language must be one of: en, es, fr")
    .notRequired(),
  enable_web_notification: yup.boolean().notRequired(),
  enable_email_notification: yup.boolean().notRequired(),
  requested_account_removal: yup.boolean().notRequired(),
  role_ids: yup
    .array()
    .of(yup.number().required("Role ID must be a number"))
    .notRequired(),
});

export const validateUserIdParameters = async (userIdData) => {
  return await userIdSchema.validate(userIdData, { abortEarly: false });
};

export const validateUserParameters = async (userData) => {
  await userSchema.validate(userData, { abortEarly: false });
  const unique = await validateUniqueUser(userData);
  return unique;
};

export const validateUserUpdateParameters = async (userData) => {
  return await userUpdateSchema.validate(userData, { abortEarly: false });
};
