const bcrypt = require('bcrypt');

const password = 'testpassword';
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function(err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log(hash);  // Usa este hash en tu base de datos
  }
});