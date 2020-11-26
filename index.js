const app = require('./server/server');
const config = require('./server/config/config');

//SERVER
app.listen(config.port, () => {
    console.log(`Server is Running on ${config.port} port`)
});
