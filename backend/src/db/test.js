import db from '../config/db.js';

// Para comprobar por terminal la base de datos con la que estamos trabajando, el host y el puerto

db.raw('select current_database(), inet_server_addr(), inet_server_port()')
    .then(res => console.log(res.rows))
    .catch(err => console.error(err))
    .finally(() => db.destroy());

