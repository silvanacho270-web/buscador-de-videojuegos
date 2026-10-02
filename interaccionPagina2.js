const botonBuscar = document.getElementById("boton-buscar");
const inputVideojuego = document.getElementById("input-videojuego");
const formularioBusqueda = document.querySelector("header form");
const botonVolver = document.getElementById("boton-volver");
const spinnerCarga = document.getElementById("spinner-carga");
const tituloResultados = document.getElementById("titulo-resultados");
const contenedorJuegos = document.getElementById("contenedor-tarjetas");
const tituloresultados = document.getElementById("titulo-resultados");
const API_KEY = "4386f13a3d1546e582b5c66cc2e315cd";

function mostrarSpinner() {
    spinnerCarga.hidden = false;
}

function ocultarSpinner() {
    spinnerCarga.hidden = true;
}


async function cargarJuegos(busqueda = "") {
    mostrarSpinner();

    contenedorJuegos.innerHTML = "<p>Cargando juegos...</p>";
    try {
        
        let url = `https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=12`;
        if (busqueda) {
            url += `&search=${busqueda}`;
        }
        const respuesta = await fetch(url);
        const data = await respuesta.json();
        mostrarJuegos(data.results);

    } catch (error) {
        console.error("Error al cargar los juegos:", error);
        contenedorJuegos.innerHTML = "<p>Hubo un error al cargar los juegos. Intentalo de nuevo.</p>";
    } finally {
        ocultarSpinner();
    }

    tituloResultados.textContent = busqueda ? `Resultados de búsqueda para: "${busqueda}"` : "Juegos más valorados";
}

botonBuscar.addEventListener("click", (event) => {
    event.preventDefault();
    const busqueda = inputVideojuego.value;
    cargarJuegos(busqueda);});




    function mostrarJuegos(juegos) {
        contenedorJuegos.innerHTML = "";
        juegos.forEach((juego) => {contenedorJuegos.innerHTML += `
        <div class="juego">
            <img src="${juego.background_image}" alt="${juego.name}">
            <h3>${juego.name}</h3>
            <p>Rating: ${juego.rating}</p>
        </div>
        `;});
    }

    botonVolver.addEventListener("click", () => {  
        inputVideojuego.value = "";
        cargarJuegosMejorValorados();
    });

    async function cargarJuegosMejorValorados() {
        mostrarSpinner();
         
        inputVideojuego.value = "";
        contenedorJuegos.innerHTML = "";

        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&ordering=-rating&page_size=12`);
        const data = await respuesta.json();

        data.results.forEach((juego) => {
            if(juego.rating >= 4.5) {
                contenedorJuegos.innerHTML += `
                <div class="juego">
                    <img src="${juego.background_image}" alt="${juego.name}">
                    <h3>${juego.name}</h3>
                    <p>Rating: ${juego.rating}</p>
                </div>
                `;
            }
        });

        ocultarSpinner();

        tituloResultados.textContent = "Juegos más valorados";
    }

    cargarJuegosMejorValorados();
