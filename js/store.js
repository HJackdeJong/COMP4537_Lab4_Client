document.getElementById("storeForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const word = document.getElementById("word").value;
    const definition = document.getElementById("definition").value;

    if (!word || !definition) {
        document.getElementById("feedback").textContent = "Please provide both a word and a definition.";
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
        document.getElementById("feedback").textContent = data.message;
    })
    .catch(error => {
        document.getElementById("feedback").textContent = "Error occurred: " + error;
    });
});
