# 🚀 Guía de Despliegue en Netlify

## ¿Por qué Netlify?

✅ HTTPS automático
✅ Functions serverless (backend seguro)
✅ CDN global (fast)
✅ Gratis para sitios estáticos
✅ Configurado para seguridad

---

## Paso 1: Preparar tu Repositorio

### 1.1 Inicializar Git (si no tienes)
```bash
cd "c:\Users\jlangoni\Pictures\Mi tienda"
git init
git add .
git commit -m "Initial commit - Fuera de Serie"
```

### 1.2 Estructura de carpetas correcta

```
Mi tienda/
├── index.html                    ← Tu página principal
├── package.json                  ← Ya creado
├── netlify.toml                 ← Ya creado
├── config.dev.js                ← Config local (NO subir)
├── .gitignore                   ← Ya creado (ignora config.dev.js)
├── netlify/
│   └── functions/
│       └── get-config.js        ← Ya creado
└── SEGURIDAD.md                 ← Documentación
```

---

## Paso 2: Crear Repositorio en GitHub

### 2.1 Crear repo en GitHub
1. Ve a https://github.com/new
2. Nombre: `fuera-de-serie` (o el que quieras)
3. Descripción: "Landing page segura para tienda online"
4. Selecciona **Private** (recomendado)
5. NO inicialices con README (ya tienes contenido)

### 2.2 Empujar a GitHub
```bash
git remote add origin https://github.com/TU_USUARIO/fuera-de-serie.git
git branch -M main
git push -u origin main
```

---

## Paso 3: Conectar Netlify

### 3.1 Crear cuenta en Netlify
1. Ve a https://app.netlify.com
2. Sign up con GitHub
3. Autoriza Netlify

### 3.2 Conectar repositorio
1. Click en "New site from Git"
2. Selecciona GitHub
3. Busca `fuera-de-serie`
4. Click Connect

### 3.3 Configurar build
- **Base directory:** (dejar en blanco)
- **Build command:** (dejar en blanco)
- **Publish directory:** `.` (un punto)
- Click "Deploy site"

✅ Netlify automáticamente:
- Detectará `netlify.toml`
- Activará HTTPS
- Desplegará Functions

---

## Paso 4: Configurar Variables de Entorno

### 4.1 En Netlify Dashboard

1. Ve a tu sitio en Netlify
2. Settings → Environment
3. Click "Add a variable"

**Variable 1:**
- Key: `WHATSAPP_NUMBER`
- Value: `5492215039940` (tu número real)
- Scope: Production

**Variable 2:**
- Key: `GOOGLE_SHEET_URL`
- Value: `https://docs.google.com/spreadsheets/d/e/2PACX-1vSqA-VpNXutnP9MjboYk4O95v-NXEik7EmOs_bl7ooTpk4F1V6Vdid9KEvtqv8ikzdqaZ5ImdM1Hyh0/pub?gid=0&single=true&output=csv`
- Scope: Production

4. Click "Save"
5. Ve a Deploys → Trigger deploy → Deploy site

---

## Paso 5: Configurar Dominio Personalizado

### 5.1 Si tienes dominio propio
1. Settings → Domain management
2. Click "Add custom domain"
3. Ingresa: `tudominio.com`
4. Netlify te dirá los nameservers
5. Ve a tu registrador DNS y actualiza nameservers

### 5.2 Si no tienes dominio
Netlify te da uno gratis: `nombre-aleatorio.netlify.app`

---

## Paso 6: Desarrollo Local

### 6.1 Instalar Netlify CLI
```bash
npm install -g netlify-cli
```

### 6.2 Testear localmente
```bash
cd "c:\Users\jlangoni\Pictures\Mi tienda"
netlify dev
```

Abre http://localhost:8888

✅ Se cargarán:
- Tu página HTML
- Las Functions (endpoint `/.netlify/functions/get-config`)
- Config desde `config.dev.js`

### 6.3 Probar la seguridad
1. Abre DevTools (F12)
2. Consola debe mostrar: "📋 Usando configuración de desarrollo"
3. El WhatsApp y Google Sheet deben funcionar

---

## Paso 7: Testing Pre-Producción

### 7.1 Verificar HTTPS
```bash
# Debe ser HTTPS
https://tu-sitio.netlify.app
```

### 7.2 Verificar Headers de Seguridad
```bash
curl -I https://tu-sitio.netlify.app
```

Busca:
- `X-Content-Type-Options: nosniff` ✅
- `Strict-Transport-Security: ...` ✅
- `X-Frame-Options: SAMEORIGIN` ✅

### 7.3 Probar XSS
En tu Google Sheet, agrega un producto con nombre:
```
<img src=x onerror="alert('xss')">
```

El sitio debe mostrar como TEXTO, no ejecutar JavaScript ✅

### 7.4 Probar WhatsApp
- El botón flotante debe funcionar
- Checkout debe generar link correcto
- Número debe estar oculto de la consola (solo en backend)

---

## Paso 8: Monitoreo y Mantenimiento

### 8.1 Logs de Functions
En Netlify Dashboard → Functions → Logs

Verás:
- Cuándo se llamó a `get-config`
- Si hubo errores
- Performance

### 8.2 Analítica
Netlify Dashboard → Analytics

Ver:
- Visitas diarias
- Geolocalización
- Dispositivos

### 8.3 Renovar certificado SSL
Netlify lo hace automático, nada que hacer ✅

---

## 📋 Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Conectado a Netlify
- [ ] Variables de entorno configuradas
- [ ] HTTPS funcionando
- [ ] Headers de seguridad aplicados
- [ ] XSS testado (no funciona) ✅
- [ ] WhatsApp funciona desde producción
- [ ] Google Sheet carga productos correctamente
- [ ] Carrito funciona
- [ ] Checkout abre WhatsApp
- [ ] Backup de config.dev.js local (para desarrollo)

---

## 🆘 Troubleshooting

### "No puedo acceder a mi Netlify site"
- Espera 5 min après del deploy
- Limpia caché: Ctrl+Shift+Del

### "WhatsApp no funciona en producción"
- Verifica que WHATSAPP_NUMBER está en Env Variables
- Redeploy manualmente

### "Google Sheet no carga productos"
- Revisa que la URL es public
- Revisa Logs de Functions (F12 Console)

### "CSP bloquea recursos"
- Ve a netlify.toml y agrega el dominio a CSP

---

## 🔐 Seguridad Final

✅ HTTPS obligatorio
✅ Variables sensibles en backend
✅ XSS protegido
✅ CORS configurado
✅ Headers de seguridad
✅ Rate limiting (opcional)

---

**Tu sitio está listo para producción** 🎉
