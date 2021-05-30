import Constantes from "../constantes"

const con = new Constantes();
const iva = con.IVA;
const retencion = con.RETENCION;

export default class Calculos {
    ivaDeUnNeto(precio) {
        return (precio * iva);
    }

    retencionNeto(tipoContEmpresa, totalCompra, tipoContProveedor, tipoTransaccion) {
        if (totalCompra > 100.00) {
            if (tipoTransaccion == 'Compra') {
                if (tipoContEmpresa == tipoContProveedor) { //Cuando son gran contribuyentes, medianos o pequeños ambos
                    return {
                        total: 0.00,
                        transaccion: 'Retención',
                    };
                } else if (tipoContEmpresa == 'gran contribuyente' && tipoContProveedor != 'gran contribuyente') { //Retención
                    return {
                        total: totalCompra * retencion,
                        transaccion: 'Retención',
                    };
                }
            } else {
                if (tipoContEmpresa == tipoContProveedor) { //Cuando son gran contribuyentes, medianos o pequeños ambos
                    return {
                        total: 0.00,
                        transaccion: 'Percepción',
                    };
                } else if (tipoContEmpresa == 'gran contribuyente' && tipoContProveedor != 'gran contribuyente') { //Retención
                    return {
                        total: totalCompra * retencion, //Percepción
                        transaccion: 'Percepción',
                    };
                }
            }
        } else {
            return {
                total: 0.00,
                transaccion: 'Retención',
            };
        }
    }

    calcularFecha() {
        const hoy = new Date();
        return hoy.toISOString().split('T')[0];
    }
}
