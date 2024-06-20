let counterPurchase = 0;
class Purchase
{
    constructor(buyerID, product, quantity, purchaseStatus, totalOrder)
    {
        this.buyerID = buyerID;
        this.product = product;
        this.quantity = quantity;
        this.purchaseStatus = purchaseStatus;
        this.purchaseID = counterPurchase;
        this.totalOrder = totalOrder;
    }

    validate() {
        if ( greaterZero(this.quantity) ) {
            toastMessage("Purchase has been loaded successfully", "success")
            counterPurchase++;
            return true;
        } else {
            return false;
        }
     }
   
}