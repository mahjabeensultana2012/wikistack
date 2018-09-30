const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const {db, Page, User} = require('./models')

db.authenticate().
then(() => {
  console.log('connected to the database');
})

const PORT = 4000;
const init = async() => {
  // await Page.sync ();
  // await User.sync();
  await db.sync()

  server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
}

init();
