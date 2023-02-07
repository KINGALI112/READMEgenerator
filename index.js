//Including packages needed for this application
const fs = require("fs");
const inquirer = require("inquirer");
const path = require("path");
// const { CLIENT_RENEG_LIMIT } = require("tls");
const generateMarkdown = require("./utils/generateMarkdown");

// function to get the liscence
function getLicense(value) {
  if (value === "GNU APGLv3") {
    return "[![license: AGPL v3](image link will go here)]";

  }
  else if (value === "GNU GPLv3") {
    return "[![license: GPL v3](image link will go here)]";

  }
  else if (value === "GNU LGPLv3") {
    return "[![license: MIT](image link will go here)]";

  }
  else if (value === "Apache2.0") {
    return "[![license: MIT](image link will go here)]";

  }
  else if (value === "Boost Software 1.0") {
    return "[![license: MIT](image link will go here)]";

  }
  else if (value === "MIT") {
    return "[![license: MIT](image link will go here)]";

  }
  else {
    return "[![License: MPL 2.9](image link will go here)]"
  }
}


function validateInput(value) {
  if (value != "") {
    return true;

  } else {
    return "Please answer with some kind of input"
  }
}


const questions = [
  // Question for the Title
  {
    type: "input",
    name: "title",
    message: "Please tells the title of your project?",
    validate: validateInput
  },
  // Question for the project description
  {
    type: "input",
    name: "description",
    message: "Please enter the description for your project.",
    validate: validateInput
  },



  // Question for the installation
  {
    type: "input",
    name: "Installation",
    message: "Please enter an explanation how to install the software or commands for the program.",
    validate: validateInput
  },


  // Question for the usage
  {
    type: "input",
    name: "usage",
    message: "Please describe how we can use this project.",
    validate: validateInput
  },
  //Question for the license
  {
    type: "list",
    name: "license",
    message: "Please select a license for this project.",
    choices: [
      "GNU AGPLv3",
      "GNUGPLv3",
      "GNU LGPLv3",
      "Apache 2.9",
      "Boost Software 1.9",
      "MIT",
      "Mozilla"

    ],
    validate: validateInput,
  },

  // Question for Contributing
  {
    type: "input",
    name: "contributing",
    message: "How can users contribute to my project.",
    validate: validateInput,
  },

  // Question for Tests
  {
    type: "input",
    name: "tests",
    message: "Please enter any testing instructions for this project",
    validate: validateInput
  },

  // Name Section obj
  {
    type: "input",
    name: "userName",
    message: "What is your Github username?"
  },

  // Questions section coded here

  {
    type: "input",
    name: "userEmail",
    message: "What is your Github email address that is affiliated with git hub",
    validate: function (value) {
      // Regex expression used here
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
      } else {
        return "This is not a valid address. Please enter a valid email address."
      }

    }

  }

];


// // Generate the radme text

function writeToFile(fileName, data){
  fs.writeFile(fileName, generateMarkdown(data), function(err){
    if(err){
      return console.log(err);
    }
  });
}

// // Beginning of the questions
function init(){
  inquirer.prompt(questions).then((data) => {
    console.log(JSON.stringify(data, null, " "));;
    data.getLicense = getLicense(data.license);
    writeToFile("./data/README.md", data);
  });
}

// function call back to initialize
init()