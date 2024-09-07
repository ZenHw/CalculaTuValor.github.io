
// Obtiene formato tipo moneda dolar.
function formatoMoneda(anualidad){
    const locales = 'en-US';

    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    const formate = new Intl.NumberFormat(locales, options);
    const price = formate.format(anualidad);
    return price;
}

function res(anualidad, periodoArray, vfArray, anualidadArray){
    const div = document.getElementById("resultado");
    
    div.innerHTML = `<p>El resultado es ${anualidad}</p>
    <canvas id="myChart"></canvas>`

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: periodoArray,
          datasets: [{
            label: 'Pagos fijos',
            data: anualidadArray,
            borderWidth: 3
          },
          {
            label: 'Valor futuro',
            data: vfArray,
            borderWidth: 3
          }],
        },
        options: {
          scales: {
            x: {
              stacked: true
            }
          }
        }
      });
}

// Obtiene el valor del form y hace la cuenta
function calcular(){
    const vf = document.getElementById("vf").value;
    const interes = document.getElementById("interes").value;
    const periodo = document.getElementById("periodo").value;

    // Si no es numero manda alerta.
    if(isNaN(vf) || isNaN(interes) || isNaN(periodo)){
        alert("Ingresa valores validos");
        return;
    }

    // Obtenemos la anualidad
    let anualidad = vf * ((interes / 100) / ((1 + (interes / 100)) ** periodo - 1));

    // Obtenemos el valor de futuro para cada anio para poder graficar anio con anio
    const vfArray = [0];

    for (i = periodo; i >= 1; i--){
        vfArray.push(vf * ((interes / 100) / ((1 + (interes / 100)) ** i - 1)));
    }

    // Hacemos un array del periodo para graficarlo anio por anio.
    const periodoArray = [];
    for (i = 0; i <= periodo; i++){
        periodoArray.push(i);
    }

    // Hacemos un array para graficar anio con anio la anualidad constante.
    const anualidadArray = [0];

    for (i = 1; i <= periodo; i++){
        anualidadArray.push(anualidad);
    }

    
    // Hacemos formato moneda.
    anualidad = formatoMoneda(anualidad);
    res(anualidad, periodoArray, vfArray, anualidadArray);
}

