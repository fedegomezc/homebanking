let transactionNumber = 1;

function User(name, lastname, email, password = '1234') {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
  this.accounts = [];
}

User.prototype.addAccount = function (account) {this.accounts.push(account)};


function Account(accountNumber, currency, initialBalance){
  this.accountNumber = accountNumber;
  this.currency = currency;
  this.balance = initialBalance;
  this.transfers = [];
}

Account.prototype.transfer = function (receiverAccount, amount) {
  if (this.currency === receiverAccount.currency && amount <= this.balance) {
        this.balance -= amount;
        receiverAccount.balance += amount;
        transactionNumber++;
        const transferNumber = transactionNumber.toString().padStart(5, "0");
        this.transfers.push(new Transfer(amount, this.currency, this.accountNumber, receiverAccount.accountNumber, transferNumber));
        return true;
      } else {
        return false; // Fondos insuficientes
      }
}

function Transfer(amount, currency, senderAccount, receiverAccount, transferNumber) {
  this.amount = amount;
  this.currency = currency;
  this.senderAccount = senderAccount;
  this.receiverAccount = receiverAccount;
  this.transferNumber = transferNumber;
  this.date = new Date().toLocaleString();  // para uso práctico (local). No es la forma correcta de implementarlo.
}

const users = [];

function createUser(name, lastname, email, password = '1234') {
  const newUser = new User(name, lastname, email, password);
  users.push(newUser);
  createAccount(newUser);
  
  return newUser;
}

function createAccount(user, currency = 'ARS', initialBalance) {
  const accountNumber = `${Math.floor(Math.random() * 100_000_000)}`;
  const arsAccount = new Account(accountNumber, currency, initialBalance);
  user.addAccount(arsAccount);

  return user.accounts;
}

/* createUser('John', 'Doe', 'john@example.com'),
createUser('Jane', 'Smith', 'jane@example.com'),
createUser('Michael', 'Johnson', 'michael@example.com'),
createUser('Emily', 'Brown', 'emily@example.com'),
createUser('William', 'Jones', 'william@example.com'),
createUser('Olivia', 'Garcia', 'olivia@example.com'),
createUser('James', 'Martinez', 'james@example.com'),
createUser('Sophia', 'Lee', 'sophia@example.com'),
createUser('Alexander', 'Rodriguez', 'alexander@example.com'),
createUser('Abigail', 'Lopez', 'abigail@example.com') */


// chequear que las cuentas emisor y receptor sean de la misma moneda
// usar prototype para asignar funciones a los usuarios -> user.prototype.transfer = function..

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