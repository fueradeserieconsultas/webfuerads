// api/get-config.js (para Vercel)
// Guardar en: /api/get-config.js

export default function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Leer variables de entorno desde Vercel
        const whatsappNumber = process.env.WHATSAPP_NUMBER;
        const googleSheetUrl = process.env.GOOGLE_SHEET_URL;

        if (!whatsappNumber) {
            throw new Error('WHATSAPP_NUMBER no configurado');
        }

        // Validar número de WhatsApp
        if (!/^\d{10,15}$/.test(whatsappNumber)) {
            throw new Error('Número de WhatsApp inválido');
        }

        res.status(200).json({
            whatsappNumber,
            googleSheetUrl,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            error: error.message || 'Internal Server Error'
        });
    }
}
