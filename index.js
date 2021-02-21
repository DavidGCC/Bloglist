const fs = require('fs');
const app = require('./app');
const config = require('./utils/config');

const opt = {
    key: fs.readFileSync(`${__dirname}/certs/localhost.key`),
    cert: fs.readFileSync(`${__dirname}/certs/localhost.crt`),
};


const { PORT } = config;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}, Running on ${process.env.NODE_ENV} mode`);
});
