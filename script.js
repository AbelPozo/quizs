//Guardamos los botones del menú
let botonDBD = document.getElementById("dbd");
let botonMinecraft = document.getElementById("minecraft");
let botonPokemon = document.getElementById("pokemon");

//Guardamos las zonas de la página
let menu = document.getElementById("menu");
let quiz = document.getElementById("quiz");
let nombreQuiz = document.getElementById("nombreQuiz");

//Guardamos los elementos de las respuestas
let preguntaHTML = document.getElementById("pregunta");
let respuestasHTML = document.getElementById("respuestas");
let confirmar = document.getElementById("confirmar");

//Guardamos los elementos de la pantalla de resultados
let resultado = document.getElementById("resultado");
let puntuacionFinal = document.getElementById("puntuacionFinal");
let volverMenu = document.getElementById("volverMenu");

//Variables para controlar el cuestionario
let preguntas = [];
let numeroPregunta = 0;
let puntuacion = 0;
let respuestaSeleccionada = null;
let botonSeleccionado = null;
let respuestaConfirmada = false;

//Función para iniciar un cuestionario
async function iniciarQuiz(archivo, nombre) {

    //Cargamos las preguntas del archivo JSON
    let respuesta = await fetch(archivo);

    preguntas = await respuesta.json();

    //Mezclamos las preguntas aleatoriamente
    preguntas.sort(() => Math.random() - 0.5);

    //Seleccionamos solamente 10 preguntas
    preguntas = preguntas.slice(0, 10);

    //Ocultamos el menú y mostramos el cuestionario
    menu.style.display = "none";
    quiz.style.display = "block";

    resultado.style.display = "none";

    //Mostramos el nombre del cuestionario
    nombreQuiz.textContent = nombre;

    //Reiniciamos los datos del cuestionario
    numeroPregunta = 0;
    puntuacion = 0;

    //Mostramos la primera pregunta
    mostrarPregunta();
}

//Función para mostrar una pregunta
function mostrarPregunta() {

    //Obtenemos la pregunta actual
    let preguntaActual = preguntas[numeroPregunta];

    //Reiniciamos la respuesta seleccionada
    respuestaSeleccionada = null;
    botonSeleccionado = null;
    respuestaConfirmada = false;

    //Preparamos el botón de confirmar
    confirmar.textContent = "Confirmar respuesta";

    //Mostramos el enunciado
    preguntaHTML.textContent = preguntaActual.question;

    //Borramos las respuestas anteriores
    respuestasHTML.innerHTML = "";

    //Recorremos las cuatro opciones
    for (let i = 0; i < preguntaActual.options.length; i++) {

        //Creamos un botón para cada respuesta
        let boton = document.createElement("button");

        boton.textContent = preguntaActual.options[i];

        //Detectamos cuando el jugador pulsa una respuesta
        boton.addEventListener("click", function() {

            //Evitamos cambiar la respuesta después de confirmarla
            if (respuestaConfirmada == true){
                return;
            }

            //Si había otra respuesta seleccionada, recupera su color
            if (botonSeleccionado != null) {
                botonSeleccionado.style.backgroundColor = "#673ab7";
            }

            //Guardamos la nueva respuesta seleccionada
            respuestaSeleccionada = i;
            botonSeleccionado = boton;

            //Cambiamos el color del botón seleccionado
            boton.style.backgroundColor = "#9575cd";
        });

        //Añadimos el botón a la página
        respuestasHTML.appendChild(boton);
    }
}

//Acciones de los botones
botonDBD.addEventListener("click", function() {
    iniciarQuiz("quiz1.json", "Dead by Daylight");
});

botonMinecraft.addEventListener("click", function() {
    iniciarQuiz("quiz2.json", "Minecraft");
});

botonPokemon.addEventListener("click", function() {
    iniciarQuiz("quiz3.json", "Pokémon");
});

//Acción del botón Confirmar respuesta
confirmar.addEventListener("click", function() {

    //Si la respuesta ya está confirmada, avanzamos
    if (respuestaConfirmada == true) {

        //Pasamos a la siguiente pregunta
        numeroPregunta++;
        
        //Comprobamos si quedan preguntas
        if (numeroPregunta < preguntas.length) {
            
            //Mostramos la siguiente pregunta
            mostrarPregunta();
        } else {

            //Ocultamos el cuestionario
            quiz.style.display = "none";

            //Mostramos la pantalla de resultados
            resultado.style.display = "block";

            //Mostramos la puntuación final
            puntuacionFinal.textContent = "Has conseguido " + puntuacion + " de 10 puntos";
        }

        return;
    }

    //Comprobamos que se haya seleccionado una respuesta
    if (respuestaSeleccionada == null) {
        alert("Selecciona una respuesta primero");
        return;
    }

    //Obtenemos la pregunta actual
    let preguntaActual = preguntas[numeroPregunta];

    //Comprobamos si la respuesta es correcta
    if (respuestaSeleccionada == preguntaActual.answer) {

        //Marcamos la respuesta correcta en verde
        botonSeleccionado.style.backgroundColor = "green";

        //Sumamos un punto
        puntuacion++;
    } else {

        //Marcamos la respuesta incorrecta en rojo
        botonSeleccionado.style.backgroundColor = "red";

        //Buscamos el botón que contiene la respuesta correcta
        let botones = respuestasHTML.children;

        botones[preguntaActual.answer].style.backgroundColor = "green";
    }

    //Indicamos que la respuesta ya está confirmada
    respuestaConfirmada = true;

    //Cambiamos el texto del botón
    confirmar.textContent = "Siguiente pregunta";
});

//Acción del botón para volver al menú
volverMenu.addEventListener("click", function(){

    //Ocultamos la pantalla de resultados
    resultado.style.display = "none";

    //Mostramos el menú principal
    menu.style.display = "block";
    
});