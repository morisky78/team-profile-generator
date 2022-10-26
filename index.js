const inquirer = require('inquirer')
const fs = require('fs')

const Manager = require('./lib/Manager')
const Engineer = require('./lib/Engineer')
const Intern = require('./lib/Intern')

const generateHtml = require('./src/generateHtml')


// const m = new Manager('Moran R', 1, 'moranlee@gmial.com', '7618')
// const s = new Engineer('Sidney', 2, 's-srisk@lwsd.org', 'sidneyr')
// const k = new Intern('Kenny R', 5, 'kenny@gmail.com', 'UW')
// const z = new Intern('Zoey', 6, 'zoey@gmail.com', 'Franklin')
// const v = new Engineer('Vincent', 3, 's-vrisk@lwsd.org', 'vincentr')
// const c = new Engineer('Chloe', 4, 's-chrisk@lwsd.org', 'chloer')

// const myTeamMemberArr = [];
// myTeamMemberArr.push(m)
// myTeamMemberArr.push(s)
// myTeamMemberArr.push(k)
// myTeamMemberArr.push(z)
// myTeamMemberArr.push(v)
// myTeamMemberArr.push(c)

// this array will all types of member class objects , manager, engineer, intern.
const myTeamMemberArr = [];



// prompt managers information and start building team
// create new Manager and push it to myTeamMemberArr
// manager's name is required. valid email check
function init() {
    console.log(`❇ Welcome to the Team Profile Generator ❇\n `)
    console.log(`Please enter the team manager's information `)
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `The manager's name:`,
            validate(input) { return answerRequired(input); } 
        },
        {
            type: 'input',
            name: 'id',
            message: `The manager's employee ID:`
        },
        {
            type: 'input',
            name: 'email',
            message: `The manager's email address:`,
            validate(input) { return emailValidate(input) }
        },
        {
            type: 'input',
            name: 'office',
            message: `The manager's office number:`
        }
    ]).then( (ans) => {
        const newMng = new Manager(ans.name, ans.id, ans.email, ans.office);
        myTeamMemberArr.push(newMng);
       
        askQuestion();
    })

}

// ask if you want to add engineer/ intern / finish
// call functions accordingly to get more info of the team member / finish and create html
function askQuestion()  {
    console.log(``)
    inquirer.prompt([
        {
            type: 'list',
            name: 'addTeam',
            message: `What type of member would you like to add?`,
            choices: [
                'Engineer',
                'Intern',
                'Finish building my team'
            ]
        }
    ]).then(({addTeam}) => {
        switch(addTeam) {
            case 'Engineer' :
                addEngineer();
                break;
            case 'Intern' :
                addIntern();
                break;
            case 'Finish building my team' :
                createTeamHTML();
                break;
            default:

        }
    })
}

// prompt engineer's information and create new Engineer and push it to myTeamMemberArr
// name, email, github valid check
function addEngineer() {
    console.log(`Please enter the engineer's information `)
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Engineer's name:`,
            validate(input) { return answerRequired(input); } 
        },
        {
            type: 'input',
            name: 'id',
            message: `Engineer's employee ID:`
        },
        {
            type: 'input',
            name: 'email',
            message: `Engineer's email address:`,
            validate(input) { return emailValidate(input) }
        },
        {
            type: 'input',
            name: 'github',
            message: `Github username:`,
            validate(input) { return answerRequired(input); } 
        }

    ]).then(ans => {
        const newEng = new Engineer(ans.name, ans.id, ans.email, ans.github);
        myTeamMemberArr.push(newEng);
        askQuestion() 
    })
}

// prompt intern's information and create new Intern and push it to myTeamMemberArr
// name, email, github valid check
function addIntern(){
    console.log(`Please enter the intern's information `)
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Intern's name:`,
            validate(input) { return answerRequired(input); } 
        },
        {
            type: 'input',
            name: 'id',
            message: `Intern's employee ID:`
        },
        {
            type: 'input',
            name: 'email',
            message: `Intern's email address:`,
            validate(input) { return emailValidate(input) }
        },
        {
            type: 'input',
            name: 'school',
            message: `Intern's school:`
        }
    ]).then(ans => {
        const newIntern= new Intern(ans.name, ans.id, ans.email, ans.school);
        myTeamMemberArr.push(newIntern);
        askQuestion();
    })

}

function emailValidate(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        return true;
      }
    return `You have entered an invalid email address!`;
}
function answerRequired(input) {
    if (!input) {
        return `This field is required!`;
    } return true;
}


function createTeamHTML(){
    // console.log(myTeamMemberArr)
    fs.writeFile('./dist/team.html', generateHtml(myTeamMemberArr), (err)=> err? console.error(err): console.log('❇ Team Profile HTML is created! Check dist/team.html❇'))
}

init ();
