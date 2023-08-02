function User(name, lastname, email, password = '1234') {
  this.name = name;
  this.lastname = lastname;
  this.email = email;
  this.password = password;
  this.accounts = [];
}

User.prototype.agregarCuenta = (account) => this.accounts.push(account);
const user1 = new User('Fede', 'Gomez', 'fedegomez@gmail.com');

function Account(accountNumber, currency, initialBalance){
  this.accountNumber = accountNumber;
  this.currency = currency;
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

  // transferir(cantidad, cuentaDestino) {
  //   if (cantidad <= this.saldo) {
  //     this.saldo -= cantidad;
  //     cuentaDestino.depositar(cantidad);
  //     this.registrarTransaccion(`Transferencia a ${cuentaDestino.numeroCuenta}`, -cantidad, this.numeroCuenta, cuentaDestino.numeroCuenta);
  //     return true;
  //   } else {
  //     return false; // Fondos insuficientes
  //   }
  // }

  // registrarTransaccion(descripcion, cantidad, emisor, receptor) {
  //   this.transacciones.push({ descripcion, cantidad, emisor, receptor, fecha: new Date() });
  // }


const usuarios = [];

function crearUsuario(nombre, apellido, email) {
  const nuevoUsuario = new Usuario(nombre, apellido, email);
  usuarios.push(nuevoUsuario);
  crearCuenta(nuevoUsuario);
  
  return nuevoUsuario;
}

function crearCuenta(usuario) {
  const numeroCuenta = `${Math.floor(Math.random() * 100_000_000)}`;
  const cuentaPesos = new Cuenta(numeroCuenta, 1000);
  const cuentaDolar = new Cuenta(`d${numeroCuenta}`, 0);
  usuario.agregarCuenta(cuentaPesos);
  usuario.agregarCuenta(cuentaDolar);

  return usuario.cuentas;
}


// generar usuarios fake con chatGPT
// chequear que las cuentas emisor y receptor sean de la misma moneda
// usar prototype para asignar funciones a los usuarios -> user.prototype.transfer = function..