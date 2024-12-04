export class User{
    public email:string;
    public userName:string;
    public password:string;
    public address:string;
    public contactNumber:string;
    constructor(email:string ,username:string,password:string,address:string,contactNumber:string){
        this.email=email;
        this.userName=username;
        this.password=password;
        this.address=address;
        this.contactNumber=contactNumber;
    }
}