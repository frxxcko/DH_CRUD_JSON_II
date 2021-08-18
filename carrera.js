const FS = require("fs");
const jsonHelper = require("./jsonHelper");
const autosDeJSON = jsonHelper.leerArchivo("autos");

const CARRERA = {
  autos: autosDeJSON,
  autosPorTanda: 6,
  listarAutos: function (array = this.autos) {
    array.forEach((auto) => {
      console.log(
        `\nPiloto: ${auto.piloto}, patente: ${auto.patente}, peso ${
          auto.peso
        }Kg, estado: ${auto.sancionado ? "Sancionado" : "Habilitado"}`
      );
    });
  },
  autosHabilitados: function () {
    return this.autos.filter((auto) => !auto.sancionado);
  },
  buscarPorPatente: function (patente) {
    return this.autos.find((auto) => auto.patente === patente);
  },
  buscarPorCilindrada: function (cilindradaPermitida) {
    return this.autosHabilitados().filter(
      (auto) => auto.cilindrada <= cilindradaPermitida
    );
  },
  ordenarPorVelocidad: function () {
    return this.autos.sort((autoA, autoB) => autoA.velocidad - autoB.velocidad);
  },
  generarTanda: function (cilindradaPermitida, pesoPermitido) {
    return this.buscarPorCilindrada(cilindradaPermitida)
      .filter((auto) => auto.peso <= pesoPermitido)
      .splice(0, this.autosPorTanda);
  },
  listarPodio: function (arrayDeAutosDeTanda) {
    const PODIO = arrayDeAutosDeTanda
      .sort((autoA, autoB) => autoB.puntaje - autoA.puntaje)
      .splice(0, 3);
    console.log(`
    El ganador es ${PODIO[0].piloto}, con puntaje de: ${PODIO[0].puntaje}
    El segundo puesto es para ${PODIO[1].piloto}, con puntaje de: ${PODIO[1].puntaje}
    El tercer puesto es para ${PODIO[2].piloto}, con puntaje de: ${PODIO[2].puntaje}`);
  },
};

// CARRERA.listarAutos();
// CARRERA.listarAutos(CARRERA.autosHabilitados());
// console.log(CARRERA.buscarPorPatente("RGB159"));
// console.log(CARRERA.buscarPorCilindrada(1500));
// console.table(CARRERA.ordenarPorVelocidad());
// console.table(CARRERA.generarTanda(2000, 2000));
CARRERA.listarPodio(CARRERA.generarTanda(2000, 2000));
