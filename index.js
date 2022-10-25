const inquirer = require('inquirer')

const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

// const aMan = new Manager('moran', 1, 'moranlee@gmail.com', 'G1')
// console.log(aMan)

const init = async() => {
    try {
        const managerInfo = await inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: `Team Manager's Name`
            },
            {
                type: 'input',
                name: 'id',
                message: `Employee ID`
            },
            {
                type: 'input',
                name: 'email',
                message: `Email Address:`
            },
            {
                type: 'input',
                name: 'office',
                message: `Office Number`
            }
        ])
        console.log(managerInfo);
    } catch(err) {
        console.log(err)
    }

}



init ();
