import { MESSAGES } from '/lang/messages/en/user.js';

// Dynamically set user-facing strings
document.addEventListener("DOMContentLoaded", function () {
    document.title = MESSAGES.searchPageTitle;
    document.querySelector("h1").textContent = MESSAGES.searchTitle;
    document.querySelector("label[for='searchWord']").textContent = MESSAGES.searchWordLabel;
    document.getElementById("goToStoreButton").textContent = MESSAGES.goToStoreButton;
    document.querySelector("button[type='submit']").textContent = MESSAGES.searchButton;
});

document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchWord = document.getElementById("searchWord").value;

    if (!searchWord) {
        document.getElementById("result").textContent = MESSAGES.searchEnterWord;
        return;
    }

    fetch(`https://hjdjprojectvillage.online/COMP4537/labs/4/add/definitions?word=${encodeURIComponent(searchWord)}`)
    .then(response => response.json())
    .then(data => {
        if (data.definition) {
            document.getElementById("result").textContent = MESSAGES.searchResult
                .replace('%WORD%', data.word)
                .replace('%DEFINITION%', data.definition);
        } else {
            document.getElementById("result").textContent = MESSAGES.searchNotFound
                .replace('%WORD%', searchWord);
        }
    })
    .catch(error => {
        document.getElementById("result").textContent = MESSAGES.searchError + error;
    });
});
