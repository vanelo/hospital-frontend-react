import moment from "moment-timezone"
export {
    translate,
    getSexName,
    getFormattedDate
}

function translate(word) {
    const words = {
        id: "Id",
        username: "Nombre de usuario",
        password: "Contraseña",
        firstName: "Nombre",
        lastName: "Apellido",
        dni: "Cédula",
        email: "Correo",
        phone: "Teléfono",
        sex: "Sexo",
        birthdate: "Fecha de nacimineto",
        address: "Dirección",
        profesionalRegisterNumber: "Registro profesional",
        roles: "Roles"
    }

    return words[word] || word;
}

function getSexName(sex) {
    const sexs = {
        0: "Otro",
        1: "Masculino",
        2: "Femenino"
    }

    return sexs[sex] || "";
}

function getFormattedDate(date){
    if(!date) return "";
    return moment(date).tz("America/Asuncion").format("DD/MM/YYYY");
}