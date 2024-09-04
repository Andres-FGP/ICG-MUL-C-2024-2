// Clase Cartesiana
class Cartesiana {
    constructor(x, y) {
      this._x = x;
      this._y = y;
    }
  
    get x() {
      return this._x;
    }
  
    get y() {
      return this._y;
    }
  
    set x(valor) {
      this._x = valor;
    }
  
    set y(valor) {
      this._y = valor;
    }
  }
  
  // Clase Polar
  class Polar {
    constructor(radio, angulo) {
      this._radio = radio;
      this._angulo = angulo;
    }
  
    get radio() {
      return this._radio;
    }
  
    get angulo() {
      return this._angulo;
    }
  
    set radio(valor) {
      this._radio = valor;
    }
  
    set angulo(valor) {
      this._angulo = valor;
    }
  
    toCartesiana() {
      const x = this._radio * Math.cos(this._angulo * Math.PI / 180);
      const y = this._radio * Math.sin(this._angulo * Math.PI / 180);
      return new Cartesiana(x, y);
    }
  }
  
  // Función para dibujar el polígono
  function dibujarPoligono(ctx, centro, radio, lados) {
    ctx.beginPath();
    const angulo = 360 / lados;
  
    for (let i = 0; i < lados; i++) {
      const puntoActual = new Polar(radio, i * angulo);
      const puntoCartesiano = puntoActual.toCartesiana();
      if (i === 0) {
        ctx.moveTo(centro.x + puntoCartesiano.x, centro.y + puntoCartesiano.y);
      } else {
        ctx.lineTo(centro.x + puntoCartesiano.x, centro.y + puntoCartesiano.y);
      }
    }
  
    ctx.closePath();
    ctx.stroke();
  }
  
  // Función para obtener los valores del usuario
  function obtenerValores() {
    const centroX = parseFloat(document.getElementById('x').value) || 200;
    const centroY = parseFloat(document.getElementById('y').value) || 200;
    const radio = parseFloat(document.getElementById('radio').value) || 50;
    const angulo = parseFloat(document.getElementById('angulo').value) || 0;
    const lados = parseInt(document.getElementById('lado').value) || 3;
    const apotema = parseFloat(document.getElementById('apotema').value) || 50;
    const opcion = document.querySelector('input[name="opcion"]:checked').value;
    const coordenadas = document.querySelector('input[name="coordenadas"]:checked').value;
  
    return { centroX, centroY, radio, angulo, lados, apotema, opcion, coordenadas };
  }
  
  function dibujarFigura() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const valores = obtenerValores();
    let centro;
  
    // Ajustar el centro del polígono dependiendo del sistema de coordenadas
    if (valores.coordenadas === 'polares') {
      const puntoPolar = new Polar(valores.radio, valores.angulo);
      centro = new Cartesiana(valores.centroX, valores.centroY);
    } else {
      centro = new Cartesiana(valores.centroX, valores.centroY);
    }
  
    // Limpiar el canvas antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
  
    let radio;
  
    if (valores.opcion === 'apotema') {
      // Calcular el radio usando la apotema
      radio = valores.apotema / Math.cos(Math.PI / valores.lados);
    } else {
      radio = valores.radio;
    }
  
    dibujarPoligono(ctx, centro, radio, valores.lados);
  }
  
  // Evento para dibujar la figura al hacer clic en el botón
  document.getElementById('dibujar').addEventListener('click', function(event) {
    event.preventDefault();
    dibujarFigura();
  });
  
  // Evento para cambiar la visibilidad de los campos de entrada según la opción seleccionada
  document.querySelectorAll('input[name="opcion"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      const opcion = document.querySelector('input[name="opcion"]:checked').value;
      
      if (opcion === 'apotema') {
        document.getElementById('apotema-section').classList.remove('hidden');
        document.getElementById('lado').classList.add('hidden');
      } else {
        document.getElementById('apotema-section').classList.add('hidden');
        document.getElementById('lado').classList.remove('hidden');
      }
    });
  });
  
  // Evento para cambiar la visibilidad de los campos de coordenadas según la opción seleccionada
  document.querySelectorAll('input[name="coordenadas"]').forEach(function(radio) {
    radio.addEventListener('change', function() {
      const coordenadas = document.querySelector('input[name="coordenadas"]:checked').value;
  
      if (coordenadas === 'polares') {
        document.getElementById('polares-coordenadas').classList.remove('hidden');
        document.getElementById('cartesianas-coordenadas').classList.add('hidden');
      } else {
        document.getElementById('polares-coordenadas').classList.add('hidden');
        document.getElementById('cartesianas-coordenadas').classList.remove('hidden');
      }
    });
  });
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  
  