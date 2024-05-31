class System {
    constructor() {
        this.allBuyers = [];
        //this.Precarga();
    }
    existBuyer(aBuyer) {
        let success = false;
        let i = 0;
        while (!success && i < this.allBuyers.length) {
            if (this.allBuyers[i].userName === aBuyer.userName) {
                success = true;
            }
            else {
                i++;
            }
        }
        return success;
    }
    addBuyer(aBuyer) {
        if (!this.existBuyer(aBuyer)) {
            this.allBuyers.push(aBuyer);
            error(`${aBuyer.userName} was successfully added`, "success")
            return true;
        } else {
            error(`the user ${aBuyer.userName} already exist`, "error")
            return false;
        }
    }
    addProduct(aProduct) {
        this.allProducts.push(aProduct);
    }
/*
    Precarga() {
        this.addBuyer(new Persona("Alejandro", "al_usr", "al_pwd", 7583));
    }
*/
}