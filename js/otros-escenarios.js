const obras = [
    { nombre: "MINUCODE", url: "https://www.moma.org/collection/works/193440" },
    { nombre: "Rayuelarte", url: "https://buenosaires.gob.ar/gcaba_historico/noticias/se-presenta-en-paris-rayuelarte-de-marta-minujin-en-homenaje-cortazar" },
    { nombre: "Torre de Babel", url: "https://www.artepublico.ar/torre-de-babel/" }
];

const boton = document.querySelector("#sortear-obra");
const resultado = document.querySelector("#resultado-azar");
let anterior = -1;

boton.addEventListener("click", function () {
    let indice = Math.floor(Math.random() * obras.length);
    while (indice === anterior) {
        indice = Math.floor(Math.random() * obras.length);
    }
    anterior = indice;
    const obra = obras[indice];
    const titulo = document.createElement("h3");
    titulo.textContent = obra.nombre;
    const enlace = document.createElement("a");
    enlace.textContent = "Ver esta obra ";
    enlace.href = obra.url;
    resultado.replaceChildren(titulo, enlace);
    boton.textContent = "Descubrir otra obra ";
});
