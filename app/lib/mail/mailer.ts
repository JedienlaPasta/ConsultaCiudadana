import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendVoteConfirmationEmail = async (
  email: string,
  name: string,
  consultaNombre: string,
  fechaHora: string
) => {
  const message = {
    from: `Saberes El Quisco <${process.env.EMAIL_FROM}>`,
    to: email,
    subject: `Confirmación de Voto - ${consultaNombre} - El Quisco`,
    html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Confirmación de Voto</h2>
          <p>Hola ${name},</p>
          <p>Se ha confirmado su voto en la consulta <strong>${consultaNombre}</strong>, el ${fechaHora}.</p>
          <p>Gracias por participar.</p>
        </div>
      `,
  };

  try {
    const info = await transporter.sendMail(message);
    console.log("Confirmación de voto enviada: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error al enviar la confirmación de voto:", error);
    return false;
  }
};

// Ejemplo de cómo podrías llamar a esta función:

// import { sendVoteConfirmationEmail } from '@/lib/mail/mailer';

// async function confirmarVotoUsuario(userData: any, consulta: any) {
//   const userEmail = userData.email;
//   const userName = `${userData.nombres} ${userData.apellidos}`;
//   const consultaNombre = consulta.nombre;
//   const fechaHoraVoto = new Date().toLocaleString(); // Obtiene la fecha y hora actual

//   const emailSent = await sendVoteConfirmationEmail(
//     userEmail,
//     userName,
//     consultaNombre,
//     fechaHoraVoto
//   );

//   if (emailSent) {
//     console.log(`Confirmación de voto enviada a ${userEmail}`);
//     // Realizar otras acciones después de la confirmación
//   } else {
//     console.error(`Error al enviar la confirmación de voto a ${userEmail}`);
//     // Manejar el error apropiadamente
//   }
// }
