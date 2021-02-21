require('dotenv').config();

const PORT = process.env.PORT || 3001;
let { LISTABLOG_MONGODB: MONGODB_URL } = process.env;

const TEST_MONGODB_URL = 'mongodb+srv://davidgvetadze:12345678devdatabase@blogs.vm2be.mongodb.net/blogs?retryWrites=true&w=majority';
const DEV_MONGODB_URL = 'mongodb+srv://davidgvetadze:devdatabase@bloglistdev.xoylp.mongodb.net/bloglistdev?retryWrites=true&w=majority';

if (process.env.NODE_ENV === 'test') {
    MONGODB_URL = TEST_MONGODB_URL;
}

if (process.env.NODE_ENV === 'development') {
    MONGODB_URL = DEV_MONGODB_URL;
}

module.exports = {
    PORT, MONGODB_URL,
};
