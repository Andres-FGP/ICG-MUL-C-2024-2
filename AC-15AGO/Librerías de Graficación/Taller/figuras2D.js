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

  const limpiarButton = document.getElementById('limpiar');
    limpiarButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  dibujarButton.addEventListener('click', (e) => {

    e.preventDefault();
        
    const shape = shapeSelect.value;
    const coordenadas = coordenadasSelect.value;
    let x, y;
  
    if (coordenadas === 'cartesianas') {
      x = parseInt(xInput.value);
      y = parseInt(yInput.value);
    } else {
      const radio = parseInt(radioInput.value);
      const angulo = parseInt(anguloInput.value);
      x = radio * Math.cos(angulo * Math.PI / 180);
      y = radio * Math.sin(angulo * Math.PI / 180);
    }

    const radioFigura = parseInt(radioFiguraInput.value);
    const lados = parseInt(ladosInput.value);
    const colorRelleno = colorRellenoInput.value;
    const colorBorde = colorBordeInput.value;

    switch (shape) {
        case 'circulo':
          ctx.beginPath();
          ctx.arc(x, y, radioFigura, 0, 2 * Math.PI);
          ctx.fillStyle = colorRelleno;
          ctx.fill();
          ctx.strokeStyle = colorBorde;
          ctx.stroke();
          break;