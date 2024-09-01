const { SERVER_PORT } = require('./consts');
const { app } = require('./app');

app.listen(SERVER_PORT, () => console.log('server listening on the port: ', SERVER_PORT));
