const bcrypt = require('bcrypt');

bcrypt.hash(myPlaintextPassword, 10).then(function (hash) {
    // Store hash in your password DB.
});