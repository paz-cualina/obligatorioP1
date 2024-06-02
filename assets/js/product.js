let counterProduct = 0;
class Product
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
        this.productId = counterProduct;
    }
    validate() {
        if ( notEmpty(this.productName) && notEmpty(this.productPrice) && notEmpty(this.productDescription) && notEmpty(this.productStock) && isNumber(this.productPrice) && isNumber(this.productStock) && greaterZero(this.productPrice) && greaterZero(this.productStock)) {
            toastMessage("Product has been loaded successfully", "success")
            counterProduct++;
            return true;
        } else {
            console.log("Product has not been loaded")
            return false;
        }
    }
    
}