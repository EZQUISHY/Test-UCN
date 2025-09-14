const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let verificationCode; // Variable para almacenar el código generado

// Configuración del transporte de nodemailer usando Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'tu-email@gmail.com',
        pass: 'tu-contraseña-app' // Usa una contraseña de aplicación
    }
});

// Ruta para enviar el correo con el código de verificación
app.post('/send-code', (req, res) => {
    const { email } = req.body;

    // Generar un código de 6 dígitos
    verificationCode = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
        from: 'tu-email@gmail.com',
        to: email,
        subject: 'Código de Verificación',
        text: `Tu código de verificación es: ${verificationCode}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Error al enviar el correo');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.status(200).send('Correo enviado');
        }
    });
});

// Ruta para verificar el código ingresado por el usuario
app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (parseInt(code) === verificationCode) {
        res.status(200).send('Código verificado correctamente');
    } else {
        res.status(400).send('Código incorrecto');
    }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
