let counterPurchase = 0;
class Purchase
{
    constructor(productName, productPrice, productDescription, productImg, productStock)
    {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImg = productImg;
        this.productStock = productStock;
        this.productStatus = true;
        this.productSale = false;
        this.productId = counterPurchase;
    }
    validate() {
        if ( notEmpty(this.productName) && notEmpty(this.productPrice) && notEmpty(this.productDescription) && notEmpty(this.productStock) && isNumber(this.productPrice) && isNumber(this.productStock) && greaterZero(this.productPrice) && greaterZero(this.productStock)) {
            toastMessage("Product has been loaded successfully", "success")
            counterPurchase++;
            return true;
        } else {
            return false;
        }
    }
    
}