const svg = document.getElementById('svg');

class Punto {
    #x;
    #y;

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    getX() {
        return this.#x;
    }

    getY() {
        return this.#y;
    }

    setX(x) {
        this.#x = x;
    }

    setY(y) {
        this.#y = y;
    }
}

class Linea {
    #punto1;
    #punto2;

    constructor(x1, y1, x2, y2) {
        this.#punto1 = new Punto(x1, y1);
        this.#punto2 = new Punto(x2, y2);
    }

    dibujar() {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", this.#punto1.getX());
        line.setAttribute("y1", this.#punto1.getY());
        line.setAttribute("x2", this.#punto2.getX());
        line.setAttribute("y2", this.#punto2.getY());
        line.setAttribute("stroke", "black");
        svg.appendChild(line);
    }
}

class Circunferencia {
    #centro;
    #radio;

    constructor(cx, cy, r) {
        this.#centro = new Punto(cx, cy);
        this.#radio = r;
    }

    dibujar() {
        const circ = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circ.setAttribute("cx", this.#centro.getX());
        circ.setAttribute("cy", this.#centro.getY());
        circ.setAttribute("r", this.#radio);
        circ.setAttribute("fill", "none");
        circ.setAttribute("stroke", "black");
        svg.appendChild(circ);
    }
}

class Elipse {
    #centro;
    #radioX;
    #radioY;

    constructor(cx, cy, a, b) {
        this.#centro = new Punto(cx, cy);
        this.#radioX = a;
        this.#radioY = b;
    }

    dibujar() {
        const elipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
        elipse.setAttribute("cx", this.#centro.getX());
        elipse.setAttribute("cy", this.#centro.getY());
        elipse.setAttribute("rx", this.#radioX);
        elipse.setAttribute("ry", this.#radioY);
        elipse.setAttribute("fill", "none");
        elipse.setAttribute("stroke", "black");
        svg.appendChild(elipse);
    }
}

// Crear instancias y dibujar las primitivas
const linea = new Linea(50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar();

