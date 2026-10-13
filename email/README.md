# ✉️ Carpeta `email/` — Página de contacto con EmailJS

Nueva página funcional con interfaz propia, usada desde el `index.html` de Clonarproyecto
(enlace a `email/index.html`) y publicada en GitHub así:

- Rama **`main`**: `index.html` (nuevo) + carpeta **`email/`** (esta página).
- Rama **`email`**: solo lo de email (esta carpeta como raíz).

## Estructura

```text
email/
  index.html      → página de contacto (formulario EmailJS)
  css/styles.css  → estilos propios
  js/config.js    → PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID (EDITAR AQUÍ)
  js/contacto.js  → validación + emailjs.init + emailjs.send + avisos
```

## Configurar EmailJS (2 minutos)

1. Cuenta en https://www.emailjs.com/
2. **Email Services → Add New Service** → copia `SERVICE_ID`.
   https://www.emailjs.com/docs/tutorial/adding-email-service/
3. **Email Templates → Create New Template** con variables
   `{{from_name}} {{from_email}} {{to_email}} {{subject}} {{message}} {{time}}`.
   En **To Email** escribe `{{to_email}}`. → copia `TEMPLATE_ID`.
   https://www.emailjs.com/docs/tutorial/creating-email-template/
4. **Account → General → Public Key** → copia `PUBLIC_KEY`.
5. Pega los 3 valores en `js/config.js`, recarga `email/index.html` y prueba.
   Base del formulario: https://www.emailjs.com/docs/tutorial/creating-contact-form/
