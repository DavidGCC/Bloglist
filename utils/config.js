require('dotenv').config();

const { PORT } = process.env;
let { LISTABLOG_MONGODB: MONGODB_URL } = process.env;

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_MONGODB_URL;
}

module.exports = {
    PORT, MONGODB_URL,
};
