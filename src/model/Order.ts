export class Order {
    public customerName: string;
    public packageID: number;
    public email: string;
    public total: number;
    public qty: number;
    public checkIn: string;
    public checkOut: string;
    public category: string;

    constructor(customerName: string, packageID: number, email: string, total: number, qty: number, checkIn: string, checkOut: string, category: string) {
        this.customerName = customerName;
        this.packageID = packageID;
        this.email = email;
        this.total = total;
        this.qty = qty;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.category = category;
    }
}