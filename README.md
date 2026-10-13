# ✉️ Evaluación Parcial — Envío de correos con EmailJS (rama `email`)

Repo: **https://github.com/LupeSalem1401/html** — rama **`email`**

Nueva página funcional: **`contacto.html`** (+ portada `index.html`) con **HTML5 + CSS3 + JavaScript** y el servicio **EmailJS**, según la documentación oficial https://www.emailjs.com/docs/ y la guía Full Stack https://sites.google.com/view/fullstackwebdevelopmentia.

## 📁 Estructura de la rama `email` (limpia)

```text
index.html        → portada + enlace a la nueva página
contacto.html     → NUEVA PÁGINA funcional (formulario EmailJS)
css/styles.css    → estilos CSS3 responsive (sin frameworks)
js/config.js      → PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID (EDITAR AQUÍ)
js/contacto.js    → validación + emailjs.init + emailjs.send + mensajes
README.md         → esta guía
```

> Esta rama se limpió a propósito: solo contiene la evaluación EmailJS.
> Tus archivos locales de las otras ramas (`framework`, `main`, etc.) **no se tocaron**.

## ✅ Requerimientos cubiertos

| # | Requerimiento | Dónde se cumple |
|---|---------------|-----------------|
| 2 | Interfaz web funcional HTML5, CSS3 y JS | `contacto.html` + `css/styles.css` + `js/contacto.js` |
| 3 | Integrar EmailJS y configurar servicio, plantilla y clave pública | `contacto.html` (SDK CDN `@emailjs/browser@5`) + `js/config.js` (`EMAILJS_CONFIG`) + `js/contacto.js` (`emailjs.init`) |
| 4 | Envío al correo personal/institucional con parámetros de la plantilla | `emailjs.send(SERVICE_ID, TEMPLATE_ID, {from_name, from_email, to_email, subject, message, time})` |
| 5 | Validar datos y mostrar confirmación o error | Validación JS (nombre ≥3, emails con regex, asunto ≥3, mensaje ≥10) + `#form-status` success/error/info + errores por campo + spinner + botón deshabilitado |
| 6 | Publicar en rama creada + enlace GitHub | Rama `email`: https://github.com/LupeSalem1401/html/tree/email |

## 🔧 Configuración EmailJS en 5 pasos (2 minutos)

### 1. Crea tu cuenta
https://www.emailjs.com/ → **Sign Up Free**.

### 2. Servicio de correo → `SERVICE_ID`
- Dashboard → **Email Services → Add New Service** → elige Gmail / Outlook.
- Conecta tu correo y copia el **Service ID** (ej: `service_abc1234`).
- Docs: https://www.emailjs.com/docs/tutorial/adding-email-service/

### 3. Plantilla → `TEMPLATE_ID`
- Dashboard → **Email Templates → Create New Template**.
- Usa estas variables en el cuerpo (deben coincidir con el formulario):

```text
De: {{from_name}} ({{from_email}})
Para: {{to_email}}
Asunto: {{subject}}
Fecha: {{time}}

Mensaje:
{{message}}
```

- En el campo **To Email** de la plantilla escribe exactamente:

```text
{{to_email}}
```

Así el mensaje llega al **correo destino que escriba el usuario** (personal o institucional).
- En **Subject** puedes poner `{{subject}}`.
- Guarda y copia el **Template ID** (ej: `template_xyz5678`).
- Docs: https://www.emailjs.com/docs/tutorial/creating-email-template/

### 4. Clave pública → `PUBLIC_KEY`
- Dashboard → **Account → General → Public Key** → cópiala (ej: `xYzAbC123dEfGh456`).
- Docs: https://dashboard.emailjs.com/admin/account

### 5. Pega tus 3 valores en `js/config.js`

```js
const EMAILJS_CONFIG = {
  PUBLIC_KEY: "PEGA_AQUI_TU_PUBLIC_KEY",
  SERVICE_ID: "PEGA_AQUI_TU_SERVICE_ID",
  TEMPLATE_ID: "PEGA_AQUI_TU_TEMPLATE_ID"
};
```

Guarda, recarga `contacto.html` y prueba.

## 🧪 Cómo probar

1. Abre `contacto.html` en el navegador (doble clic o con Live Server).
2. Prueba la **validación**: envía vacío → verás errores en rojo + `❌ Revisa los campos…`.
3. Sin configurar claves → verás `⚠️ Falta configurar EmailJS…`.
4. Con claves configuradas → completa el formulario → verás `⏳ Enviando…` → `✅ ¡Mensaje enviado correctamente a …!` o `❌ Ocurrió un error…` con detalle.
5. Revisa tu bandeja **y spam** del correo destino.

## 📚 Referencias usadas (tal como pide la tarea)

- EmailJS SDK instalación (CDN browser): https://www.emailjs.com/docs/sdk/installation/
- `emailjs.init({ publicKey })`: https://www.emailjs.com/docs/sdk/init/
- `emailjs.send(serviceID, templateID, templateParams)`: https://www.emailjs.com/docs/sdk/send/
- Tutorial `Create a contact form` (base del formulario + campo `time`): https://www.emailjs.com/docs/tutorial/creating-contact-form/
- Guía Full Stack (estructura HTML5/CSS3/JS, ramas): https://sites.google.com/view/fullstackwebdevelopmentia

## 🔗 Enlaces para revisión

- Rama email (código): https://github.com/LupeSalem1401/html/tree/email
- Página nueva: https://github.com/LupeSalem1401/html/blob/email/contacto.html
- Configuración: https://github.com/LupeSalem1401/html/blob/email/js/config.js
- Para GitHub Pages (si se activa Pages en rama email): `index.html` y `contacto.html`
