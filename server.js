const http = require('http');

const app = require('./app');
const server = http.createServer(app);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}!`);
});
