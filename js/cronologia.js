const botones = document.querySelectorAll('[data-filtro]');
const eventos = document.querySelectorAll('.evento');
const sinResultados = document.getElementById('sin-resultados');

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const filtro = boton.dataset.filtro;

    // Actualiza el botón activo y su estado para lectores de pantalla
    botones.forEach(b => {
      const activo = b === boton;
      b.classList.toggle('active', activo);
      b.setAttribute('aria-pressed', activo);
    });

    // Muestra u oculta cada evento según sus destinos
    let visibles = 0;
    eventos.forEach(evento => {
      const destinos = evento.dataset.destino.split(' ');
      const mostrar = filtro === 'todas' || destinos.includes(filtro);
      evento.hidden = !mostrar;
      if (mostrar) visibles++;
    });

    // Avisa si el filtro no tiene resultados
    sinResultados.hidden = visibles > 0;
  });
});