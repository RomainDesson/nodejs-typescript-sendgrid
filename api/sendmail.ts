import type { VercelRequest, VercelResponse } from '@vercel/node';
import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autorise toutes les origines
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

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
}
