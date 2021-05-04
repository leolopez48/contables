import Constantes from "../constantes"

const con = new Constantes();
const iva = con.IVA;

export default class Calculos {
    ivaDeUnNeto(precio) {
        return precio * iva;
    }


}
