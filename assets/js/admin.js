let counterAdmin = 0;
class Admin
{
    constructor(userName, password)
    {
        this.userName = userName;
        this.password = password;
        this.admin = true;
        this.id = counterAdmin;
    }
    validate() {
        if ( validateUser(this.userName) && validatePassword(this.password) && validateCard(this.card) && validateCVC(this.cvc) ) {
            alert("User registered successfully");
            counterAdmin++;
            return true;
        } else {
            alert("User registration failed");
            return false;
        }
    }
    
}