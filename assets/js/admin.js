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
        if ( validateUser(this.userName) && validatePassword(this.password) ) {
            toastMessage("User with role admin registered successfully", "success")
            counterAdmin++;
            return true;
        } else {
            return false;
        }
    }
    
}