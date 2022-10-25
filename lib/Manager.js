// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee")

class Manager extends Employee{
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole() {
        return 'Manager'
    }
}

// const aMan = new Manager('moran', 1, 'moranlee@gmail.com', 'G1')
// console.log(aMan)
// console.log(aMan.getRole())
module.exports = Manager