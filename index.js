
// Obtiene formato tipo moneda dolar.
function formatoMoneda(vf){
    const locales = 'en-US';

    const options = {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }

    const formate = new Intl.NumberFormat(locales, options);
    const price = formate.format(vf);
    return price;
}

function res(vf, periodoArray, vfArray){
    const div = document.getElementById("resultado");
    
    div.innerHTML = `<p>El resultado es ${vf}</p>
    <canvas id="myChart"></canvas>`

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: periodoArray,
          datasets: [{
            label: 'Valor futuro',
            data: vfArray,
            borderWidth: 3
          }]
        },
        options: {
          scales: {
          }
        }
      });
}

// Obtiene el valor del form y hace la cuenta
function calcular(){
    const vp = document.getElementById("vp").value;
    const interes = document.getElementById("interes").value;
    const periodo = document.getElementById("periodo").value;

    // Si no es numero manda alerta.
    if(isNaN(vp) || isNaN(interes) || isNaN(periodo)){
        alert("Ingresa valores validos");
        return;
    }

    // Obtenemos valor futuro
    let vf = vp * (1 + (interes / 100)) ** periodo;

    // Obtenemos el valor de futuro para cada anio para poder graficar anio con anio
    const vfArray = [vp];

    for (i = 1; i <= periodo; i++){
        vfArray.push(vp * (1 + (interes / 100)) ** i);
        console.log(vfArray[i]);
    }

    // Hacemos un array del periodo para graficarlo anio por anio.
    const periodoArray = [];
    for (i = 0; i <= periodo; i++){
        periodoArray.push(i);
    }
    
    // Hacemos formato moneda.
    vf = formatoMoneda(vf);
    res(vf, periodoArray, vfArray);
}

