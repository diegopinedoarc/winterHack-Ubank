const emailLogin = document.querySelector("#emailLog");
const passwordLogin = document.querySelector("#passwordLog");
const formLogin = document.querySelector(".logContainer");
const parrafo = document.querySelector("#errores");
let baseDeDatos = [];
let usuario = emailLogin.value;
//funcion para descargar la base de datos
function descargaBaseDeDatos() {
  baseDeDatos = JSON.parse(localStorage.getItem("baseDeDatos"));
}
//Evento al enviar el login
formLogin.addEventListener("submit", (e) => {
  e.preventDefault();
  if (localStorage.getItem("baseDeDatos")) {
    descargaBaseDeDatos();
    let usuarioLog = checkDatos();
    if (usuarioLog) {
      let cname = `usuario`;
      let cvalue = emailLogin.value;
      console.log(cvalue);
      setCookie(cname, cvalue);
      alHome();
    } else {
      parrafo.classList.add("labels");
      parrafo.innerHTML = "El usuario o la contraseña no coinciden";
    }
  }
});

function checkDatos() {
  let entrar = false;
  for (let i in baseDeDatos) {
    if (baseDeDatos[i].email === emailLogin.value) {
      if (baseDeDatos[i].pass === passwordLogin.value) {
        entrar = true;
      }
    }
  }
  return entrar;
}

function alHome() {
  location.assign("../homeUser/home.html");
}
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  var path = "path=/homeUser/home.html";
  document.cookie = cname + "=" + cvalue + "; " + expires + ";" + path;
}
