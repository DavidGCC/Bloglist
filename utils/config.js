require('dotenv').config();

const PORT = process.env.PORT || 3001;
let MONGODB_URL;

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = process.env.TEST_MONGODB_URL;
}

if (process.env.NODE_ENV === 'development') {
    MONGODB_URL = process.env.DEV_MONGODB_URL;
}

if (process.env.NODE_ENV === 'production') {
    MONGODB_URL = process.env.PRODUCTION_MONGODB_URL;
}

module.exports = {
    PORT, MONGODB_URL,
};
