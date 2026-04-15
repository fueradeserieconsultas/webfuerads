// netlify/functions/get-config.js
// Archivo para Netlify - coloca esto en la carpeta "netlify/functions/"

exports.handler = async (event) => {
    // Validar origen (CORS)
    const origin = event.headers.origin;
    const allowedOrigins = [
        'https://tudominio.com',
        'https://www.tudominio.com',
        'http://localhost:3000' // para desarrollo local
    ];

    if (!allowedOrigins.includes(origin)) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: 'Forbidden' })
        };
    }

    try {
        // Leer variables de entorno (definidas en Netlify Dashboard)
        const whatsappNumber = process.env.WHATSAPP_NUMBER;
        const googleSheetUrl = process.env.GOOGLE_SHEET_URL;

        if (!whatsappNumber) {
            throw new Error('WHATSAPP_NUMBER no está configurado');
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': origin,
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Cache-Control': 'public, max-age=3600' // cachear 1 hora
            },
            body: JSON.stringify({
                whatsappNumber,
                googleSheetUrl,
                timestamp: new Date().toISOString()
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

// Para funcionar, necesitas:
// 1. Crear carpeta "netlify" en la raíz de tu proyecto
// 2. Crear carpeta "functions" dentro de "netlify"
// 3. Guardar este archivo como "get-config.js"
// 4. En Netlify Dashboard: Settings → Build & Deploy → Environment
//    Variables:
//    - WHATSAPP_NUMBER = 5492215039940
//    - GOOGLE_SHEET_URL = https://docs.google.com/spreadsheets/d/e/...
