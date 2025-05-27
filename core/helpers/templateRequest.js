export const newRequirementTemplate = ({
    companyName,
    clientName,
    clientEmail,
    clientPhone,
    budget,
    estimatedTime,
    clientMessage,
}) => {
    return `
<!DOCTYPE html>
<html lang="es">

<head>
  <meta charset="UTF-8" />
  <title>Nueva solicitud de proyecto</title>
</head>

<body style="margin:0; padding:0; background-color:#f3f4f6; font-family:Arial, sans-serif; color:#1f2937;">
  <div style="max-width:600px; margin:20px auto; background-color:#ffffff; border:1px solid #e5e7eb; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.08); overflow:hidden;">

    <!-- Header -->
    <div style="padding: 30px 0; background-color:#1890ff; text-align:center;">
      <img src="https://lh3.googleusercontent.com/a/ACg8ocKe-Ems31D3KfAvHQBNbBMbd0rMILKDxLNn_tZb4BfZT5EZaqE=s288-c-no"
        alt="Logo" width="60" style="display:block; margin:0 auto 10px; border-radius:50%;" />
      <h1 style="color:#f9fafb; margin:0; font-size:26px;">📢 Nueva solicitud de proyecto</h1>
    </div>

    <!-- Contenido -->
    <div style="padding: 24px;">

      <h2 style="color:#14b8a6; border-bottom:2px solid #14b8a6; padding-bottom:6px;">📇 Información del Cliente</h2>
      <p><strong>Empresa:</strong> <span style="color:#1890ff;">${companyName}</span></p>
      <p><strong>Nombre del solicitante:</strong> ${clientName}</p>
      <p><strong>Correo electrónico:</strong> <a href="mailto:${clientEmail}" style="color:#f59e0b; text-decoration:none;">${clientEmail}</a></p>
      <p><strong>Teléfono:</strong> ${clientPhone}</p>

      <h2 style="color:#14b8a6; border-bottom:2px solid #14b8a6; padding-bottom:6px; margin-top:30px;">📊 Detalles del Proyecto</h2>
      <p><strong>Presupuesto estimado:</strong> <span style="color:#22c55e; font-weight:bold;">${budget}</span></p>
      <p><strong>Tiempo estimado:</strong> ${estimatedTime}</p>

      <h2 style="color:#14b8a6; border-bottom:2px solid #14b8a6; padding-bottom:6px; margin-top:30px;">📝 Mensaje del Cliente</h2>
      <p style="font-style:italic;">${clientMessage}</p>

    </div>

    <!-- Footer -->
    <div style="padding:20px; background-color:#1890ff; color:#f9fafb; text-align:center; font-size:13px; border-top:1px solid #4338ca;">
      Este mensaje ha sido generado automáticamente desde <strong>ESENCIA CORE</strong>.
    </div>

  </div>
</body>

</html>

`;
};
