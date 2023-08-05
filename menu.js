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

function Account(accountNumber, currency, typeAccount, balance) {
  this.accountNumber = accountNumber;
  this.currency = currency;
  this.typeAccount = typeAccount;  // Caja de Ahorro (CA) | Cuenta Corriente (CC)
  this.balance = balance;
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

Account.prototype.newTransfer = function (receiverAccount, amount) {        // modificar utilizando negación, ver lógica error fondos insuficientes
  if (this.currency === receiverAccount.currency && amount <= this.balance) {
    this.balance -= amount;
    receiverAccount.balance += amount;
    // register information for each account (La información es guardad en un objeto, la debería mostrar en texto?)
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
Account.prototype.newDepositWithdraw = function (operationType, amount) {
  operationType === '1' ? 
    this.balance += amount : 
    this.balance -= amount;
    operationType = operationType === '1' ? 'Depósito' : 'Extracción' 
  let operationInfo = {operationType, currency: this.currency , amount, balance: this.balance, fecha: new Date().toLocaleString()}
  this.transfers.push(operationInfo);
}

Account.prototype.showBalance = function () {
  let text = `${this.accountNumber}: ${this.currency} ${this.balance}`;
  return text;
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
      alert('Gracias por utilizar nuestro homebanking 👋');
      break;
    default:
      alert('Opción no válida. Por favor, seleccione una opción válida.');
      initialMenu();
      break;
  }
}
// verificar si el usuario ya existe (a fines practicos usar e-mail, ver de implementar DNI)
const newUser = () => {
  let name = prompt('Ingresar nombre: ');
  let lastName = prompt('Ingresar apellido: ');
  let email = prompt('Ingrese email: ');
  let password = prompt('Ingrese contraseña: ');
  let usuarioCreado = createUser(name, lastName, email, password);
  alert(`Felicitaciones ${name}! Usuario creado exitosamente.`);
  return usuarioCreado;
}

const logIn = () => {
  const email = prompt('Ingrese su email: ');
  const password = prompt('Ingrese su contraseña: ');
  const userFound = users.find((user) => user.email === email && user.password === password);

  userFound ? userMenu(userFound) : alert('Datos incorrectos. Intente de nuevo');
  initialMenu();
}

const userMenu = (user) => {
  const text = user.accounts.map((account) => account.showBalance()).join('\n');
  const option = parseInt(prompt(
    `Bienvenido/a ${user.name}!\n\n` +
    `${text}\n\n` +

    '¿Que desea realizar?\n' +
    '1. Operar cuenta\n' +
    '2. Compra y venta de divisas\n' +
    '3. Resumen de cuenta\n' +
    '4. Solicitar nueva cuenta\n' +
    '5. Salir'
  ));

    switch(option) {
      case 1:
        operateAccount(user);
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
        alert('Gracias por operar con nosotros!');
        initialMenu();
        break;
      default:
        alert('Opción invalida. Por favor seleccione una opción válida.');
        userMenu(user);
        break;
    }
}

const operateAccount = (user) => {
  const text1 = user.accounts.map((account) => account.showBalance()).join('\n');
  const text2 = user.accounts.map((account, index) => `${index + 1}. ${account.accountNumber}`).join('\n');
  const option = parseInt(prompt(
    `${text1}\n\n` +
    'Seleccionar cuenta a operar:\n' +
    `${text2}\n`
  ));
  const selectedAccount = user.accounts[option - 1];
  
  selectedAccount ? operationsMenu(user, selectedAccount) : alert('Opción invalida. Por favor seleccione una opción válida.');
  operateAccount(user);
}

const operationsMenu = (user, selectedAccount) => {
  const text = selectedAccount.showBalance()
  const option = parseInt(prompt(
    `${text}\n\n` +

    '¿Que operación desea realizar?\n' +
    '1. Depositar dinero\n' +
    '2. Extraer dinero\n' +
    '3. Transferencia\n' +
    '4. Volver'
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
      operateAccount(user);
      break;
    default:
      alert('Opción invalida. Por favor seleccione una opción válida.');
      operationsMenu(user, selectedAccount);
      break;
  }

}

let userPrueba = createUser('John', 'Doe', 'john@example.com');
createAccount(userPrueba, 'USD', 'CA', 0); //agrego cuenta para probar si se muestra en el userMenu
createAccount(userPrueba, 'ARS', 'CC', 0);
// console.log(userPrueba);

createUser('Jane', 'Smith', 'jane@example.com');
createUser('Michael', 'Johnson', 'michael@example.com'),
createUser('Emily', 'Brown', 'emily@example.com'),
createUser('William', 'Jones', 'william@example.com'),
createUser('Olivia', 'Garcia', 'olivia@example.com'),
createUser('James', 'Martinez', 'james@example.com'),
createUser('Sophia', 'Lee', 'sophia@example.com'),
createUser('Alexander', 'Rodriguez', 'alexander@example.com'),
createUser('Abigail', 'Lopez', 'abigail@example.com')

/* // Simulando una transferencia //
let user1 = createUser('John', 'Doe', 'john@example.com');
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