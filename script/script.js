document.addEventListener("DOMContentLoaded", init);

function init() {
	
/* variables for keeping current position - longitude and latitude */
	let long;
	let lat;

	let temperatureDescription = document.querySelector(".temperature-description");
	let temperatureDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");


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
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = summary;
					locationTimezone.textContent = data.timezone;

					setIcons(icon, document.querySelector(".icon"));

				})
		});
	}

	function setIcons(icon, iconID) {
		const skycons = new Skycons({color: "#08086b"});
		const currentIcon = icon.replace(/-/g, "_").toUpperCase();

		skycons.play();

		return skycons.set(iconID, Skycons[currentIcon]);
	}


}












