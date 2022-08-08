//Items del HTML
const formRegistro = document.querySelector(".regContainer");
const nombreRegistro = document.querySelector("#nombreReg");
const apellidoRegistro = document.querySelector("#apellidoReg");
const emailRegistro = document.querySelector("#emailRegister");
const passwordRegistro = document.querySelector("#passwordRegister");
const passwordConfirm = document.querySelector("#passwordConfirm");
const parrafo = document.querySelector("#errores");
let usuariosRegistrados = [];
let baseDeDatos = [];
//Evento submit----------------------------------
formRegistro.addEventListener("submit", (e) => {
  //Prevenimos la recarga de la pagina
  e.preventDefault();
  let error = "";
  let enviar = false;
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  //Validamos el largo del nombre
  if (nombreRegistro.value.length < 1) {
    error += `El nombre tiene menos de 2 caracteres <br>`;
    enviar = true;
  }
  //Validamos el largo del apellido
  if (apellidoRegistro.value.length < 1) {
    error += `El apellido tiene menos de 2 caracteres <br>`;
    enviar = true;
  }
  //Validamos que la contraseña cumpla los parametros
  if (!validatePasswordSymbol(passwordRegistro.value)) {
    error += `La contraseña tiene que tener una mayuscula, minuscula, numero y simbolo <br>`;
    enviar = true;
  }
  //Validamos que la contraseña conicida con el check
  if (!confirmPassword(passwordRegistro.value, passwordConfirm.value)) {
    error += `Las contraseñas no coinciden <br>`;
    enviar = true;
  }
  //Validamos que sea un email valido
  if (!regexEmail.test(emailRegistro.value)) {
    error += `El email no es valido <br>`;
    enviar = true;
  }
  buscarBaseDatos();

  //Si alguna de las condiciones de arriba se activa se dispara el if, pintando el error correspondiente
  if (enviar) {
    parrafo.classList.add("errores");
    parrafo.innerHTML = error;
  } else {
    //Si se cumple todos los parametros del formulario corre el codigo que almacena los datos en el local sotrage y la base de datos, y luego nos redirecciona al login
    parrafo.classList.add("labels");
    parrafo.innerHTML = "Enviado";
    createUser();
    alLogin();
  }
});
//Funcion para verificar que las contraseñas coincidan
const confirmPassword = (password, confirmPassword) => {
  return password === confirmPassword;
};
//Funcion para validar la contraseña
const validatePasswordSymbol = (password) => {
  let re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
  return re.test(password);
};
//Funcion que crea el objeto usuario, lo pushea a la base de datos y al local storage
function createUser() {
  let user = {
    nombre: nombreRegistro.value,
    apellido: apellidoRegistro.value,
    email: emailRegistro.value,
    pass: passwordRegistro.value,
    CBU: Date.now(),
    saldo: 10000,
    movimientos: [],
  };
  let userData = emailRegistro.value;
  localStorage.setItem(userData, JSON.stringify(user));
  if (localStorage.getItem("baseDeDatos")) {
    baseDeDatos = JSON.parse(localStorage.getItem("baseDeDatos"));
    localStorage.removeItem("baseDeDatos");
    baseDeDatos.push(user);
    localStorage.setItem("baseDeDatos", JSON.stringify(baseDeDatos));
  } else {
    baseDeDatos.push(user);
    localStorage.setItem("baseDeDatos", JSON.stringify(baseDeDatos));
  }
}
//Funcion que busca si hay una base de datos y si hay una base, verifica si ya esta registrado el usuario
function buscarBaseDatos() {
  let noEsta = true;

  if (localStorage.getItem("baseDeDatos")) {
    usuariosRegistrados = JSON.parse(localStorage.getItem("baseDeDatos"));
    for (let i in usuariosRegistrados) {
      if (usuariosRegistrados[i].email === emailRegistro.value) {
        noEsta = false;
      }
    }
    if (!noEsta) {
      parrafo.innerHTML = `El email ya esta registrado`;
      parrafo.classList.add("errores");
      enviar = true;
    }
  }
}
//Funciona para redireccion al login
function alLogin() {
  location.assign("../login/login.html");
}
