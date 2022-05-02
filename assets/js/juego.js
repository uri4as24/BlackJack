//voy a usar el pátron modelo para encapsular mi codigo

const miModulo = (() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    const btnPedir = document.querySelector('#btnPedir'),
        btnNuevo = document.querySelector('#btnNuevo'),
        btnDetener = document.querySelector('#btnDetener');

    // let puntosJugador = 0,
    //     puntosComputadora = 0;

    let puntosJugadores = [];

    let divCartasJugadores = document.querySelectorAll('.divCartas');

    const puntosHTML = document.querySelectorAll('small');

    //esta funcion inicializa todo el juego

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }
        puntosHTML.forEach((Element) => (Element.innerText = 0));

        // puntosHTML[0].innerText = 0;
        // puntosHTML[1].innerText = 0;
        divCartasJugadores.forEach((elem) => (elem.innerText = ' '));
        // divCartaCompu.innerHTML = '';
        // divCarta.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;

        // puntosComputadora = 0;
        // puntosJugador = 0;
        // puntosJugadores[0] = 0;
    };

    //esta funcion nos va crear una varaja con las cartas mescladas

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (const especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        return _.shuffle(deck);
    };

    //Esta funcion me permite pedir una carta

    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'no hay cartas en el deck'; //esto es un error y me va deterner mi app
        }
        return deck.pop();
    };

    const valorCarta = (carta, puntaje) => {
        const valor = carta.substring(0, carta.length - 1);

        return isNaN(valor) ?
            valor === 'A' ?
            puntaje <= 10 ?
            11 :
            1 :
            10 :
            valor * 1;

        // puntos <= 10 ?
        // 11 :
        // 1 :
        // 10 :
        // valor * 1;
        // if (isNaN(valor)) {

        // }else { //si es un numero
        // puntos = valor * 1 // con el * estoy pasando un string a un numero

        // }

        // console.log(puntos + 3);
    };

    //esta funcion me va acumular los puntos de mis jugadores
    //Turno : 0 = priemr jugador, y el ultimo sera la compu

    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] =
            puntosJugadores[turno] + valorCarta(carta, puntosJugadores[turno]);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    //voy a crear una funcion para qu me imprima las fotos

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${carta}.png`;
        // le voy agregar clases para que se ajuste

        imgCarta.classList.add('carta');

        divCartasJugadores[turno].append(imgCarta);
    };

    //esta funcion es para evaluar quien gana
    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                Swal.fire({
                    icon: 'question',
                    title: puntosMinimos + ' PUNTOS',
                    text: 'NADIE GANA ES UN EMPATE : ',
                });
            } else if (puntosMinimos > 21) {
                Swal.fire({
                    icon: 'error',
                    title: puntosMinimos + ' PUNTOS',
                    text: 'PERDISTE ! ',
                });
            } else if (puntosComputadora > 21) {
                Swal.fire({
                    icon: 'success',
                    title: puntosMinimos + ' PUNTOS',
                    text: 'FELICIDADES GANASTE',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'PERDISTE',
                    text: 'COMPUTADORA GANA!',
                });
            }
        }, 200);
    };

    //este es el turno de la computadora

    const turnoCompu = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();

            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);

            crearCarta(carta, puntosJugadores.length - 1);

            // puntosComputadora =
            //     puntosComputadora + valorCarta(carta, puntosComputadora);

            // // console.log(puntosComputadora);

            // puntosHTML[1].innerText = puntosComputadora;

            // const imgCarta = document.createElement('img');
            // imgCarta.src = `./assets/cartas/${carta}.png`;
            // // le voy agregar clases para que se ajuste

            // imgCarta.classList.add('carta');

            // if (puntosMinimos > 21) {
            //     break;
            // }
        } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);
        determinarGanador(puntosMinimos);
    };

    //evento click
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();

        const puntosJugador = acumularPuntos(carta, 0);


        // puntosJugador = puntosJugador + valorCarta(carta, puntosJugador);
        // puntosHTML[0].innerText = puntosJugador;

        // const imgCarta = document.createElement('img');
        // imgCarta.src = `./assets/cartas/${carta}.png`;
        // // le voy agregar clases para que se ajuste

        // imgCarta.classList.add('carta');

        // divCartasJugadores[0].append(imgCarta);

        crearCarta(carta, 0);

        if (puntosJugador > 21) {
            // puntosHTML[0].innerHTML = "<b> Perdiste </b>"
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCompu(puntosJugador);
        } else if (puntosJugador === 21) {
            // puntosHTML[0].innerHTML = "<b> Ganaste  </b>"
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoCompu(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoCompu(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () => {
        inicializarJuego();
    });

    return {
        nuevoJuego: inicializarJuego,
    };
})();