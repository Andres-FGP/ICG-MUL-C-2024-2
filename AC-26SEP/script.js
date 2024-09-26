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
        let x1 = this.#punto1.getX();
        let y1 = this.#punto1.getY();
        let x2 = this.#punto2.getX();
        let y2 = this.#punto2.getY();

        // Algoritmo de Bresenham para líneas
        const dx = Math.abs(x2 - x1);
        const dy = Math.abs(y2 - y1);
        const sx = (x1 < x2) ? 1 : -1;
        const sy = (y1 < y2) ? 1 : -1;
        let err = dx - dy;

        while (true) {
            this.#dibujarPunto(x1, y1);  // Dibujar cada punto de la línea

            if (x1 === x2 && y1 === y2) break;
            const e2 = 2 * err;

            if (e2 > -dy) {
                err -= dy;
                x1 += sx;
            }
            if (e2 < dx) {
                err += dx;
                y1 += sy;
            }
        }
    }

    #dibujarPunto(x, y) {
        const punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        punto.setAttribute("cx", x);
        punto.setAttribute("cy", y);
        punto.setAttribute("r", 1);  // Simula píxeles con pequeños círculos
        punto.setAttribute("fill", "black");
        svg.appendChild(punto);
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
        // Algoritmo de Bresenham para circunferencias
        let x = 0;
        let y = this.#radio;
        let d = 3 - 2 * this.#radio;
        this.#dibujarOctantes(this.#centro.getX(), this.#centro.getY(), x, y);

        while (y >= x) {
            x++;
            if (d > 0) {
                y--;
                d = d + 4 * (x - y) + 10;
            } else {
                d = d + 4 * x + 6;
            }
            this.#dibujarOctantes(this.#centro.getX(), this.#centro.getY(), x, y);
        }
    }

    #dibujarOctantes(cx, cy, x, y) {
        this.#dibujarPunto(cx + x, cy + y);
        this.#dibujarPunto(cx - x, cy + y);
        this.#dibujarPunto(cx + x, cy - y);
        this.#dibujarPunto(cx - x, cy - y);
        this.#dibujarPunto(cx + y, cy + x);
        this.#dibujarPunto(cx - y, cy + x);
        this.#dibujarPunto(cx + y, cy - x);
        this.#dibujarPunto(cx - y, cy - x);
    }

    #dibujarPunto(x, y) {
        const punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        punto.setAttribute("cx", x);
        punto.setAttribute("cy", y);
        punto.setAttribute("r", 1);
        punto.setAttribute("fill", "black");
        svg.appendChild(punto);
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
        // Algoritmo de Bresenham para elipses
        let x = 0;
        let y = this.#radioY;
        let a2 = this.#radioX * this.#radioX;
        let b2 = this.#radioY * this.#radioY;
        let d1 = b2 - (a2 * this.#radioY) + (0.25 * a2);
        let dx = 2 * b2 * x;
        let dy = 2 * a2 * y;

        while (dx < dy) {
            this.#dibujarCuadrantes(this.#centro.getX(), this.#centro.getY(), x, y);
            if (d1 < 0) {
                x++;
                dx = dx + 2 * b2;
                d1 = d1 + dx + b2;
            } else {
                x++;
                y--;
                dx = dx + 2 * b2;
                dy = dy - 2 * a2;
                d1 = d1 + dx - dy + b2;
            }
        }

        let d2 = (b2 * (x + 0.5) * (x + 0.5)) + (a2 * (y - 1) * (y - 1)) - (a2 * b2);

        while (y >= 0) {
            this.#dibujarCuadrantes(this.#centro.getX(), this.#centro.getY(), x, y);
            if (d2 > 0) {
                y--;
                dy = dy - 2 * a2;
                d2 = d2 + a2 - dy;
            } else {
                y--;
                x++;
                dx = dx + 2 * b2;
                dy = dy - 2 * a2;
                d2 = d2 + dx - dy + a2;
            }
        }
    }

    #dibujarCuadrantes(cx, cy, x, y) {
        this.#dibujarPunto(cx + x, cy + y);
        this.#dibujarPunto(cx - x, cy + y);
        this.#dibujarPunto(cx + x, cy - y);
        this.#dibujarPunto(cx - x, cy - y);
    }

    #dibujarPunto(x, y) {
        const punto = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        punto.setAttribute("cx", x);
        punto.setAttribute("cy", y);
        punto.setAttribute("r", 1);
        punto.setAttribute("fill", "black");
        svg.appendChild(punto);
    }
}

// Crear instancias y dibujar las primitivas utilizando los algoritmos de Bresenham
const linea = new Linea(50, 50, 200, 200);
linea.dibujar();

const circunferencia = new Circunferencia(300, 100, 50);
circunferencia.dibujar();

const elipse = new Elipse(400, 300, 80, 50);
elipse.dibujar();


