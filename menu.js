let transactionNumber = 200;
let registeredAccounts = 100;
const users = [];
// constructors
function User(name, lastname, email, password = '1234') {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
  this.accounts = [];
}

function Account(accountNumber, currency, typeAccount, initialBalance) {
  this.accountNumber = accountNumber;
  this.currency = currency;
  this.typeAccount = typeAccount;  // Caja de Ahorro (CA) | Cuenta Corriente (CC)
  this.balance = initialBalance;
  this.transfers = [];
}

function Transfer(amount, currency, senderAccount, receiverAccount, transferNumber) {
  this.amount = amount;
  this.currency = currency;
  this.senderAccount = senderAccount;
  this.receiverAccount = receiverAccount;
  this.transferNumber = transferNumber;
  this.date = new Date().toLocaleString();  // para uso práctico (local). No es la forma correcta de implementarlo.
}
// methods
User.prototype.addAccount = function (account) { this.accounts.push(account) };

Account.prototype.newTransfer = function (receiverAccount, amount) {
  if (this.currency === receiverAccount.currency && amount <= this.balance) {
    this.balance -= amount;
    receiverAccount.balance += amount;
    // register information for each account
    transactionNumber++;
    const transferNumber = transactionNumber.toString().padStart(7, "0");  // '0000201'
    const transferInformation = new Transfer(amount, this.currency, this.accountNumber, receiverAccount.accountNumber, transferNumber);
    this.transfers.push(transferInformation);
    receiverAccount.transfers.push(transferInformation);
    return true;
  } else {
    return false; // Fondos insuficientes o el tipo de moneda es distinto
  }
}

// funciones
function createUser(name, lastName, email, password = '1234') {
  const newUser = new User(name, lastName, email, password);
  users.push(newUser);
  createAccount(newUser, 'ARS', 'CA', 1000);  // cuando se crea un usuario automaticamente se le genera una CA con 1000 pesos

  return newUser;
}

function createAccount(user, currency, typeAccount, initialBalance) {
  registeredAccounts++;
  const accountNumber = `${typeAccount}` + registeredAccounts.toString();
  const newAccount = new Account(accountNumber, currency, typeAccount, initialBalance);
  user.addAccount(newAccount);

  return user.accounts;
}

// menu
const initialMenu = () => {
  let option = parseInt(prompt(
    'Bienvenido/a! Ingrese la opción deseada:\n' +
    '1. Iniciar sesión\n' +
    '2. Crear cuenta\n' +
    '3. Salir'
  ));

  switch (option) {
    case 1:
      logIn();
      break;
    case 2:
      newUser();
      break;
    case 3:
      alert('Gracias por utilizar el homebanking 👋');
      break;
    default:
      alert('Opción no válida. Por favor, seleccione una opción válida.');
      initialMenu();
      break;
  }
}

const newUser = () => {
  let name = prompt('Ingresar nombre: ');
  let lastName = prompt('Ingresar apellido: ');
  let email = prompt('Ingrese email: ');
  let password = prompt('Ingrese contraseña: ');
  let usuarioCreado = createUser(name, lastName, email, password = '1234');
  alert(`Felicitaciones ${name}! Usuario creado exitosamente.`);
  return usuarioCreado;
}

const logIn = () => {
  const email = prompt('Ingrese su email: ');
  const password = prompt('Ingrese su contraseña: ');

  const userFound = users.find((user) => user.email === email && user.password === password);
  if(userFound) {
    userMenu(userFound);
  } else {
    alert('Datos incorrectos. Intente de nuevo');
    initialMenu();
  }
}

const userMenu = (user) => {
  const account1 = user.accounts[0]; // implementar optional chaining ?. 
  const option = parseInt(prompt(
    `Bienvenido/a ${user.name}!\n\n` +
    `${account1.accountNumber}: ${account1.currency} ${account1.balance}\n\n` +

    'Menú de opciones:\n' +
    '1. Operar cuenta\n' +
    '2. Transferencias\n' +
    '3. Compra y venta de divisas\n' +
    '4. Resumen de cuenta\n' +
    '5. Solicitar nueva cuenta\n' +
    '6. Salir'
  ));

    switch(option) {
      case 1:
        alert('Función en desarrollo');
        break;
      case 2:
        alert('Función en desarrollo');
        break;
      case 3:
        alert('Función en desarrollo');
        break;
      case 4:
        alert('Función en desarrollo');
        break;
      case 5:
        alert('Función en desarrollo');
        break;
    }
}

createUser('John', 'Doe', 'john@example.com');
createUser('Jane', 'Smith', 'jane@example.com');
createUser('Michael', 'Johnson', 'michael@example.com'),
createUser('Emily', 'Brown', 'emily@example.com'),
createUser('William', 'Jones', 'william@example.com'),
createUser('Olivia', 'Garcia', 'olivia@example.com'),
createUser('James', 'Martinez', 'james@example.com'),
createUser('Sophia', 'Lee', 'sophia@example.com'),
createUser('Alexander', 'Rodriguez', 'alexander@example.com'),
createUser('Abigail', 'Lopez', 'abigail@example.com')

// Simulando una transferencia //
/* let user1 = createUser('John', 'Doe', 'john@example.com');
let user2 = createUser('Jane', 'Smith', 'jane@example.com');
// antes
console.log(user1.accounts);
console.log(user2.accounts);
//transferencia
user1.accounts[0].newTransfer(user2.accounts[0], 500);
//despues
console.log(user1.accounts);
console.log(user2.accounts);
console.log(user1.accounts[0].transfers[0]);
console.log(user2.accounts[0].transfers[0]); */

initialMenu();



// function buscarUsuario(callback){
//   const usuario = prompt(`Ingrese el ID o Email del usuario a buscar`);
//   /* busco mi usuario */
//   /* if(!usuario) return "El usuario no existe" */
//   callback(usuario)
// }


// depositar (monto) {
  //   this.saldo += monto;
  //   this.registrarTransaccion('Depósito', monto, );
  // }

  // retirar(monto) {
  //   if (monto <= this.saldo) {
  //     this.saldo -= monto;
  //     this.registrarTransaccion('Retiro', -monto);
  //     return true;
  //   } else {
  //     return false; // Fondos insuficientes
  //   }
  // }