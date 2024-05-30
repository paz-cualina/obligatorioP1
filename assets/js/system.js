class System {
    constructor() {
        this.allBuyers = [];
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
            alert(`${aBuyer} was successfully added`);
            console.log(this.allBuyers)
            return true;
        } else {
            alert(`${aBuyer} was already added`);
            return false;
        }
    }
}