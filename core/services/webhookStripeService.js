import { sendEmail } from "../helpers/mailer.js";
import { userCredentialsTemplate } from "../helpers/templateSendCredentials.js";
import { generateCredentials, generateUserCode } from "../helpers/utils.js";
import { createPayment } from "../repositories/paymentRepository.js";
import { createOrganizationService } from "./organizationService.js";
import { findPlanService } from "./planService.js";
import { findRole } from "./rolesPermissionsService.js";
import { createSubscriptionService } from "./subscriptionService.js";
import { createUser, getUsersCount } from "./userService.js";

export const webhookStripeService = async (payload) => {
  const payment_detail = payload?.payment_detail;
  const customer_detail = payment_detail?.customer_details;
  const metadata = payment_detail?.metadata;
  const organization_id = metadata?.organization_id;
  const customer_email = customer_detail?.email;

  //se registra el pago
  const payment = await createPayment(payload);

  //se generan credenciales para el usuario
  const { username, password } = generateCredentials(customer_detail);
  let user = {};
  let org = {};

  //se registra un usuario si no se ha creado si no se recibe el organization_id desde los metadata
  if (!organization_id) {
    const role_organization = await findRole({ name: "organization_owner" });

    //se crea un nuevo usuario con el rol de organization_owner
    const users = await getUsersCount();
    const user_code = generateUserCode(users + 1);

    user = await createUser({
      email: customer_email,
      roles_ids: [],
      username,
      password,
      role_id: role_organization?.id,
      user_code,
    });

    //se crea una organización nueva con los datos del usuario
    org = await createOrganizationService({
      name: username,
      email: customer_email,
    });
  }

  //se busca el plan para conocer su id
  const plan = await findPlanService({ slug: metadata?.plan_type });
  const sub = {
    payment_id: payment?.id,
    organization_id: organization_id || org?.id,
    plan_id: plan?.id,
  };

  //se crea la subscription para la organización
  const newSub = await createSubscriptionService(sub);

  //asignar los módulos a la organización

  //enviar correo para notificar la compra
  await sendEmail(
    customer_email,
    "Bienvenido a Esencia ERP - Credenciales de acceso",
    userCredentialsTemplate({
      userName: username,
      password: password,
      userEmail: customer_email,
      planName: plan?.name,
      planDetails: `ID PAGO: ${payment?.id} SUBSCRIPTION ID: ${newSub?.id}, el nombre de tu organización sera temporalmente tu 'username' podrás personalizarlo cuando gustes.`,
    })
  );
  1;

  return "Se ha activado la membresía";
};
