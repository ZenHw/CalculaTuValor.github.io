
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

function res(vf, periodoArray, vfArray, anualidadArray){
    const div = document.getElementById("resultado");
    
    div.innerHTML = `<p>El resultado es ${vf}</p>
    <canvas id="myChart"></canvas>`

    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
          labels: periodoArray,
          datasets: [{
            label: 'Pagos fijos anuales',
            data: anualidadArray,
            borderWidth: 3
          },
          {
            label: 'Valor futuro anual',
            data: vfArray,
            borderWidth: 3
          }]
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
    const vp = document.getElementById("vp").value;
    let anualidad = document.getElementById("anualidad").value;
    let interes = document.getElementById("interes").value;
    let periodo = document.getElementById("periodo").value;

    // Si no es numero manda alerta.
    if(isNaN(vp) || isNaN(interes) || isNaN(periodo) || isNaN(anualidad)){
        alert("Ingresa valores validos");
        return;
    }

    anualidad = anualidad * 12;

    // Obtenemos valor futuro
     let vf = vp * (1 + (interes / 100)) ** periodo;

    // Obtenemos valor futuro dado anualidad
    let vfAnualidad = anualidad * (((1 + (interes / 100)) ** periodo - 1) / (interes / 100));

    // vf total.
    vf = vf + vfAnualidad;

    // Obtenemos el valor de futuro para cada anio para poder graficar anio con anio
     const vfArray = [vp];

     for (i = 1; i <= periodo; i++){
        let vfAnio = vp * (1 + (interes / 100)) ** i;
        let anualidadAnio = anualidad * (((1 + (interes / 100)) ** i - 1) / (interes / 100));

        //vfArray.push(vp * (1 + (interes / 100)) ** i);
        vfArray.push(anualidadAnio + vfAnio);
    }

    // Hacemos un array del periodo para graficarlo anio por anio.
    const periodoArray = [];

    for (i = 0; i <= periodo; i++){
        periodoArray.push(i);
    }

    // Hacemos un array de la anualidad para graficarla anio con anio.
    const anualidadArray = [];

    for(i = 0; i <= periodo; i++){
        anualidadArray.push(anualidad);
    }

    
    // Hacemos formato moneda.
    vf = formatoMoneda(vf);
    res(vf, periodoArray, vfArray, anualidadArray);
}

