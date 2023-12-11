require('dotenv').config();
import express, { Request, Response } from 'express';
import cors from 'cors';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

const app = express();
app.use(cors());
app.use(express.json());
const port = Number(process.env.PORT);

app.post('/sendmail', async (req: Request, res: Response) => {
    const subject = req.body.subject;
    const text = req.body.text;
    const toEmail = 'romain.desson.02320@gmail.com';
    if (!subject || !text) {
        return res.status(400).send('Paramètres manquants');
    }

    try {
        await sendgrid.send({
            to: toEmail,
            from: toEmail,
            subject: subject,
            text: text,
        });
        res.send('Email envoyé avec succès!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erreur lors de l\'envoi de l\'email');
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Serveur démarré sur le port ${port}`);
});
