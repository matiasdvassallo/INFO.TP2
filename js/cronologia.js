const categorias = document.querySelectorAll('.categoria-btn');
const chips = document.querySelectorAll('.filtro-chip');
const eventos = document.querySelectorAll('.evento');
const sinResultados = document.getElementById('sin-resultados');

// Categorías activas (arranca con tipo) y opciones elegidas en cada una
const activas = new Set(['destino']);
const seleccionados = {
  tipo: new Set(),
  destino: new Set(),
  registro: new Set()
};

// Un evento cumple si, en cada categoría activa, tiene TODAS las opciones elegidas
function cumpleFiltros(evento) {
  return [...activas].every(cat => {
    const elegidos = [...seleccionados[cat]];
    if (elegidos.length === 0) return true;
    const valores = (evento.dataset[cat] || '').trim().split(/\s+/);
    return elegidos.every(v => valores.includes(v));
  });
}

function aplicarFiltros() {
  let visibles = 0;
  eventos.forEach(evento => {
    const mostrar = cumpleFiltros(evento);
    evento.hidden = !mostrar;
    if (mostrar) visibles++;
  });
  sinResultados.hidden = visibles > 0;
}

// Sincroniza el aspecto de botones y chips con el estado actual
function actualizarUI() {
  categorias.forEach(boton => {
    const cat = boton.dataset.categoria;
    const activa = activas.has(cat);
    boton.setAttribute('aria-pressed', activa);
    document.getElementById('panel-' + cat).hidden = !activa;
  });

  chips.forEach(chip => {
    const elegido = seleccionados[chip.dataset.categoria].has(chip.dataset.valor);
    chip.classList.toggle('active', elegido);
    chip.setAttribute('aria-pressed', elegido);
  });

  document.querySelectorAll('.evento summary [data-valor]').forEach(etiqueta => {
  const elegido = seleccionados[etiqueta.dataset.categoria].has(etiqueta.dataset.valor);
  etiqueta.hidden = !elegido;
  });
}

// Activar o desactivar una categoría
categorias.forEach(boton => {
  boton.addEventListener('click', () => {
    const cat = boton.dataset.categoria;
    if (activas.has(cat)) {
      activas.delete(cat);
      seleccionados[cat].clear(); // al desactivarla, se quitan sus filtros
    } else {
      activas.add(cat);
    }
    actualizarUI();
    aplicarFiltros();
  });
});

// Elegir o quitar una opción dentro de una categoría
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    const set = seleccionados[chip.dataset.categoria];
    const valor = chip.dataset.valor;
    if (set.has(valor)) set.delete(valor);
    else set.add(valor);
    actualizarUI();
    aplicarFiltros();
  });
});

actualizarUI();
aplicarFiltros();