# 🚀 Guía de Despliegue en Vercel (Alternativa a Netlify)

## ¿Por qué Vercel?

✅ HTTPS automático
✅ Edge Functions serverless
✅ Mejor performance global (CDN)
✅ Gratis para proyectos estáticos
✅ Fácil despliegue desde GitHub

---

## Opción 1: Netlify (Recomendado)
Ver archivo: `DESPLIEGUE-NETLIFY.md`

## Opción 2: Vercel (Esta guía)

---

## Paso 1: Estructura de Carpetas para Vercel

```
Mi tienda/
├── index.html
├── package.json (Ya creado)
├── .gitignore
├── vercel.json           ← Crear (ver más abajo)
├── api/
│   └── get-config.js    ← Ya creado
├── public/
│   └── config.dev.js    ← Tu config local
└── netlify/
    └── functions/      (Puedes dejar, Vercel lo ignora)
```

---

## Paso 2: Crear vercel.json

```json
{
  "name": "fuera-de-serie",
  "version": 2,
  "public": true,
  "buildCommand": "echo 'Static site'",
  "outputDirectory": ".",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "Strict-Transport-Security",
          "value": "max-age=31536000; includeSubDomains; preload"
        },
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https://docs.google.com"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:match*",
      "destination": "/api/:match*"
    },
    {
      "source": "/:path*",
      "destination": "/index.html"
    }
  ]
}
```

Guardar en: `c:\Users\jlangoni\Pictures\Mi tienda\vercel.json`

---

## Paso 3: Configurar GitHub

```bash
cd "c:\Users\jlangoni\Pictures\Mi tienda"
git init
git add .
git commit -m "Add Vercel deployment config"
git remote add origin https://github.com/TU_USUARIO/fuera-de-serie.git
git push -u origin main
```

---

## Paso 4: Conectar Vercel

### 4.1 Crear Cuenta
1. Ve a https://vercel.com
2. Signup con GitHub
3. Autoriza Vercel

### 4.2 Importar Proyecto
1. Click "New Project"
2. Selecciona tu repositorio `fuera-de-serie`
3. Click "Import"

### 4.3 Configurar Build
- **Framework:** Other (no necesita build)
- **Root Directory:** ./
- Click "Deploy"

✅ Vercel automáticamente:
- Detectará `/api` como Edge Functions
- Activará HTTPS
- Configurará CDN global

---

## Paso 5: Agregar Variables de Entorno

### En Vercel Dashboard

1. Tu proyecto → Settings
2. Environment Variables
3. Add Variable

**Variable 1:**
```
Name: WHATSAPP_NUMBER
Value: 5492215039940
Environments: Production, Preview, Development
```

**Variable 2:**
```
Name: GOOGLE_SHEET_URL
Value: https://docs.google.com/spreadsheets/d/e/2PACX-1vSqA-VpNXutnP9MjboYk4O95v-NXEik7EmOs_bl7ooTpk4F1V6Vdid9KEvtqv8ikzdqaZ5ImdM1Hyh0/pub?gid=0&single=true&output=csv
Environments: Production, Preview, Development
```

4. Redeploy automáticamente

---

## Paso 6: Actualizar index.html para Vercel

En tu `index.html`, la función `loadConfig()` debe ser:

```javascript
async function loadConfig() {
    try {
        const isLocalhost = window.location.hostname === 'localhost';

        if (isLocalhost && window.CONFIG) {
            GOOGLE_SHEET_CSV_URL = window.CONFIG.googleSheetUrl;
            whatsappNumber = window.CONFIG.whatsappNumber;
            return;
        }

        // Vercel endpoint
        const response = await fetch('/api/get-config');
        const data = await response.json();

        GOOGLE_SHEET_CSV_URL = data.googleSheetUrl;
        whatsappNumber = data.whatsappNumber;

    } catch (error) {
        console.error('Error:', error);
        // Fallback
    }
}
```

---

## Paso 7: Testing Local

```bash
npm install -g vercel
vercel dev
```

Abre http://localhost:3000

✅ Debe funcionar exactamente como Netlify

---

## Comparativa: Netlify vs Vercel

| Característica | Netlify | Vercel |
|---|---|---|
| HTTPS Automático | ✅ | ✅ |
| Functions Serverless | ✅ | ✅ |
| Precio | Gratis | Gratis |
| CDN Global | ✅ | ✅ |
| Configuración | netlify.toml | vercel.json |
| GitHub Integration | ✅ | ✅ |
| Dominio Personalizado | ✅ gratis | ✅ gratis |
| Recomendación | **Mejor para estáticos** | **Mejor para APIs** |

---

## Mi Recomendación

**Usa Netlify** si:
- Solo tienes HTML/CSS/JS estático
- Quieres la configuración más simple

**Usa Vercel** si:
- Piensas agregar APIs complejas
- Quieres máximo performance
- Te gusta el ecosistema de Vercel

---

## URLs Finales

**Netlify:**
```
https://tu-sitio.netlify.app
```

**Vercel:**
```
https://tu-sitio.vercel.app
```

---

**¡Listo! Tu sitio está asegurado y en la nube** 🚀
