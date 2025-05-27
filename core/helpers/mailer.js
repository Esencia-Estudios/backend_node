import { URL_SEND_EMAIL } from "../config/const.js";

export const sendEmail = async (to, subject, html) => {
  const mail = await fetch(URL_SEND_EMAIL, {
    method: "POST",
    body: JSON.stringify({
      to,
      subject,
      html,
    }),
  });
  const response = await mail.json();
  return response;
};
