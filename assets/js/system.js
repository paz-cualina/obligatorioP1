class System {
    constructor() {
        this.allBuyers = [];
    }

    existBuyer(aBuyer) {
        let exito = false;
        let indice = 0;
        while (!exito && indice < this.allBuyers.length) {
            if (this.allBuyers[indice].nombre === aBuyer.nombre) {
                exito = true;
            }
            else {
                indice++;
            }
        }
        return exito;
    }
    addBuyer(aBuyer) {
        if (aBuyer.validate() && !this.existBuyer(aBuyer)) {
            this.allBuyers.push(aBuyer);
            console.log(allBuyers);
        }
    }
}