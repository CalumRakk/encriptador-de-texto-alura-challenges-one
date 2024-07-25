text_user = input(">>>")


diccionario = {"a": "ia", "e": "enter", "i": "imes", "o": "ober", "u": "ufat"}


def encriptar(text_user: str):
    listas = []
    for letra in text_user:
        if letra in diccionario:
            listas.append(diccionario[letra])
        else:
            listas.append(letra)
    return "".join(listas)


def desencriptar(text_user: str):
    listas = []

    text_user_copy = text_user
    for key, value in diccionario.items():
        if value in text_user_copy:
            text_user_copy = text_user_copy.replace(value, key)

    return text_user_copy


desencriptar(encriptar(text_user))
