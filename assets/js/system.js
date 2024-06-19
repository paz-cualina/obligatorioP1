class System {
    constructor() {
        this.allBuyers = [];
        this.allAdmins = [];
        this.allProducts = [];
        this.allPurchases = [];
        this.preload();
    }

    existBuyer(aBuyer) {
        return findObjectByValue(this.allBuyers, "userName", aBuyer.userName) !== null;
    }
    addBuyer(aBuyer) {
        if (aBuyer.validate() && !this.existBuyer(aBuyer)) {
            this.allBuyers.push(aBuyer);
            toastMessage(`${aBuyer.userName} was successfully added`, "success");
            if(loggedIn){
                currentUser = aBuyer;
                showNextView("list-of-products");
                showUserLayout();
            }
            console.log(this.allBuyers)
            return true;
        } else if ( this.existBuyer(aBuyer) ) {
            toastMessage(`The user ${aBuyer.userName} already exist`, "error");
            return false;
        } else {
            return false;
        }
    }
    addProduct(aProduct) {
        if (aProduct.validate()){
            this.allProducts.push(aProduct);
            this.stockStatusList();
            return true
        } else {
            toastMessage(`The product cant be added`, "error");
            return false;
        }
    }
    existAdmin(anAdmin) {
        return findObjectByValue(this.allAdmins, "userName", anAdmin.userName) !== null;
    }
    addAdmin(anAdmin) {
        if (anAdmin.validate() && !this.existAdmin(anAdmin)) {
            this.allAdmins.push(anAdmin);
            toastMessage(`${anAdmin.userName} was successfully added`, "success");
            return true;
        } else {
            toastMessage(`The admin ${anAdmin.userName} already exist`, "error")
            return false;
        }
    }

    loginUser(dataUserName, password, checkbox) {

        if (checkbox) {
            const userType = checkbox.value;
            if(!notEmpty(dataUserName)){
                toastMessage(`Empty username`, "error");
            }
            else if (!notEmpty(password)){
                toastMessage(`Empty password`, "error");
            }
            else{
                if (userType === "buyer") {
                    const foundBuyer = findObjectByValue(this.allBuyers, "userName", dataUserName);

                    if(!foundBuyer){
                        toastMessage(`Invalid user`, "error");
                    }else if (foundBuyer.password === password) {
                        toastMessage(`${foundBuyer.userName} welcome! `, "success");
                        currentUser = foundBuyer;
                        showNextView("list-of-products");
                        showUserLayout();
                        loggedIn = true;
                        this.createProductList();
                    }else{
                        toastMessage(`Invalid password`, "error");
                    }


                } else if (userType === "admin") {
                    const foundAdmin = findObjectByValue(this.allAdmins, "userName", dataUserName);
                    
                    if(!foundAdmin){
                        toastMessage(`Invalid user`, "error");
                    }
                    else if (foundAdmin.password === password) {
                            toastMessage(`${foundAdmin.userName} welcome! `, "success");
                            currentUser = foundAdmin;
                            showNextView("product-upload-section");
                            showUserLayout();
                            dataAdminUser();
                            loggedIn = true;
                            this.stockStatusList();
                    }else{
                        toastMessage(`Invalid password`, "error");
                    }
                }  
            }

        }
    }
    productDetail(dataIdProduct) {
        let contentDetailContainer = document.querySelector(".main-detail");
        aDataProduct = null;
        let index = 0;

        while (aDataProduct === null && index < this.allProducts.length) {

            if (this.allProducts[index].productId === dataIdProduct) {
                aDataProduct = this.allProducts[index];         
            }
            else { index++; }
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
                    <span class="stock">Stock: ${aDataProduct.productStock}</span>
                    <div class="subtotal">
                        <div class="wrapper-counter">
                            <span class="btn-minus">-</span>
                            <input type="text" value="0" id="qty-product" readonly>
                            <span class="btn-plus">+</span>
                        </div>
                        <span class="number">$${aDataProduct.productPrice}</span>
                    </div>
                </div>
            </div>`;

        return contentDetailContainer.innerHTML = contentDetail;
    }
    addPurchase(aPurchase) {
        if (aPurchase.validate()) {
            this.allPurchases.push(aPurchase);
            toastMessage(`The purchase order was successfully created`, "success");
            return true;
        } else {
            toastMessage(`The purchase order couldn't be created`, "error");
            return false;
        }
    }

    createProductList() {
        let allLiProductsList = "";
        let productListContainer = document.querySelector(".product-list-ul");

        for (let index = 0; index < this.allProducts.length; index++) {

            if (this.allProducts[index].productStatus && this.allProducts[index].productStock > 0) {
                let divSale = "";
                if (filterSale) {
                    if (this.allProducts[index].productSale === true) {
                        divSale = `<div class="on-sale-state"><span>SALE</span></div>`;
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
                } else {
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
        }

        return productListContainer.innerHTML = allLiProductsList;
    }

    findPurchaseToChangeStatus(purchaseID, dataStatusAction) {
        let aDataOrder = null;
        let index = 0;

        while (aDataOrder === null && index < this.allPurchases.length) {

            if (parseInt(this.allPurchases[index].purchaseID) === parseInt(purchaseID)) {
                aDataOrder = this.allPurchases[index];         
            }
            else { index++; }
        }
        
        if ( dataStatusAction === "cancelled" ) {
            aDataOrder.purchaseStatus = dataStatusAction;
            toastMessage(`The purchase order is cancelled`, "error");
        } else {
            let dataBuyer = null;
            let i = 0;

            while (dataBuyer === null && i < this.allBuyers.length) {

                if (parseInt(this.allBuyers[i].id) === parseInt(aDataOrder.buyerID)) {
                    dataBuyer = this.allBuyers[i];         
                }
                else { i++; }
            }

            let dataProduct = null;
            let pIndex = 0;

            while (dataProduct === null && pIndex < this.allProducts.length) {
                if (this.allProducts[pIndex].productId === aDataOrder.product.productId) {
                    dataProduct = this.allProducts[pIndex];         
                }
                else { pIndex++; }
            }
            if ( dataBuyer.balance >= aDataOrder.totalOrder && dataProduct.productStatus && dataProduct.productStock >= aDataOrder.quantity ) {
                aDataOrder.purchaseStatus = dataStatusAction;
                this.updateBalanceAndStock(dataStatusAction, aDataOrder);
                toastMessage(`The purchase order was approved.`, "success");
            } else {
                this.findPurchaseToChangeStatus(purchaseID, "cancelled");
                toastMessage(`The purchase order couldn't be approved. We have to cancel it.`, "error");
            }
        }
        
        this.createProfilesList();
    }

    updateBalanceAndStock(actionApprove, aDataOrder) {
    
        if (currentUser.admin && actionApprove === "approved") {
            let orderSpent = aDataOrder.totalOrder;
            let aDataBuyer = null;
            let index = 0;
            
            while (aDataBuyer === null && index < this.allBuyers.length) {

                if (this.allBuyers[index].id === aDataOrder.buyerID) {
                    aDataBuyer = this.allBuyers[index];
                }
                else { index++; }
            }

            aDataBuyer.balance -= orderSpent;

            let productData = null;
            let i = 0;

            while (productData  === null && i < this.allProducts.length) {

                if (this.allProducts[i].productId === aDataOrder.product.productId) {
                    productData = this.allProducts[i];
                }
                else { i++; }
            }

            productData.productStock -= aDataOrder.quantity;

            if ( productData.productStock <= 0 ) {
                productData.productStatus = false;
            }
        }

        this.stockStatusList();
    }

    showPurchaseOrders(status) {
        let allStatesList = "";
        let orderBuyContainer;

        for (let index = 0; index < this.allPurchases.length; index++) {
            if(currentUser.admin){
                orderBuyContainer = document.getElementById("list-of-orders-admin");
                if (this.allPurchases[index].purchaseStatus === status) {
                    allStatesList += `
                        <li class="${this.allPurchases[index].purchaseStatus}" data-purchaseId="${this.allPurchases[index].purchaseID}">
                            <figure class="left">
                                <img src="./assets/img/products/${this.allPurchases[index].product.productImg}.png">
                            </figure>
                            <div class="right">
                                <div class="top-wrapper">
                                    <p>${this.allPurchases[index].purchaseStatus} order</p>
                                    <i></i>
                                </div>
                                <p class="title-product">
                                    ${this.allPurchases[index].product.productName}
                                </p>
                                <div class="middle-wrapper">
                                    <span class="description">${this.allPurchases[index].product.productDescription}</span>
                                    <div class="middle-right">
                                        <p><span>$${this.allPurchases[index].product.productPrice}</span> x${this.allPurchases[index].quantity}</p>
                                    </div>
                                </div>
                                <div class="bottom-wrapper">
                                    <div class="${this.allPurchases[index].purchaseStatus}">
                                        <span class="btn-purchase approved" data-purchaseId="${this.allPurchases[index].purchaseID}" data-status-action="approved">Approve</span>
                                        <span class="btn-purchase cancel" data-purchaseId="${this.allPurchases[index].purchaseID}" data-status-action="cancelled">Cancel</span>
                                    </div>
                                    <p>Total: $${this.allPurchases[index].totalOrder}</p>
                                </div>
                            </div>
                        </li>`;
                }
            } else {
                orderBuyContainer = document.getElementById("list-of-orders-buyer");
                if (this.allPurchases[index].purchaseStatus === status && this.allPurchases[index].buyerID === currentUser.id) {
                    allStatesList += `
                        <li class="${this.allPurchases[index].purchaseStatus}" data-purchaseId="${this.allPurchases[index].purchaseID}">
                            <figure class="left">
                                <img src="./assets/img/products/${this.allPurchases[index].product.productImg}.png">
                            </figure>
                            <div class="right">
                                <div class="top-wrapper">
                                    <p>${this.allPurchases[index].purchaseStatus} order</p>
                                    <i></i>
                                </div>
                                <p class="title-product">
                                    ${this.allPurchases[index].product.productName}
                                </p>
                                <div class="middle-wrapper">
                                    <span class="description">${this.allPurchases[index].product.productDescription}</span>
                                    <div class="middle-right">
                                        <p><span>$${this.allPurchases[index].product.productPrice}</span> x${this.allPurchases[index].quantity}</p>
                                    </div>
                                </div>
                                <div class="bottom-wrapper">
                                    <span class="${this.allPurchases[index].purchaseStatus} btn-purchase cancel" data-purchaseId="${this.allPurchases[index].purchaseID}" data-status-action="cancelled">Cancel Purchase</span>
                                    <p>Total: $${this.allPurchases[index].totalOrder}</p>
                                </div>
                            </div>
                        </li>`;
                }
            }
        }
        
        orderBuyContainer.innerHTML = allStatesList;

        this.showCurrentBalanceAndTotal(status);
    }

    showCurrentBalanceAndTotal(status) {
        const showTotalApproved = document.getElementById("buyer-approved-orders");
        if (currentUser.admin || status !== "approved") {
            showTotalApproved.innerHTML = "";
        } else {
            let totalApproved = 0;
        
            for (let index = 0; index < this.allPurchases.length; index++) {
                if (this.allPurchases[index].purchaseStatus === "approved" && this.allPurchases[index].buyerID === currentUser.id) {
                    totalApproved += this.allPurchases[index].quantity * this.allPurchases[index].product.productPrice;
                }
            }
            
            showTotalApproved.innerHTML = `<p>Total approved orders: $ ${totalApproved}</p> 
                                        <p>Total balance: $ ${currentUser.balance}</p>`;
        }
    }
   
    stockStatusList() {
        let allStockStatusList = "";
        let stockStatusList = document.getElementById("stock-status-list");

        for (let index = 0; index < this.allProducts.length; index++) {
            let checkedStatus = "";
            let checkedOnSale = "";
            if(this.allProducts[index].productStatus){
                checkedStatus = "checked";
            }
            if(this.allProducts[index].productSale){
                checkedOnSale = "checked";
            }
            allStockStatusList += `
                <div class="row">
                    <div class="column">${this.allProducts[index].productName}</div>
                    <div class="column">
                        <img src="./assets/img/products/${this.allProducts[index].productImg}.png">
                    </div>
                    <div class="column">${this.allProducts[index].productStock}</div>
                    <div class="column">
                        <div class="switch">
                            <input type="checkbox" ${checkedStatus} data-product-id=${this.allProducts[index].productId} data-swich-action="productStatus"/>
                            <div class="switch-options">
                                <span class="left-option">Active</span>
                                <span class="right-option">Paused</span>
                                <span class="circle">
                                    <i class="fa-solid fa-play"></i>
                                    <i class="fa-solid fa-pause"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="switch">
                            <input type="checkbox" ${checkedOnSale} data-product-id=${this.allProducts[index].productId} data-swich-action="productSale"/>
                            <div class="switch-options">
                                <span class="left-option">Active</span>
                                <span class="right-option">Paused</span>
                                <span class="circle">
                                    <i class="fa-solid fa-play"></i>
                                    <i class="fa-solid fa-pause"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>`;
        }
        stockStatusList.innerHTML = allStockStatusList;

    }

    findProductToChangeStatus(dataProductId, dataSwichAction, booleanSwichAction) {
        let aDataProductList = null;
        let index = 0;

        while (aDataProductList === null && index < this.allProducts.length) {

            if (this.allProducts[index].productId === dataProductId) {
                aDataProductList = this.allProducts[index];         
            }
            else { index++; }
        }
        aDataProductList[dataSwichAction] = booleanSwichAction;
        this.stockStatusList()
    }

    createProfilesList() {
        let allProfilesAdmin = "";
        let profileAdminContainer = document.getElementById("list-of-admins");

        
        for (let index = 0; index < this.allAdmins.length; index++) {
            
            allProfilesAdmin += `
            <li>
                <p>Username: ${this.allAdmins[index].userName}</p>
                <p>Id: ${this.allAdmins[index].id}</p>
            </li>`;   

        }

        profileAdminContainer.innerHTML = allProfilesAdmin;

        let allProfilesBuyers = "";
        let profileBuyerContainer = document.getElementById("list-of-buyers");
        for (let i = 0; i < this.allBuyers.length; i++) {

            allProfilesBuyers += `
            <li>
                <p>Username: ${this.allBuyers[i].userName}</p>
                <p>Balance: $ ${this.allBuyers[i].balance}</p>
                <p>Id: ${this.allBuyers[i].id}</p>
            </li>`;   

        }
        profileBuyerContainer.innerHTML = allProfilesBuyers;
    }
    createEarningsList() {
        totalEarnings = 0;
        let allEarnings = "";
        let earningsReportTable = document.getElementById("earnings-report-table");

        for (let indexP = 0; indexP < this.allProducts.length; indexP++) {
            const currentProduct = this.allProducts[indexP];
            let quantityProduct = 0;
            let totalPurshaseProduct = 0;

            for (let index = 0; index < this.allPurchases.length; index++) {
                let productIdPurchase = this.allProducts[indexP].productId;
                if(this.allPurchases[index].purchaseStatus === "approved" && this.allPurchases[index].product.productId === productIdPurchase) {

                    quantityProduct += this.allPurchases[index].quantity;
                    totalPurshaseProduct += this.allPurchases[index].totalOrder;
                }
            }
            if(quantityProduct > 0){
                totalEarnings += totalPurshaseProduct;
                allEarnings += `
                <div class="row">
                    <div class="column">${currentProduct.productName}</div>
                    <div class="column">${quantityProduct}</div>
                    <div class="column">$${currentProduct.productPrice}</div>
                    <div class="column">$${totalPurshaseProduct}</div>
                </div>`;  
            }


        }
        earningsReportTable.innerHTML = allEarnings;
        document.getElementById("totalEarnings").innerHTML = `$ ${totalEarnings}`;
    }

    preload() {
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
        this.addProduct(new Product("T-shirt Violet", 500, "Centered violet print with Korn logo", "product-tshirt", 4, true, false));
        this.addProduct(new Product("T-shirt Golden Years", 600, "Centered gold print with vintage Adidas logo", "product-golden-tshirt", 5, false, false));
        this.addProduct(new Product("Hoodie Korn", 1100, "Black hoodie with white centered Korn logo", "product-hoodie", 1, true, true));
        this.addProduct(new Product("Black Sport Pants", 1500, "Black sport pants with side pockets", "product-black-pants", 10, true, true));
        this.addProduct(new Product("Scottish Miniskirt", 600, "Miniskirt with black and white scottish print", "product-skirt", 5, true, false));
        this.addProduct(new Product("Long Sleeve", 800, "Long sleeve with front print", "product-long-sleeve", 5, true, true));
        this.addProduct(new Product("Sport Jacket", 1200, "Black sport jacket with a slim fit", "product-sport-jacket", 10, true, false));
        this.addProduct(new Product("Sneakers Classic White", 1200, "White sneakers with a classic design", "product-white-sneakers", 15, true, false));
        this.addProduct(new Product("Green Korn Socks", 100, "Green socks with Korn print", "product-green-socks", 20, true, false));
        this.addProduct(new Product("Violet Jacket", 1300, "Black sport jacket with a regular fit", "product-violet-jacket", 10, true, false));
        this.addProduct(new Product("Black Sunglasses", 200, "Regular black sunglasses", "product-sunglasses", 10, true, false));
        
        // Purchases
        currentUser = this.allAdmins[0];
        this.addPurchase(new Purchase(0, { "productName": "Scottish Miniskirt", "productPrice": 600, "productDescription": "Miniskirt with black and white scottish print", "productImg": "product-skirt", "productStock": 5, "productStatus": true, "productSale": false, "productId": "PROD_ID_4" }, 2,"pending", 1200 ));
        this.findPurchaseToChangeStatus(0, "approved");

        this.addPurchase(new Purchase(0, { "productName": "Black Sunglasses", "productPrice": 200, "productDescription": "Regular black sunglasses", "productImg": "product-sunglasses", "productStock": 10, "productStatus": true, "productSale": false, "productId": "PROD_ID_10" }, 3,"pending", 600 ));
        this.findPurchaseToChangeStatus(1, "cancelled");

        // This will remain pending
        this.addPurchase(new Purchase(0, { "productName": "Scottish Miniskirt", "productPrice": 600, "productDescription": "Miniskirt with black and white scottish print", "productImg": "product-skirt", "productStock": 5, "productStatus": true, "productSale": false, "productId": "PROD_ID_4" }, 1,"pending", 600 ));

        this.addPurchase(new Purchase(1, { "productName": "Hoodie Korn", "productPrice": 1100, "productDescription": "Black hoodie with white centered Korn logo", "productImg": "product-hoodie", "productStock": 1, "productStatus": true, "productSale": false, "productId": "PROD_ID_2" }, 2,"pending", 2200 ));
        this.findPurchaseToChangeStatus(3, "approved");

        this.addPurchase(new Purchase(0, { "productName": "Hoodie Korn", "productPrice": 1100, "productDescription": "Black hoodie with white centered Korn logo", "productImg": "product-hoodie", "productStock": 1, "productStatus": true, "productSale": false, "productId": "PROD_ID_2" }, 1,"pending", 1100 ));
        this.findPurchaseToChangeStatus(4, "approved");

        this.addPurchase(new Purchase(2, { "productName": "Black Sport Pants", "productPrice": 1500, "productDescription": "Black sport pants with side pockets", "productImg": "product-black-pants", "productStock": 10, "productStatus": true, "productSale": true, "productId": "PROD_ID_3" }, 1,"pending", 1500 ));
        this.findPurchaseToChangeStatus(5, "approved");

        this.addPurchase(new Purchase(0, { "productName": "Black Sunglasses", "productPrice": 200, "productDescription": "Regular black sunglasses", "productImg": "product-sunglasses", "productStock": 10, "productStatus": true, "productSale": false, "productId": "PROD_ID_10" }, 3,"pending", 600 ));
        this.findPurchaseToChangeStatus(6, "approved");

    }

}

