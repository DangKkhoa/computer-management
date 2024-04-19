const bcrypt = require('bcrypt')
const plainPassword = 'testuser';
const saltRounds = 10;

bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => { 
    console.log(hashedPassword);
})