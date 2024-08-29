const canvas = document.getElementById('canvas'); //llama las constantes del HTML
const ctx = canvas.getContext('2d');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // parametro "e" para que no se borre la figura instantaneamente
        const n = parseInt(document.getElementById('n').value); // llama constantes de HTML
        const lado = parseInt(document.getElementById('lado').value); // llama constantes de HTML
        const cx = parseFloat(document.getElementById('cx').value);  // llama constantes de HTML
        const cy = parseFloat(document.getElementById('cy').value); // llama constantes de HTML

       
        const apotema = lado / (2 * Math.tan(Math.PI / n)); // Calcula el apotema internamente

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "red";
        ctx.beginPath();

        // Ajusta el valor del canvas para que se centre en (0,0)
       ctx.translate(canvas.width / 2, canvas.height / 2);

        // Se añade un factor de escala ya que la figura estaba quedando muy pequeña
        const scaleFactor = 20; // ajusta este valor según sea necesario
        

// Calcular las coordenadas del primer vértice, con el fin de poner la figura recta, solo fue posible si el # de lados es par, impar no :(
let initialAngle = 0;
if (n % 2 !== 0) {
initialAngle = Math.PI / n;
}
let x = cx + apotema * Math.cos(initialAngle) * scaleFactor;
let y = cy + apotema * Math.sin(initialAngle) * scaleFactor;

// Dibujar el polígono
ctx.moveTo(x, y);
for (let i = 1; i < n; i++) { 
let angle = initialAngle + (i * 2 * Math.PI / n);
x = cx + apotema * Math.cos(angle) * scaleFactor;
y = cy + apotema * Math.sin(angle) * scaleFactor;
ctx.lineTo(x, y);
}

ctx.closePath();
ctx.stroke();
    });
});