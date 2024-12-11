document.getElementById('translateBtn').addEventListener('click', function() {
    const inputText = document.getElementById('inputText').value;

    if (!inputText.trim()) {
        document.getElementById('outputArea').value = "Please enter some text.";
        return;
    }

    const url = "https://api.monlam.ai/api/v1/translation";
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer KYE_HERE' 
    };

    const data = {
        "input": inputText,
        "target": "bo"
    };

    fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            return response.json(); 
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    })
    .then(translated => {
        const translatedText = translated.translation; 
        document.getElementById('outputArea').value = translatedText;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('outputArea').value = "Translation failed. " + error.message;
    });
});
