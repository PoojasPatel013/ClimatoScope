let searchButton = document.getElementById("Search");
let searchArea = document.getElementById("City");

searchButton.addEventListener("click", () => {
    let city = searchArea.value;
    let url = `https://api.weatherapi.com/v1/current.json?key=1a42dda53ab340c485153722241412&q=${city}`;

    fetch(url)
        .then((rawdata) => rawdata.json())
        .then((response) => {
            document.getElementById("cel").textContent = `${response.current.temp_c} °C`;
            document.getElementById("fer").textContent = `${response.current.temp_f} °F`;
            document.getElementById("env").textContent = `${response.current.condition.text}`;
            document.getElementById("icon").src = `https:${response.current.condition.icon}`;

            // Call the function to update clothing suggestions
            updateClothingSuggestions(response.current);
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
            alert("Failed to fetch weather data. Please check the city name or try again later.");
        });
});

// Function to provide clothing and item suggestions based on the weather
function updateClothingSuggestions(weather) {
    const temp = weather.temp_c;
    const condition = weather.condition.text.toLowerCase();
    const suggestionsElement = document.getElementById("clothing-suggestions");

    let suggestions = "";

    // Based on temperature
    if (temp <= 5) {
        suggestions = "It's very cold. Wear a heavy jacket, gloves, and a scarf.";
    } else if (temp > 5 && temp <= 15) {
        suggestions = "It's chilly. Wear a light jacket or sweater.";
    } else if (temp > 15 && temp <= 25) {
        suggestions = "The weather is pleasant. A t-shirt and jeans should be fine.";
    } else {
        suggestions = "It's hot. Wear light and breathable clothing like shorts and a t-shirt.";
    }

    // Add suggestions for rain or snow
    if (condition.includes("rain")) {
        suggestions += " Don't forget to carry an umbrella or raincoat.";
    } else if (condition.includes("snow")) {
        suggestions += " Wear snow boots and a warm hat.";
    } else if (condition.includes("sunny")) {
        suggestions += " Consider wearing sunglasses and sunscreen.";
    }

    // Update the suggestions element
    if (suggestionsElement) {
        suggestionsElement.textContent = suggestions;
    } else {
        console.warn("Suggestions element not found on the page.");
    }
}
