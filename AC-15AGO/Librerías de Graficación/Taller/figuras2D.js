const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const shapeSelect = document.getElementById('shape');
const coordenadasSelect = document.getElementById('coordenadas');
const cartesianasDiv = document.getElementById('cartesianas');
const polaresDiv = document.getElementById('polares');
const xInput = document.getElementById('x');
const yInput = document.getElementById('y');
const radioInput = document.getElementById('radio');
const anguloInput = document.getElementById('angulo');
const radioFiguraInput = document.getElementById('radioFigura');
const ladosInput = document.getElementById('lados');
const colorRellenoInput = document.getElementById('colorRelleno');
const colorBordeInput = document.getElementById('colorBorde');
const dibujarButton = document.getElementById('dibujar');

coordenadasSelect.addEventListener('change', () => {
    if (coordenadasSelect.value === 'cartesianas') {
      cartesianasDiv.style.display = 'block';
      polaresDiv.style.display = 'none';
    } else {
      cartesianasDiv.style.display = 'none';
      polaresDiv.style.display = 'block';
    }
  });