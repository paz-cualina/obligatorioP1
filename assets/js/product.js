let counterProduct = 0;
class Product
{
    constructor(productName, productPrice, productDescription, productImg, productStock, productStatus, productSale)
    {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productDescription = productDescription;
        this.productImg = productImg;
        this.productStock = productStock;
        this.productStatus = productStatus;
        this.productSale = productSale;
        this.productId = "PROD_ID_" + counterProduct;
    }
    
    validate() {
        if ( notEmpty(this.productName) && notEmpty(this.productPrice) && notEmpty(this.productDescription) && notEmpty(this.productStock) && notEmpty(this.productImg) && isNumber(this.productPrice) && isNumber(this.productStock) && greaterZero(this.productPrice) && greaterZero(this.productStock)) {
            toastMessage("Product has been loaded successfully", "success")
            counterProduct++;
            return true;
        } else {
            return false;
        }
    }
    
}