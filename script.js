const diccionario = { a: "ai", e: "enter", i: "imes", o: "ober", u: "ufat" };
const text = document.getElementById("text");
const textarea_contaner = document.querySelector(".contenedor_textarea");
const dialogo = document.getElementById("dialog");

function encriptar(text_user) {
  let listas = [];
  for (let letra of text_user) {
    if (diccionario[letra]) {
      listas.push(diccionario[letra]);
    } else {
      listas.push(letra);
    }
  }
  return listas.oin("");
}

function desencriptar(text_user) {
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

function is_mayuscula(letra) {
  return /[áéíóúŕẃýíṕśǵ́ḱĺźćńḿA-ZÁÉÍÓÚŔẂÝÍṔŚǴ́ḰĹÑŹĆŃḾ]/.test(letra);
}

text.addEventListener("input", function () {
  console.log(text.value);
  const letra = text.value.charAt(text.value.length - 1);

  if (text.value.length === 0) {
    textarea_contaner.style.borderColor = "#e4f1ff";
    return;
  }

  if (is_mayuscula(letra)) {
    textarea_contaner.style.borderColor = "red";
    text.setAttribute("maxlength", text.value.length);
  } else {
    text.removeAttribute("maxlength");
    textarea_contaner.style.borderColor = "green";
  }
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
  dialogo.showModal();
  setTimeout(function () {
    dialogo.close();
  }, 1000);
});
