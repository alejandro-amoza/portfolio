const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/send', async (req, res) => {
  const { fullname, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL_USER,
    subject: `Mensaje de ${fullname}`,
    text: message
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: 'Mensaje enviado' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error al enviar el mensaje' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
