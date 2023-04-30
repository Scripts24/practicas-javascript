
const fecha = document.querySelector("#fecha");
const lista = document.querySelector("#lista");
const input = document.querySelector("#input");
const botonEnter = document.querySelector("#enter");
const check = "fa-check-circle"
const unCheck = "fa-circle"
const lineThrough = "line-through"
let id 
let LISTA

/* Creación de fecha*/ 

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-AR',{weekday:'long', month:'short', day:'numeric'})

/* Función Agregar tarea*/ 

function agregarTarea(tarea, id, realizado, eliminado){

    if(eliminado){
        return //Si eliminado es true nada de lo de abajo se va a ejecutar
    }

    const REALIZADO = realizado ? check : unCheck
    const LINE = realizado ? lineThrough : ''

    const elemento = `
                <li id ="elemento">
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash do" data="eliminado" id="${id}"></i>
                </li>
    `
    lista.insertAdjacentHTML("beforeend",elemento)
}

/* Función de Tarea realizada*/ 

function tareaRealizada(element){
    element.classList.toggle('check');
    element.classList.toggle('unCheck');
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)// que del elemento padre(li) identifique la que tenga la clase text y le agregue lineThrough
    LISTA[element.id].realizado = LISTA[element.id].realizado ? false : true                                                                          
}

/* Función de Tarea eliminada*/

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode) //doble parentNode: para que vaya al padre de li (ul) y remueva el li afectado
    LISTA[element.id].eliminado = true 
}


botonEnter.addEventListener('click', () =>{
    const tarea = input.value 
    if(tarea){
        agregarTarea(tarea, id, false, false)
        LISTA.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }
    localStorage.setItem('ToDo', JSON.stringify(LISTA))
    input.value = ''
    id++
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const tarea = input.value 
        if(tarea){
            agregarTarea(tarea, id, false, false)
            LISTA.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }
        localStorage.setItem('ToDo', JSON.stringify(LISTA))
        input.value = ''
        id++
    }
})

lista.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value //que de los atributos lea el valor de data
    if(elementData === 'realizado'){
        tareaRealizada(element)
    }else if (elementData === 'eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('ToDo', JSON.stringify(LISTA))
})

// LocalStorage get item

let data = localStorage.getItem('ToDo')
if(data){
    LISTA = JSON.parse(data)
    id = LISTA.length;
    cargarLista(LISTA)
}else{
    LISTA = []
    id = 0
}

function cargarLista(DATA){
    DATA.forEach(function(i) {
        agregarTarea(i.nombre, i.id, i.realizado,i.eliminado)  
    });
}