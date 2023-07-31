class Usuario {
  constructor(nombre, apellido, email) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.cuentas = [];
  }

  agregarCuenta(cuenta) {
    this.cuentas.push(cuenta);
  }
}

class Cuenta {
    constructor(numeroCuenta, saldoInicial = 1000) {
    this.numeroCuenta = numeroCuenta;
    this.saldo = saldoInicial;
    this.transacciones = [];
  }
  // El tipo de moneda de la cuenta se identifica con un prefijo 'd' (dólares) sino es pesos
  obtenerTipoMoneda() {
    return this.numeroCuenta.charAt(0) === 'd' ? 'USD' : 'ARS';
  } 

  depositar (monto) {
    this.saldo += monto;
    this.registrarTransaccion('Depósito', monto, );
  }

  retirar(cantidad) {
    if (cantidad <= this.saldo) {
      this.saldo -= cantidad;
      this.registrarTransaccion('Retiro', -cantidad);
      return true;
    } else {
      return false; // Fondos insuficientes
    }
  }

  transferir(cantidad, cuentaDestino) {
    if (cantidad <= this.saldo) {
      this.saldo -= cantidad;
      cuentaDestino.depositar(cantidad);
      this.registrarTransaccion(`Transferencia a ${cuentaDestino.numeroCuenta}`, -cantidad, this.numeroCuenta, cuentaDestino.numeroCuenta);
      return true;
    } else {
      return false; // Fondos insuficientes
    }
  }

  registrarTransaccion(descripcion, cantidad, emisor, receptor) {
    this.transacciones.push({ descripcion, cantidad, emisor, receptor, fecha: new Date() });
  }
}

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

// crear usuarios y cuentas
const usuario1 = crearUsuario('Federico', 'Gomez', 'fedegomez@gmail.com'); 
console.log(usuario1);

const usuario2 = crearUsuario('Pablo', 'Gomez', 'pablogomez@gmail.com'); 
console.log(usuario2);