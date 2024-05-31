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
        if ( notEmpty(productName) && notEmpty(productPrice) && notEmpty(productDescription) && notEmpty(productStock) && isNumber(productPrice) && isNumber(productStock) && graterZero(productPrice) &&graterZero(productStock)) {
            error("Product has been loaded successfully", "success")
            counterProduct++;
            return true;
        } else {
            return false;
        }
    }
    
}