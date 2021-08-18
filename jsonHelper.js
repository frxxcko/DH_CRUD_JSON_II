const FS = require("fs");

const jsonHelper = {
  leerArchivo: function (nombreArchivo) {
    return JSON.parse(
      FS.readFileSync(__dirname + "/" + nombreArchivo + ".json", "utf-8")
    );
  },
  escribirArchivo: function (nombreArchivo, datos) {
    FS.writeFileSync(
      __dirname + "/" + nombreArchivo + ".json",
      JSON.stringify(datos)
    );
  },
};

module.exports = jsonHelper;
