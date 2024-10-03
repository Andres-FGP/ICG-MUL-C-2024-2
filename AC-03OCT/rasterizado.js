function dibujarRasterizado() {
    const canvas = document.getElementById("canvasRaster");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpiar el canvas

    // Generar puntos aleatorios dentro del canvas
    const puntos = generarPuntosConvexos(5 + Math.floor(Math.random() * 5)); // Entre 5 y 9 puntos

    // Dibuja la figura
    ctx.beginPath();
    ctx.moveTo(puntos[0][0], puntos[0][1]); // Mover a la primera coordenada
    for (let i = 1; i < puntos.length; i++) {
        ctx.lineTo(puntos[i][0], puntos[i][1]);
    }
    ctx.closePath(); // Cierra el polígono
    ctx.fill(); // Rellena el polígono
    ctx.stroke(); // Dibuja el contorno

    // Determinar si es convexo o cóncavo
    const tipoPoligono = esConvexo(puntos) ? "convexo" : "cóncavo";
    document.getElementById("resultado").innerText = "El polígono es: " + tipoPoligono;
}

function generarPuntosConvexos(numPuntos) {
    const puntos = [];
    const width = 500;  // Ancho del canvas
    const height = 500; // Altura del canvas

    // Generar puntos aleatorios
    for (let i = 0; i < numPuntos; i++) {
        const x = Math.random() * (width - 20) + 10;  // Valores entre 10 y width-10
        const y = Math.random() * (height - 20) + 10; // Valores entre 10 y height-10
        puntos.push([x, y]);
    }

    // Ordenar los puntos para formar un polígono convexo
    return ordenarPuntosConvexos(puntos);
}

// Función para ordenar los puntos en sentido antihorario
function ordenarPuntosConvexos(puntos) {
    // Calcular el centroide de los puntos
    const centroide = puntos.reduce((acum, p) => [acum[0] + p[0], acum[1] + p[1]], [0, 0]);
    centroide[0] /= puntos.length;
    centroide[1] /= puntos.length;

    // Función para calcular el ángulo de un punto respecto al centroide
    function calcularAngulo(punto) {
        return Math.atan2(punto[1] - centroide[1], punto[0] - centroide[0]);
    }

    // Ordenar los puntos según su ángulo respecto al centroide
    return puntos.slice().sort((a, b) => calcularAngulo(a) - calcularAngulo(b));
}

function esConvexo(puntos) {
    const n = puntos.length;
    let signos = [];

    for (let i = 0; i < n; i++) {
        const o = puntos[i];
        const a = puntos[(i + 1) % n];
        const b = puntos[(i + 2) % n];
        const cp = (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
        signos.push(cp);
    }

    const positivo = signos.every(cp => cp > 0);
    const negativo = signos.every(cp => cp < 0);

    return positivo || negativo;
}






