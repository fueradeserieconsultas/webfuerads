# 🔒 Guía de Seguridad - Fuera de Serie

## ✅ Mejoras Implementadas

### 1. **Protección contra XSS (Inyección de Scripts)**
- ✅ Creada función `sanitizeText()` para limpiar datos de usuario
- ✅ Reemplazado `innerHTML` con `appendChild()` en producto cards y carrito
- ✅ Validación de URLs de imágenes con `isValidImageUrl()`
- ✅ Uso de `textContent` en lugar de `innerHTML` para datos dinámicos

### 2. **Content Security Policy (CSP)**
- ✅ Agregado header meta CSP para limitar fuentes de scripts y estilos
- ✅ Solo permite scripts de origen propio
- ✅ Solo conexiones HTTPS a servicios externos

### 3. **Subresource Integrity (SRI)**
- ✅ Agregados hashes SRI a Google Fonts y Font Awesome
- ✅ Protege contra CDN comprometidas

### 4. **Validación de Datos**
- ✅ Validación de número de WhatsApp (solo dígitos, 10-15 caracteres)
- ✅ Validación de precios (números positivos)
- ✅ Validación de categorías (solo valores permitidos)
- ✅ Validación de URLs de imágenes (solo HTTPS)

---

## ⚠️ Acciones Recomendadas ANTES de Subir a Producción

### 1. **Mueve el Número de WhatsApp a Backend**
```
RIESGO: El número actual está visible en el código fuente
```

**Opción A: Archivo de configuración local (si la página es estática)**
```javascript
// config.js (no subir a GitHub)
export const whatsappNumber = "5492215039940";
```

**Opción B: Backend Node.js/Python (Recomendado)**
```javascript
// Cargar desde servidor seguro
const whatsappConfig = await fetch('/api/config/whatsapp')
    .then(r => r.json());
```

### 2. **Google Sheet: Haz la URL más segura**

Actualmente la URL está en el código. Opciones:

**A) Backend que expone los datos:**
- Tu servidor hace fetch del Google Sheet
- La página solo se conecta a tu dominio
- Más seguro y controlable

**B) Usar API con autenticación:**
```javascript
// En lugar de URL pública CSV
const response = await fetch('/api/products', {
    headers: { 'Authorization': 'Bearer TOKEN' }
});
```

### 3. **HTTPS Obligatorio**
```
CRÍTICO: Sin HTTPS, los datos pueden ser interceptados en tránsito
```

Usa:
- Netlify (automático)
- Vercel (automático)
- GitHub Pages (automático)
- Servidor propio con Let's Encrypt (gratuito)

### 4. **Validación en Backend**
Aunque el frontend valida, **SIEMPRE valida en backend también**:
```python
# Python/Flask ejemplo
@app.route('/api/checkout', methods=['POST'])
def checkout():
    data = request.json

    # Validar WhatsApp
    if not re.match(r'^\d{10,15}$', data['whatsapp']):
        return {'error': 'Invalid WhatsApp'}, 400

    # Validar productos
    for item in data['cart']:
        product = db.get_product(item['id'])
        if not product or product['price'] != float(item['price']):
            return {'error': 'Price tampering detected'}, 400

    return {'ok': True}
```

### 5. **Headers HTTP Adicionales**
Si tienes acceso al servidor, agrega:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
Referrer-Policy: no-referrer-when-downgrade
```

**Servicios que los aplican automáticamente:**
- Netlify: Settings > Security
- Vercel: Headers
- Cloudflare: Security

### 6. **Google Sheet: Restringir Acceso**
- Configurar permisos para que solo TÚ puedas editar
- Los datos se pueden leer pero no modificar desde la web
- Considera cambiar la URL cada 3-6 meses

### 7. **Validación de Imágenes**
Las imágenes solo se cargan desde:
- `raw.githubusercontent.com` ✅
- `imgur.com` ✅

Para agregar más dominios, edita `isValidImageUrl()` en el código.

### 8. **Monitoreo y Logs**
```javascript
// Agregar logging de errores
window.addEventListener('error', (event) => {
    // Enviar a servicio de monitoreo
    fetch('/api/logs', {
        method: 'POST',
        body: JSON.stringify({
            error: event.message,
            url: window.location.href,
            timestamp: new Date()
        })
    });
});
```

---

## 📋 Checklist Pre-Producción

- [ ] Cambiar número de WhatsApp a backend/config
- [ ] Configurar HTTPS obligatorio
- [ ] Agregar headers de seguridad HTTP
- [ ] Testear XSS vulnerable con: `<img src=x onerror="alert('xss')">`
- [ ] Probar validación de imágenes con URLs maliciosas
- [ ] Auditar Google Sheet por permisos
- [ ] Configurar backup automático
- [ ] Agregar certificado SSL
- [ ] Implementar rate limiting en servidor (si aplica)
- [ ] Agregar Terms of Service/Privacy Policy

---

## 🧪 Cómo Probar la Seguridad

### Test 1: XSS en Nombre de Producto
En tu Google Sheet, intenta:
```
Nombre: <img src=x onerror="alert('XSS')">
```
❌ No debe ejecutar alert

### Test 2: Validación de URL
Intenta cargar imagen desde:
```
http://unsafe.com/image.jpg   ❌ No carga
https://imgur.com/img.jpg     ✅ Carga
```

### Test 3: Número de WhatsApp
Editar para probar:
```
whatsappNumber = "abc123"      ❌ Botón deshabilitado
whatsappNumber = "5492215039940" ✅ Funciona
```

---

## 🔗 Recursos Útiles

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Reference](https://content-security-policy.com/)
- [SRI Hash Generator](https://www.srihash.org/)
- [Mozilla Security Checklist](https://infosec.mozilla.org/)

---

## ❓ Preguntas Frecuentes

**P: ¿Es suficiente con estas medidas?**
R: Para un e-commerce pequeño sí, pero considera contratar auditores de seguridad si crece.

**P: ¿Debo pagar por certificado SSL?**
R: No, Let's Encrypt es gratuito. Casi todos los hostings lo incluyen.

**P: ¿Qué pasa si alguien inyecta datos en el Google Sheet?**
R: Solo tú tienes permisos para editarlo. Si lo compartes, cualquiera puede. Mantén permisos cerrados.

---

**Última actualización:** 2026-04-10
**Estado:** ✅ Seguridad mejorada
