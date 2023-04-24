const express = require('express');
const db = require('./config/db');
const taskRouter = require('./routers/task');
const bp = require('body-parser');
const engine = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('handlebars', engine.engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.set('views', './views');

db.connect(function(err) {
    if(err) throw err;
    console.log("Connected");
})

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

taskRouter(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
})
