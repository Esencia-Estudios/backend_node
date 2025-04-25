export const userCredentialsTemplate = ({
  userName,
  userEmail,
  password,
  planName,
  planDetails,
}) => {
  return `
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>Bienvenido a Esencia Estudio</title>
    <style>
      :root {
        --primary-color: #1890ff;
        --secondary-color: #17b8a6;
        --text-color: #333333;
        --background-color: #f0f0f0;
        --card-color: #eaeaea;
        --success-color: #52c41a;
        --border-color: #99a1af;
        --button-text-color: #eaeaea;
      }
    </style>
  </head>
  <body style="margin:0; padding:20px; background-color:var(--background-color); font-family:Arial, sans-serif; color:var(--text-color);">
    <table align="center" cellpadding="0" cellspacing="0" style="border-collapse:collapse; width:auto; max-width:600px; background-color:var(--card-color); border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.1); border:1px solid var(--border-color); overflow:hidden;">
      <tr>
        <td align="center" style="padding: 30px 0; background-color:var(--primary-color);">
          <img src="https://lh3.googleusercontent.com/a/ACg8ocKe-Ems31D3KfAvHQBNbBMbd0rMILKDxLNn_tZb4BfZT5EZaqE=s288-c-no" alt="Logo" width="50" style="display:block; margin-bottom:10px;" />
          <h1 style="color:var(--button-text-color); margin:0; font-size:24px;">¡Bienvenido a Esencia Estudio!</h1>
        </td>
      </tr>
      <tr>
        <td style="padding: 25px;">
          <p style="font-size:16px; line-height:1.5; margin-bottom:20px;">Hola <strong>${userName}</strong>,</p>

          <p style="font-size:16px; line-height:1.5; margin-bottom:20px;">
            Gracias por hacer parte de <strong>Esencia Estudio</strong>. Estamos felices de tenerte en nuestra comunidad y de que hayas confiado en nosotros para acompañarte en tu camino creativo y profesional.
          </p>

          <p style="font-size:16px; line-height:1.5; margin-bottom:30px;">
            A continuación te compartimos los detalles de tu cuenta para que puedas ingresar y comenzar a disfrutar de tu plan.
          </p>

          <h2 style="color:var(--secondary-color); border-bottom:2px solid var(--secondary-color); padding-bottom:5px;">Tus credenciales de acceso</h2>
          <p><strong>Nombre de usuario:</strong> ${userName}</p>
          <p><strong>Correo electrónico:</strong> <a href="mailto:${userEmail}" style="color:var(--primary-color);">${userEmail}</a></p>
          <p><strong>Contraseña temporal:</strong> <span style="color:var(--success-color); font-weight:bold;">${password}</span></p>

          <h2 style="color:var(--secondary-color); border-bottom:2px solid var(--secondary-color); padding-bottom:5px; margin-top:30px;">Tu plan contratado</h2>
          <p><strong>Nombre del plan:</strong> ${planName}</p>
          <p style="margin-top:10px;">${planDetails}</p>

          <div style="margin-top:30px; text-align:center;">
            <a href="https://esenciacore.com/login" style="display:inline-block; background-color:var(--primary-color); color:var(--button-text-color); text-decoration:none; padding:12px 24px; border-radius:6px; font-weight:bold;">Iniciar sesión</a>
          </div>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:20px; background-color:var(--primary-color); color:var(--button-text-color); font-size:12px;">
          Este mensaje ha sido generado automáticamente desde <strong>ESENCIA ESTUDIO</strong>.
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
