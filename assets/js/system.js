class System {
    constructor() {
        this.allBuyers = [];
        this.allAdmins = [];
        this.allProducts = [];
        this.Preload();
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
        if ( aBuyer.validate() && !this.existBuyer(aBuyer) ) {
            this.allBuyers.push(aBuyer);
            toastMessage(`${aBuyer.userName} was successfully added`, "success");
            console.log(this.allBuyers)
            return true;
        } else {
            toastMessage(`The user ${aBuyer.userName} already exist`, "error");
            return false;
        }
    }
    addProduct(aProduct) {
        this.allProducts.push(aProduct);
        console.log(this.allProducts)
    }
    existAdmin(anAdmin) {
        let success = false;
        let i = 0;
        while (!success && i < this.allAdmins.length) {
            if (this.allAdmins[i].userName === anAdmin.userName) {
                success = true;
            }
            else {
                i++;
            }
        }
        return success;
    }
    addAdmin(anAdmin) {
        if ( anAdmin.validate() && !this.existAdmin(anAdmin) ) {
            this.allAdmins.push(anAdmin);
            toastMessage(`${anAdmin.userName} was successfully added`, "success");
            console.log(this.allAdmins)
            return true;
        } else {
            toastMessage(`The admin ${anAdmin.userName} already exist`, "error")
            return false;
        }
    }

    Preload() {
        // Buyers
        this.addBuyer(new Buyer("Tamara", "Sancristobal", "tam_sancri", "Tamara2024", "4916103567334187","123"));
        this.addBuyer(new Buyer("John", "Doe", "john_doe", "John2024", "4916112345678901", "456"));
        this.addBuyer(new Buyer("Jane", "Smith", "jane_smith", "Jane2024", "4916123456789012", "789"));
        this.addBuyer(new Buyer("Alice", "Johnson", "alice_johnson", "Alice2024", "4916134567890123", "012"));
        this.addBuyer(new Buyer("Bob", "Brown", "bob_brown", "Bob2024", "4916145678901234", "345"));
        // Admins
        this.addAdmin(new Admin("mel_roger", "Melanie2024"));
        this.addAdmin(new Admin("john_admin", "JohnAdmin123"));
        this.addAdmin(new Admin("jane_admin", "JaneAdmin08"));
        this.addAdmin(new Admin("alice_admin", "AliceAdmin1990"));
        this.addAdmin(new Admin("bob_admin", "BobAdmin123"));
        // Products
        this.addProduct(new Product("T-shirt Violet", 500, "Centered violet print with Korn logo", "../img/products/product-tshirt.png", 10));
        this.addProduct(new Product("T-shirt Golden Years", 600, "Centered gold print with vintage Adidas logo", "../img/products/product-tshirt.png", 5));
        this.addProduct(new Product("Hoodie Korn", 800, "Black hoodie with white centered Korn logo", "../img/products/product-tshirt.png", 5));
        this.addProduct(new Product("Cargo Black Pants", 1500, "Black long cargo pants with side pockets", "../img/products/product-tshirt.png", 10));
        this.addProduct(new Product("Scottish Miniskirt", 1200, "Miniskirt with black and white scottish print", "../img/products/product-tshirt.png", 5));
        this.addProduct(new Product("Jean Jacket", 2500, "Classic black jean jacket", "../img/products/product-leather-jacket.png", 5));
        this.addProduct(new Product("Denim Jeans", 800, "Blue denim jeans with a slim fit", "../img/products/product-denim-jeans.png", 10));
        this.addProduct(new Product("Sneakers Classic", 1200, "White sneakers with a classic design", "../img/products/product-sneakers.png", 15));
        this.addProduct(new Product("Korn Socks", 100, "White socks with Korn print", "../img/products/product-baseball-cap.png", 20));
        this.addProduct(new Product("Summer Dress", 500, "Light and airy summer dress with Korn print", "../img/products/product-summer-dress.png", 10));
    }

}