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
        // Check if the response status is OK (200)
        if (response.ok) {
            return response.json();  // Parse the response JSON
        } else {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
    })
    .then(translated => {
        // Handle the translated data (forward it to the frontend of the extension)
        const translatedText = translated.translation;  // Extract translation from the response
        document.getElementById('outputArea').value = translatedText;  // Display translated text in frontend
    })
    .catch(error => {
        // Handle any errors during the request
        console.error('Error:', error);
        document.getElementById('outputArea').value = "Translation failed. " + error.message;
    });
});
