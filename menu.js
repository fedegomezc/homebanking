let transactionNumber = 200;
let registeredAccounts = 100;
const users = [];

function User(name, lastname, email, password = '1234') {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
  this.accounts = [];
}

function Account(accountNumber, currency, typeAccount, initialBalance){
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

User.prototype.addAccount = function (account) {this.accounts.push(account)};

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


function createUser(name, lastname, email, password = '1234') {
  const newUser = new User(name, lastname, email, password);
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

let user1 = createUser('John', 'Doe', 'john@example.com');
let user2 = createUser('Jane', 'Smith', 'jane@example.com');
createUser('Michael', 'Johnson', 'michael@example.com'),
createUser('Emily', 'Brown', 'emily@example.com'),
createUser('William', 'Jones', 'william@example.com'),
createUser('Olivia', 'Garcia', 'olivia@example.com'),
createUser('James', 'Martinez', 'james@example.com'),
createUser('Sophia', 'Lee', 'sophia@example.com'),
createUser('Alexander', 'Rodriguez', 'alexander@example.com'),
createUser('Abigail', 'Lopez', 'abigail@example.com')

// Simulando una transferencia //
// antes
console.log(user1.accounts);
console.log(user2.accounts);
//transferencia
user1.accounts[0].newTransfer(user2.accounts[0], 500);
//despues
console.log(user1.accounts);
console.log(user2.accounts);
console.log(user1.accounts[0].transfers[0]);
console.log(user2.accounts[0].transfers[0]);




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