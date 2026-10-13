/* ==========================================================================
   email/js/contacto.js — Validación + envío con EmailJS
   Docs oficiales:
   - https://www.emailjs.com/docs/sdk/installation/ (CDN browser@5)
   - https://www.emailjs.com/docs/sdk/init/ (emailjs.init)
   - https://www.emailjs.com/docs/sdk/send/ (emailjs.send)
   - https://www.emailjs.com/docs/tutorial/creating-contact-form/ (formulario)
   ========================================================================== */
(function () {
  "use strict";
  var form = document.getElementById("contact-form");
  if (!form) return;
  var btnEnviar = document.getElementById("btn-enviar");
  var btnLimpiar = document.getElementById("btn-limpiar");
  var statusBox = document.getElementById("form-status");
  var timeInput = document.getElementById("time");
  if (timeInput) timeInput.value = new Date().toLocaleString("es-PE");

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var cfg = (typeof EMAILJS_CONFIG !== "undefined") ? EMAILJS_CONFIG : null;

  try {
    if (window.emailjs && cfg && cfg.PUBLIC_KEY && cfg.PUBLIC_KEY !== "TU_PUBLIC_KEY") {
      emailjs.init({ publicKey: cfg.PUBLIC_KEY });
    }
  } catch (e) { console.warn("EmailJS init:", e); }

  function showStatus(type, msg) { statusBox.className = "show " + type; statusBox.textContent = msg; }
  function clearStatus() { statusBox.className = ""; statusBox.textContent = ""; }
  function setError(errId, groupId, msg) {
    var err = document.getElementById(errId);
    var group = document.getElementById(groupId);
    if (err) err.textContent = msg || "";
    if (group) group.classList.toggle("invalid", !!msg);
  }

  function validar() {
    var nombre = document.getElementById("nombre").value.trim();
    var origen = document.getElementById("origen").value.trim();
    var destino = document.getElementById("destino").value.trim();
    var asunto = document.getElementById("asunto").value.trim();
    var mensaje = document.getElementById("mensaje").value.trim();
    var ok = true;
    if (nombre.length < 3) { setError("err-nombre", "g-nombre", "El nombre debe tener al menos 3 caracteres."); ok = false; }
    else setError("err-nombre", "g-nombre", "");
    if (!emailRegex.test(origen)) { setError("err-origen", "g-origen", "Ingresa un correo remitente válido."); ok = false; }
    else setError("err-origen", "g-origen", "");
    if (!emailRegex.test(destino)) { setError("err-destino", "g-destino", "Ingresa el correo destino válido (personal o institucional)."); ok = false; }
    else setError("err-destino", "g-destino", "");
    if (asunto.length < 3) { setError("err-asunto", "g-asunto", "El asunto es obligatorio (mín. 3 caracteres)."); ok = false; }
    else setError("err-asunto", "g-asunto", "");
    if (mensaje.length < 10) { setError("err-mensaje", "g-mensaje", "El mensaje debe tener al menos 10 caracteres."); ok = false; }
    else setError("err-mensaje", "g-mensaje", "");
    if (!ok) return null;
    return { nombre: nombre, origen: origen, destino: destino, asunto: asunto, mensaje: mensaje };
  }

  ["nombre", "origen", "destino", "asunto", "mensaje"].forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", function () {
      var map = { nombre: ["err-nombre", "g-nombre"], origen: ["err-origen", "g-origen"], destino: ["err-destino", "g-destino"], asunto: ["err-asunto", "g-asunto"], mensaje: ["err-mensaje", "g-mensaje"] };
      setError(map[id][0], map[id][1], "");
      clearStatus();
    });
  });

  if (btnLimpiar) {
    btnLimpiar.addEventListener("click", function () {
      form.reset();
      if (timeInput) timeInput.value = new Date().toLocaleString("es-PE");
      ["err-nombre", "err-origen", "err-destino", "err-asunto", "err-mensaje"].forEach(function (id) {
        var e = document.getElementById(id); if (e) e.textContent = "";
      });
      Array.prototype.forEach.call(document.querySelectorAll(".field"), function (el) { el.classList.remove("invalid"); });
      clearStatus();
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var datos = validar();
    if (!datos) { showStatus("error", "❌ Revisa los campos marcados en rojo e intenta de nuevo."); return; }
    if (!cfg || cfg.PUBLIC_KEY === "TU_PUBLIC_KEY" || cfg.SERVICE_ID === "TU_SERVICE_ID" || cfg.TEMPLATE_ID === "TU_TEMPLATE_ID") {
      showStatus("info", "⚠️ Falta configurar EmailJS: edita email/js/config.js con tu PUBLIC_KEY, SERVICE_ID y TEMPLATE_ID. Ver ayuda ⚙️ abajo.");
      return;
    }
    if (!window.emailjs) { showStatus("error", "❌ No se pudo cargar la librería de EmailJS. Revisa tu conexión."); return; }

    btnEnviar.disabled = true;
    var originalText = btnEnviar.textContent;
    btnEnviar.innerHTML = '<span class="spinner"></span>Enviando…';
    showStatus("info", "⏳ Enviando mensaje, por favor espera…");
    if (timeInput) timeInput.value = new Date().toLocaleString("es-PE");

    var templateParams = {
      from_name: datos.nombre,
      from_email: datos.origen,
      to_email: datos.destino,
      subject: datos.asunto,
      message: datos.mensaje,
      time: timeInput ? timeInput.value : new Date().toLocaleString("es-PE")
    };

    try { emailjs.init({ publicKey: cfg.PUBLIC_KEY }); } catch (_) {}
    emailjs.send(cfg.SERVICE_ID, cfg.TEMPLATE_ID, templateParams).then(
      function (resp) {
        console.log("EmailJS SUCCESS:", resp && resp.status, resp && resp.text);
        showStatus("success", "✅ ¡Mensaje enviado correctamente a " + datos.destino + "! Revisa tu bandeja (y spam).");
        form.reset();
        if (timeInput) timeInput.value = new Date().toLocaleString("es-PE");
      },
      function (err) {
        console.error("EmailJS FAILED:", err);
        var detalle = (err && err.text) ? " Detalle: " + err.text : "";
        showStatus("error", "❌ Ocurrió un error al enviar el mensaje. Intenta de nuevo." + detalle);
      }
    ).finally(function () { btnEnviar.disabled = false; btnEnviar.textContent = originalText; });
  });
})();
