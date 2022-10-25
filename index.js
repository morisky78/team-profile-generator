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
const myTeamMemberArr = [];




function init() {
    inquirer.prompt([
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
    ]).then( (ans) => {
        const newMng = new Manager(ans.name, ans.id, ans.email, ans.office);
        myTeamMemberArr.push(newMng);
       
        askQuestion() 
    })

}

function askQuestion()  {
    inquirer.prompt([
        {
            type: 'list',
            name: 'addTeam',
            message: `What do you want to do next?`,
            choices: [
                'Add an engineer',
                'Add an intern',
                'Finish building my team'
            ]
        }
    ]).then(({addTeam}) => {
        switch(addTeam) {
            case 'Add an engineer' :
                addEngineer();
                break;
            case 'Add an intern' :
                addIntern();
                break;
            case 'Finish building my team' :
                createTeamHTML();
                break;
        }
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Engineer's name?`,
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
            name: 'github',
            message: `Github username:`
        }

    ]).then(ans => {
        const newEng = new Engineer(ans.name, ans.id, ans.email, ans.github);
        myTeamMemberArr.push(newEng);
        askQuestion() 
    })
}

function addIntern(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: `Intern's name?`,
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
            name: 'school',
            message: `School:`
        }
    ]).then(ans => {
        const newIntern= new Intern(ans.name, ans.id, ans.email, ans.school);
        myTeamMemberArr.push(newIntern);
        askQuestion() 
    })

}

function createTeamHTML(){

    console.log(myTeamMemberArr)

    // console.log(generateHtml(myTeamMemberArr));

    fs.writeFile('./dist/team.html', generateHtml(myTeamMemberArr), (err)=> err? console.error(err): console.log('Team HTML created!'))
}
init ();
