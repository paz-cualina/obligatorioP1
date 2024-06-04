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
            return true;
        } else {
            toastMessage(`The user ${aBuyer.userName} already exist`, "error");
            return false;
        }
    }
    addProduct(aProduct) {
        if ( aProduct.validate() ){
            this.allProducts.push(aProduct);
            return true
        } else {
            toastMessage(`The product cant be added`, "error");
            return false;
        }
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
            return true;
        } else {
            toastMessage(`The admin ${anAdmin.userName} already exist`, "error")
            return false;
        }
    }

    /*
    getDataProduct(dataIdProduct) {
        let aDataProduct = null;
        let index = 0;
        while (aDataProduct === null && index < this.allProducts.length) {
            if (this.allProducts[index].productId === dataIdProduct) aDataProduct = this.allProducts[index];
            else index++;
        }
        console.log(aDataProduct);
        return aDataProduct;
    }
    */


    productDetail(dataIdProduct) {

        let contentDetailContainer = document.querySelector(".main-detail");
        let aDataProduct = null;
        let index = 0;
        while (aDataProduct === null && index < this.allProducts.length) {

            if ( this.allProducts[index].productId === dataIdProduct ) {
                aDataProduct = this.allProducts[index];               
            }
            else {index++;}
        }
        let contentDetail = `
                <div class="content">
                <div class="left">
                    <img src="./assets/img/products/${aDataProduct.productImg}.png">
                </div>
                <div class="right">
                    <h1>${aDataProduct.productName}</h1>
                    <p>${aDataProduct.productDescription}</p>
                    <ul>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <span class="stock">${aDataProduct.productStock}</span>
                    <div class="subtotal">
                        <div class="wrapper-counter">
                            <span class="btn-minus">-</span>
                            <input type="text" value="0" id="qty-product">
                            <span class="btn-plus">+</span>
                        </div>
                        <span class="number">$${aDataProduct.productPrice}</span>
                    </div>
                    <button class="btn secondary" data-buy="${aDataProduct.productId}">Buy</button>
                </div>
            </div>`;

        return contentDetailContainer.innerHTML = contentDetail;
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
        this.addProduct(new Product("T-shirt Violet", 500, "Centered violet print with Korn logo", "product-tshirt", 10, true, false));
        this.addProduct(new Product("STATUS FALSE T-shirt Golden Years", 600, "Centered gold print with vintage Adidas logo", "product-tshirt", 5, false, false));
        this.addProduct(new Product("STOCK 0 Hoodie Korn", 800, "Black hoodie with white centered Korn logo", "product-tshirt", 0, true, true));
        this.addProduct(new Product("Cargo Black Pants", 1500, "Black long cargo pants with side pockets", "product-tshirt", 10, true, true));
        this.addProduct(new Product("Scottish Miniskirt", 1200, "Miniskirt with black and white scottish print", "product-tshirt", 5, true, false));
        this.addProduct(new Product("Jean Jacket", 2500, "Classic black jean jacket", "product-tshirt", 5, true, false));
        this.addProduct(new Product("Denim Jeans", 800, "Blue denim jeans with a slim fit", "product-tshirt", 10));
        this.addProduct(new Product("Sneakers Classic", 1200, "White sneakers with a classic design", "product-tshirt", 15, true, false));
        this.addProduct(new Product("Korn Socks", 100, "White socks with Korn print", "product-tshirt", 20, true, false));
        this.addProduct(new Product("Summer Dress", 500, "Light and airy summer dress with Korn print", "product-tshirt", 10, true, false));
    }

    crateProductList() {
        let allLiProductsList = "";
        let productListContainer = document.querySelector(".product-list-ul");
        for (let index = 0; index < this.allProducts.length; index++) {

            if (this.allProducts[index].productStatus) {
                let divSale = "";
                if (this.allProducts[index].productSale === true) {
                    divSale = `<div class="on-sale-state"><span>SALE</span></div>`;
                }
                allLiProductsList += `
                <li data-productId="${this.allProducts[index].productId}">
                    <figure>
                        ${divSale}
                        <img src="./assets/img/products/${this.allProducts[index].productImg}.png">
                    </figure>
                    <p>${this.allProducts[index].productName}</p>
                    <span>${this.allProducts[index].productDescription}</span>
                    <span class="number">$${this.allProducts[index].productPrice}</span>
                </li>`;
            }

        }
        return productListContainer.innerHTML = allLiProductsList;
    }

}