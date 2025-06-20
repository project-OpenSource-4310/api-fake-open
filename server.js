const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();

// Leer el archivo db.json
const dbPath = path.join(__dirname, 'db.json');
const router = jsonServer.router(dbPath);
const middlewares = jsonServer.defaults();

// Configurar CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

server.use(middlewares);

// Ruta principal
server.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente ✅',
    endpoints: [
      '/api/users',
      '/api/candidate_profiles',
      '/api/employer_profiles',
      '/api/job_offers',
      '/api/applications',
      '/api/messages',
      '/api/interviews',
      '/api/evaluations',
      '/api/membership_plans',
      '/api/employer_memberships'
    ],
    examples: [
      '/api/users - Obtener todos los usuarios',
      '/api/job_offers?status=Activa - Filtrar ofertas activas',
      '/api/applications?candidate_id=1 - Aplicaciones de un candidato'
    ]
  });
});

// Usar el router bajo /api
server.use('/api', router);

// Exportar para Vercel
module.exports = server;