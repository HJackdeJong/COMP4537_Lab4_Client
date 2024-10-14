const MESSAGES = require('../lang/messages/en/user.js').MESSAGES;

// Dynamically set user-facing strings
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("h1").textContent = MESSAGES.addDefinitionTitle;
    document.querySelector("label[for='word']").textContent = MESSAGES.wordLabel;
    document.querySelector("label[for='definition']").textContent = MESSAGES.definitionLabel;
    document.querySelector("button[type='submit']").textContent = MESSAGES.submitButton;
});

document.getElementById("storeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const word = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;

    if (!word || !definition) {
        document.getElementById("feedback").textContent = MESSAGES.provideBothWordAndDefinition;
        return;
    }

    const requestData = {
        word: word,
        definition: definition
    };

    fetch('https://hjdjprojectvillage.online/COMP4537/labs/4/api/definitions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("feedback").textContent = data.message || MESSAGES.feedbackSuccess;
    })
    .catch(error => {
        document.getElementById("feedback").textContent = MESSAGES.feedbackError + error;
    });
});
