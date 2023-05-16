$(document).ready( ()=>{
    $.ajax({
        url: 'http://localhost:8080/api/tarea/',
        type: 'GET',
        datatype: 'json',
        success: function(res){

            console.log(res[0].titulo);

            

            const $tabla = document.querySelector(".tabla");

            i = 0;
            for(tarea of res){
                /*let datos_fila = semanas[i];*/
                const $nuevaFila = document.createElement("tr");

                let elemento_tema = `
                    <td class="tabla__tema">
                    <h2>${tarea.titulo}</h2>
                    <p>${tarea.descripcion}</p>
                    </td>
                `

                let elemento_clase = tarea.hasOwnProperty("link")?
                `
                    <td class="tabla__clase">
                    <a class="clase__elemento" href="${tarea.link}" target="__blank">
                        <img class="tabla__logo" src="./img/icon/drive.png" alt="tarea ${i+1}" title="tarea ${i+1}">
                        <span>tarea ${i+1}</span>
                    </a>
                    </td>
                `:'<td class="tabla__clase"></td>'

                
                let elemento_trabajo = `<td class="tabla__trabajo"></td>`;
                if(tarea.hasOwnProperty("detalle_lenguajes")){
                    elemento_trabajo = `<td class="tabla__trabajo trabajo__elementos">`;
                    "Spring boot-Postgresql-Html-Java Script-Css-Google Cloud"
                    elementos = tarea.detalle_lenguajes.split("-")
                    for(let i = 0; i < elementos.length; i = i + 1){
                        let elemento = elementos[i].replace("%20","_").replace(" ","_");
                        elemento_trabajo = elemento_trabajo + 
                        `<div class="clase__elemento">
                        <img class="tabla__logo" src="./img/icon/${elemento}.png" alt="${elemento}" title="${elemento}">
                        <span>${elemento.replace("_"," ")}</span>
                        </div>`
                    }
                    elemento_trabajo = elemento_trabajo + `</td>`;
                }

                
                $nuevaFila.innerHTML = `
                <td class="tabla__semana">${tarea.fecha_entrega}</td>
                ${elemento_tema}
                ${elemento_clase}
                ${elemento_trabajo}`
                $tabla.appendChild($nuevaFila);
                i = i + 1
           }
            
        }
    })
})



const $boton_informacion = document.querySelector(".desplegar__informacion"),
$sumilla = document.querySelector(".sumilla"),
$competencia__general = document.querySelector(".competencia__general");
$boton_informacion.addEventListener("click",(e)=>{
    if(e.target.innerText == "Desplegar"){
        $sumilla.style.display = "block";
        $competencia__general.style.display = "block";
        e.target.innerText = "ocultar"
    }else{
        $sumilla.style.display = "none";
        $competencia__general.style.display = "none";
        e.target.innerText = "desplegar";
    }
})