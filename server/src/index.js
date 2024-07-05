const app = require('./App');

const PORT = 3001;
const HOST = 'localhost'

app.listen(PORT, HOST, () => {
    console.log(`Listening: http://${HOST}:${PORT}`);
});