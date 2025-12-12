const botonesDias = document.querySelectorAll("#menu-dias button");
const tituloDia = document.getElementById("titulo-dia");
const listaHorarios = document.getElementById("lista-horarios");
const inputHorario = document.getElementById("input-horario");
const btnAgregar = document.getElementById("btn-agregar");
const contenedor = document.getElementById("contenedor-dia");

let diaActual = null;

// Obtener datos guardados o crear estructura vacía
let horarios = JSON.parse(localStorage.getItem("horarios")) || {
  lunes: [],
  martes: [],
  miercoles: [],
  jueves: [],
  viernes: [],
  sabado: [],
  domingo: []
};

// Mostrar horarios del día seleccionado
function cargarHorarios(dia) {
  diaActual = dia;

  // activar animación del contenedor
  contenedor.classList.remove("mostrar");
  setTimeout(() => contenedor.classList.add("mostrar"), 20);

  tituloDia.textContent = "Horarios de " + dia.charAt(0).toUpperCase() + dia.slice(1);
  listaHorarios.innerHTML = "";

  horarios[dia].forEach((item, index) => {
    let li = document.createElement("li");
    li.textContent = item;

    let btn = document.createElement("button");
    btn.textContent = "X";
    btn.classList.add("borrar");
    btn.onclick = () => eliminarHorario(index);

    li.appendChild(btn);
    listaHorarios.appendChild(li);
  });
}

// Agregar horario
function agregarHorario() {
  if (!diaActual) return alert("Selecciona un día primero.");
  if (inputHorario.value.trim() === "") return;

  horarios[diaActual].push(inputHorario.value);
  guardarLocal();
  cargarHorarios(diaActual);

  inputHorario.value = "";
}

// Eliminar horario con animación
function eliminarHorario(i) {
  const item = listaHorarios.children[i];
  item.classList.add("eliminando");

  setTimeout(() => {
    horarios[diaActual].splice(i, 1);
    guardarLocal();
    cargarHorarios(diaActual);
  }, 300);
}

// Guardar en LocalStorage
function guardarLocal() {
  localStorage.setItem("horarios", JSON.stringify(horarios));
}

// EVENTOS
botonesDias.forEach(boton => {
  boton.addEventListener("click", () => cargarHorarios(boton.dataset.dia));
});

btnAgregar.addEventListener("click", agregarHorario);
