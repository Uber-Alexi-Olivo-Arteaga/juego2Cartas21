const palos = ["Corazón rojo", "Brillo rojo", "Corazón negro", "Trébol negro"];
const valores = ["As(1)", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

let jugadorCartas = [];
let maquinaCartas = [];
let cartasRepartidas = [];
let jugadorSuma = 0;
let maquinaSuma = 0;
let partidaEnJuego = false;

function iniciarJuego() {
  jugadorCartas = [];
  maquinaCartas = [];
  cartasRepartidas = [];
  jugadorSuma = 0;
  maquinaSuma = 0;
  partidaEnJuego = true;
  document.getElementById("mostrarCartas").textContent = "Partida en juego";
  
  repartirCartas();
}

function repartirCartas() {
  for (let i = 0; i < 2; i++) {
    const jugadorCarta = obtenerCarta();
    jugadorCartas.push(jugadorCarta);
    cartasRepartidas.push(jugadorCarta);
    jugadorSuma += obtenerValorCarta(jugadorCarta);

    const maquinaCarta = obtenerCarta();
    maquinaCartas.push(maquinaCarta);
    cartasRepartidas.push(maquinaCarta);
    maquinaSuma += obtenerValorCarta(maquinaCarta);
  }

  actualizarPantalla();
}

function obtenerCarta() {
  let cartaAleatoria;
  do {
    cartaAleatoria = `${palos[Math.floor(Math.random() * palos.length)]}: ${valores[Math.floor(Math.random() * valores.length)]}`;
  } while (cartasRepartidas.includes(cartaAleatoria));
  
  return cartaAleatoria;
}

function obtenerValorCarta(carta) {
  const valor = carta.split(": ")[1];
  if (valor === "As(1)" || valor === "J" || valor === "Q" || valor === "K") {
    return 10;
  } else {
    return parseInt(valor);
  }
}

function actualizarPantalla() {
  document.getElementById("cartasJugador").textContent = jugadorCartas.join(", ");
  document.getElementById("cartasMaquina").textContent = maquinaCartas.join(", ");
  
  if (partidaEnJuego) {
    document.getElementById("mostrarCartas").textContent = "Partida en juego";
  } else {
    const resultadoJugador = `Jugador: ${jugadorCartas.join(", ")} (Suma: ${jugadorSuma})`;
    const resultadoMaquina = `Máquina: ${maquinaCartas.join(", ")} (Suma: ${maquinaSuma})`;
    document.getElementById("mostrarCartas").textContent = `${resultadoJugador}\n${resultadoMaquina}`;
  }
}

function sacarCarta() {
  if (jugadorSuma <= 21) {
    const jugadorCarta = obtenerCarta();
    jugadorCartas.push(jugadorCarta);
    jugadorSuma = jugadorSuma + obtenerValorCarta(jugadorCarta);
    actualizarPantalla();
  }
  
  if (maquinaSuma <= 17) {
    const maquinaCarta = obtenerCarta();
    maquinaCartas.push(maquinaCarta);
    maquinaSuma = maquinaSuma + obtenerValorCarta(maquinaCarta);
    actualizarPantalla();
  }
  
  if (jugadorSuma > 21 || maquinaSuma >= 17) {
    determinarGanador();
  }
}

function mostrarCartasYSumas(resultadoFinal) {
  const resultadoJugador = obtenerResumenCartas(jugadorCartas, "jugador");
  const resultadoMaquina = obtenerResumenCartas(maquinaCartas, "máquina");
  const resumenCompleto = `${resultadoJugador} | ${resultadoMaquina} | ${resultadoFinal}`;
  
  document.getElementById("mostrarCartas").textContent = resumenCompleto;
}

function obtenerResumenCartas(cartas, jugador) {
  let suma = 0;
  for (let i = 0; i < cartas.length; i++) {
    suma += obtenerValorCarta(cartas[i]);
  }
  return `${jugador}: ${cartas.join(", ")} = ${suma}`;
}

function determinarGanador() {
  partidaEnJuego = false;
  
  let resultadoFinal = "";
  
  if (jugadorSuma <= 21 && (jugadorSuma > maquinaSuma || maquinaSuma > 21)) {
    resultadoFinal = "Gana el jugador";
  } else if (maquinaSuma <= 21 && (maquinaSuma > jugadorSuma || jugadorSuma > 21)) {
    resultadoFinal = "Gana la máquina";
  } else {
    resultadoFinal = "Empate";
  }
  
  mostrarCartasYSumas(resultadoFinal);
}