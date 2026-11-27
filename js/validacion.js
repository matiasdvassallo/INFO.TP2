// ==========================================================================
// VALIDACIÓN DE FORMULARIO DE CONTACTO - TP2 INFORMÁTICA GENERAL
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // 1. Capturamos los elementos del DOM
  const formulario = document.getElementById("formulario-contacto");
  const inputNombre = document.getElementById("nombre");
  const inputEmail = document.getElementById("email");
  const selectMotivo = document.getElementById("motivo");
  const textareaMensaje = document.getElementById("mensaje");

  const errorNombre = document.getElementById("error-nombre");
  const errorEmail = document.getElementById("error-email");
  const errorMotivo = document.getElementById("error-motivo");
  const errorMensaje = document.getElementById("error-mensaje");
  const contadorCaracteres = document.getElementById("contador-caracteres");

  const alertaExito = document.getElementById("alerta-exito");
  const textoConfirmacion = document.getElementById("texto-confirmacion");

  // 2. Expresiones regulares (Clase 22)
  // Solo letras (incluye tildes y ñ) y espacios, entre 3 y 50 caracteres
  const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]{3,50}$/;
  // Formato estándar de correo electrónico: usuario@dominio.ext
  const regexEmail = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  // 3. Funciones auxiliares para mostrar u ocultar errores en pantalla
  function marcarError(campo, contenedorError, mensaje) {
    campo.classList.add("is-invalid");
    campo.classList.remove("is-valid");
    contenedorError.textContent = mensaje;
  }

  function marcarValido(campo, contenedorError) {
    campo.classList.remove("is-invalid");
    campo.classList.add("is-valid");
    contenedorError.textContent = "";
  }

  // 4. Funciones de validación individual por campo
  function validarNombre() {
    const valor = inputNombre.value.trim(); // Normalización: quita espacios extra

    if (valor === "") {
      marcarError(inputNombre, errorNombre, "El nombre es obligatorio. Ingresá tu nombre y apellido.");
      return false;
    }
    if (valor.length < 3) {
      marcarError(inputNombre, errorNombre, "El nombre es demasiado corto (mínimo 3 caracteres).");
      return false;
    }
    if (!regexNombre.test(valor)) {
      marcarError(inputNombre, errorNombre, "El nombre solo puede contener letras y espacios (sin números ni símbolos).");
      return false;
    }

    marcarValido(inputNombre, errorNombre);
    return true;
  }

  function validarEmail() {
    const valor = inputEmail.value.trim().toLowerCase(); // Normalización a minúsculas

    if (valor === "") {
      marcarError(inputEmail, errorEmail, "El correo electrónico es obligatorio.");
      return false;
    }
    if (!regexEmail.test(valor)) {
      marcarError(inputEmail, errorEmail, "Ingresá un formato de correo válido (ejemplo: usuario@dominio.com).");
      return false;
    }

    marcarValido(inputEmail, errorEmail);
    return true;
  }

  function validarMotivo() {
    if (selectMotivo.value === "") {
      marcarError(selectMotivo, errorMotivo, "Por favor, seleccioná un motivo de consulta de la lista.");
      return false;
    }

    marcarValido(selectMotivo, errorMotivo);
    return true;
  }

  function validarMensaje() {
    const valor = textareaMensaje.value.trim();

    if (valor === "") {
      marcarError(textareaMensaje, errorMensaje, "El mensaje no puede estar vacío.");
      return false;
    }
    if (valor.length < 15) {
      marcarError(textareaMensaje, errorMensaje, `El mensaje es muy breve (${valor.length}/15 caracteres mínimos). Detallá un poco más tu consulta.`);
      return false;
    }
    if (valor.length > 500) {
      marcarError(textareaMensaje, errorMensaje, "Superaste el límite máximo de 500 caracteres.");
      return false;
    }

    marcarValido(textareaMensaje, errorMensaje);
    return true;
  }

  // 5. Validación en tiempo real mientras el usuario escribe o corrige (evento 'input' y 'change')
  inputNombre.addEventListener("input", validarNombre);
  inputEmail.addEventListener("input", validarEmail);
  selectMotivo.addEventListener("change", validarMotivo);

  textareaMensaje.addEventListener("input", () => {
    const largoActual = textareaMensaje.value.length;
    contadorCaracteres.textContent = `${largoActual} / 500`;
    validarMensaje();
  });

  // 6. Validación completa al intentar enviar el formulario (evento 'submit')
  formulario.addEventListener("submit", (evento) => {
    // Evita que la página se recargue o envíe datos sin validar
    evento.preventDefault();

    // Oculta alerta previa si existía
    alertaExito.classList.add("d-none");

    // Ejecutamos todas las validaciones
    const nombreEsValido = validarNombre();
    const emailEsValido = validarEmail();
    const motivoEsValido = validarMotivo();
    const mensajeEsValido = validarMensaje();

    // Si todos los campos cumplen las condiciones
    if (nombreEsValido && emailEsValido && motivoEsValido && mensajeEsValido) {
      const nombreUsuario = inputNombre.value.trim();
      const emailUsuario = inputEmail.value.trim();

      textoConfirmacion.textContent = `Gracias, ${nombreUsuario}. Recibimos tu mensaje y te responderemos a la brevedad a ${emailUsuario}.`;
      alertaExito.classList.remove("d-none");

      // Limpiamos el formulario y los estados visuales
      formulario.reset();
      contadorCaracteres.textContent = "0 / 500";
      [inputNombre, inputEmail, selectMotivo, textareaMensaje].forEach((campo) => {
        campo.classList.remove("is-valid", "is-invalid");
      });
    } else {
      // Lleva el foco al primer campo con error para facilitar la corrección
      const primerError = formulario.querySelector(".is-invalid");
      if (primerError) {
        primerError.focus();
      }
    }
  });
});