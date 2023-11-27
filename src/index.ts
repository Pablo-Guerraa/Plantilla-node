import initializeServer from './config/server';
import registerModules from './config/modules';
import initializeDatabase from './config/database/initializeDatabase';
import config from './config';
import initializeFirebase from './config/firebase';

async function startServer() {

  // Initialize Hapi Server
  const server = initializeServer(); 

  // Initialize Firebase (Auth)
  await initializeFirebase(server);

  // Initialize database
  await initializeDatabase(__dirname).connect(server);

  // Register modules (APIs for this project)
  await registerModules(server);

  // Start the server
  await server.start();
  console.log(
    `\x1b[34m------------- Project: ${config.project.name}, Server run ${server.info.uri} ------------- \x1b[0m`,
  );
}

(async function init() {
  try {
    await startServer();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();