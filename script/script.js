document.addEventListener("DOMContentLoaded", init);

function init() {
	
/* variables for keeping current position - longitude and latitude */
	let long;
	let lat;

	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");
	let temperatureSection = document.querySelector(".temperature");
	const temperatureSpan = document.querySelector(".degree-section span");

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;
		/* to avoid CORS policy consequences, we use 'cors-anywhere' */
			const proxy = "https://cors-anywhere.herokuapp.com/";
			const api = `${proxy}https://api.darksky.net/forecast/e25dfc79138af46ff1990edafb63c5fe/${lat},${long}`;
			fetch(api)
				.then(response => {
					return response.json();
				})
				.then(data => {
					console.log(data); /* allows us to see in the console what's available */
					/* destructuring allow us to use selected elements */
					const {temperature, summary, icon} = data.currently;
					/* DOM elements build with API */
					temperatureDegree.textContent = temperature.toFixed(1);
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;
				/* Celcius to Farenheit and to Celcius: */
					let celcius = (temperature - 32) * (5 / 9);

				/* setting icon for current weather: */
					setIcons(icon, document.querySelector(".icon"));
					/* the second argument is icon ID */

				/* setting alternative temperatures F to C and back: */
					temperatureSection.addEventListener("click", () => {
						if (temperatureSpan.textContent === "F") {
							temperatureSpan.textContent = "ºC";
							temperatureDegree.textContent = celcius.toFixed(1);
						}
						else {
							temperatureSpan.textContent = "F";
							temperatureDegree.textContent = temperature.toFixed(1);
						}
					})
				})
		});
	}

	function setIcons(icon, iconID) {
		/* new instance of the Skycons: */
		const skycons = new Skycons({color: "#08086b"});
		/* to adjust notation to the 'skycons' requirements, we replace '-' with '_' and make the name uppercased: */
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();

		skycons.play();

		return skycons.set(iconID, Skycons[currentIcon]);
	}
}