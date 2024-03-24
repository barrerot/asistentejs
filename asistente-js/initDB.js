'use strict';

const { askUser } = require('./lib/inputUtils'); // Cambio aquí
const { mongoose, connectMongoose, Cumpleaños, Evento } = require('./models');

const CUMPLEAÑOS_JSON = './Cumpleaños.json';
const EVENTOS_JSON = './eventos.json';

main().catch(err => console.error('Error!', err));

async function main() {
  
  // Si buscáis en la doc de mongoose (https://mongoosejs.com/docs/connections.html),
  // veréis que mongoose.connect devuelve una promesa que podemos exportar en connectMongoose
  // Espero a que se conecte la BD (para que los mensajes salgan en orden)
  await connectMongoose; 

  const answer = await askUser('Are you sure you want to empty DB and load initial data? (no) ');
  if (answer.toLowerCase() !== 'yes') {
    console.log('DB init aborted! nothing has been done');
    return process.exit(0);
  }

  // Inicializar nuestros modelos
  const cumpleañosResult = await initCumpleaños(CUMPLEAÑOS_JSON);
  console.log(`\nCumpleañoss: Deleted ${cumpleañosResult.deletedCount}, loaded ${cumpleañosResult.loadedCount} from ${CUMPLEAÑOS_JSON}`);
  const eventosResult = await initEventos(EVENTOS_JSON);
  console.log(`\nEventos: Deleted ${eventosResult.deletedCount}, loaded ${eventosResult.loadedCount} from ${EVENTOS_JSON}`);

  // Cuando termino, cierro la conexión a la BD
  await mongoose.connection.close();
  console.log('\nDone.');
}

async function initCumpleaños(fichero) {
  const { deletedCount } = await Cumpleaños.deleteMany();
  const loadedCount = await Cumpleaños.cargaJson(fichero);
  return { deletedCount, loadedCount };
}
async function initEventos(fichero) {
  const { deletedCount } = await Evento.deleteMany();
  const loadedCount = await Evento.cargaJson(fichero);
  return { deletedCount, loadedCount };
}
