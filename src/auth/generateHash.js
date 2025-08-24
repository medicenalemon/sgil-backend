import bcrypt from 'bcryptjs';

const plainPassword = 'Admin1234';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(plainPassword, salt);

console.log('Tu contraseña en texto plano es:', plainPassword);
console.log('Tu hash es:', hash);