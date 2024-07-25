const diccionario = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
const text = document.getElementById("text");
const textarea_contaner = document.querySelector(".contenedor_textarea");
const dialogo = document.getElementById("dialog");
const no_mayusculas = document.getElementById("no-mayusculas");
const no_tildes = document.getElementById("no-tildes");
const iconos = document.querySelector(".icons");

function encriptar(text_user) {
  if (text.hasAttribute("maxlength")) {
    return text_user;
  }

  let listas = [];
  for (let letra of text_user) {
    if (diccionario[letra]) {
      listas.push(diccionario[letra]);
    } else {
      listas.push(letra);
    }
  }
  return listas.join("");
}

function desencriptar(text_user) {
  if (text.hasAttribute("maxlength")) {
    return text_user;
  }
  let text_user_copy = text_user;
  for (let key in diccionario) {
    let value = diccionario[key];
    if (text_user_copy.includes(value)) {
      text_user_copy = text_user_copy.replaceAll(value, key);
    }
  }
  return text_user_copy;
}

document.getElementById("encriptar").addEventListener("click", function () {
  const text_user = text.value;
  const text_encriptado = encriptar(text_user);
  document.getElementById("text").value = text_encriptado;
});

document.getElementById("desencriptar").addEventListener("click", function () {
  const text_user = text.value;
  const text_encriptado = desencriptar(text_user);
  document.getElementById("text").value = text_encriptado;
});

function es_mayuscula(letra) {
  return /[A-Z]/.test(letra) || es_tilde_mayuscula(letra);
}
function es_tilde(letra) {
  return es_tilde_mayuscula(letra) || es_tilde_minuscula(letra);
}

function es_tilde_mayuscula(letra) {
  return /[ZÁÉÍÓÚŔẂÝÍṔŚǴ́ḰĹÑŹĆŃḾ]/.test(letra);
}
function es_tilde_minuscula(letra) {
  return /[áéíóúŕẃýíṕśǵ́ḱĺźćńḿ]/.test(letra);
}

text.addEventListener("input", function () {
  if (text.value.length === 0) {
    textarea_contaner.style.borderColor = "#e4f1ff";
    no_mayusculas.classList.remove("invalido");
    no_tildes.classList.remove("invalido");
    iconos.classList.add("hidden");
    return;
  }
  iconos.classList.remove("hidden");

  for (letra of text.value) {
    if (es_mayuscula(letra) && es_tilde(letra)) {
      textarea_contaner.style.borderColor = "red";
      text.setAttribute("maxlength", text.value.length);
      no_mayusculas.classList.add("invalido");
      no_tildes.classList.add("invalido");
      return;
    } else if (es_mayuscula(letra)) {
      textarea_contaner.style.borderColor = "red";
      text.setAttribute("maxlength", text.value.length);
      no_mayusculas.classList.add("invalido");
      return;
    } else if (es_tilde(letra)) {
      textarea_contaner.style.borderColor = "red";
      text.setAttribute("maxlength", text.value.length);
      no_tildes.classList.add("invalido");
      return;
    }
  }
  text.removeAttribute("maxlength");
  textarea_contaner.style.borderColor = "green";
  no_mayusculas.classList.remove("invalido");
  no_tildes.classList.remove("invalido");
});

document.getElementById("copy").addEventListener("click", function () {
  const text_user = text.value;
  navigator.clipboard.writeText(text_user);
  dialogo.textContent = "¡Texto copiado!";
  dialogo.showModal();
  setTimeout(function () {
    dialogo.close();
  }, 1000);
});

document.getElementById("clear").addEventListener("click", function () {
  text.value = "";
  text.removeAttribute("maxlength");
  textarea_contaner.style.borderColor = "#e4f1ff";
  dialogo.textContent = "¡Texto borrado!";
  iconos.classList.add("hidden");
  no_mayusculas.classList.remove("invalido");
  no_tildes.classList.remove("invalido");
  dialogo.showModal();
  setTimeout(function () {
    dialogo.close();
  }, 1000);
});
