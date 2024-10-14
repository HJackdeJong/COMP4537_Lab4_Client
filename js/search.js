document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const searchWord = document.getElementById("searchWord").value;

    if (!searchWord) {
        document.getElementById("result").textContent = "Please enter a word to search for.";
        return;
    }

    fetch(`https://yourDomainName2.wyz/add/definitions?word=${encodeURIComponent(searchWord)}`)
    .then(response => response.json())
    .then(data => {
        if (data.definition) {
            document.getElementById("result").textContent = `Word: ${data.word}, Definition: ${data.definition}`;
        } else {
            document.getElementById("result").textContent = data.message;
        }
    })
    .catch(error => {
        document.getElementById("result").textContent = "Error occurred: " + error;
    });
});
