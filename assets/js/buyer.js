let counterBuyer = 0;
class Buyer
{
    constructor(firstName, lastName, userName, password, card, cvc)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.password = password;
        this.card = card;
        this.cvc = cvc;
        this.balance = 3000;
        this.admin = false;
        this.id = counterBuyer;
    }
    validate() {
        if ( validateFirstName(this.firstName) && validateLastName(this.lastName) && validateUser(this.userName) && validatePassword(this.password) && validateCard(this.card) && validateCVC(this.cvc) ) {
            toastMessage("User registered successfully", "success")
            counterBuyer++;
            return true;
        } else {
            return false;
        }
    }
    
}