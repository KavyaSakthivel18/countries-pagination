import { fetchLocationKey, fetchWeather } from "./api.js";
const container = document.getElementById("countries-container");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementById("close-modal");

closeBtn.onclick = () => modal.classList.add("hidden");

export function displayCountries(data) {
    container.innerHTML = "";

    data.forEach(country => {
        const card = document.createElement("div");
        card.className = "country-card";

        card.innerHTML = `
            <img class="flag-img" src="${country.flags.png}">
            <h3 class="country-name">${country.name.common}</h3>
        `;


        container.appendChild(card);

        const img = card.querySelector(".flag-img");

        img.addEventListener("click", () => {
            openModal(country);
        });

        
    });


}

async function openModal(country) {

    const official = country.name.official || "N/A";

    const currencyObj = country.currencies
        ? Object.values(country.currencies)[0]
        : null;

    const currencySymbol = currencyObj?.symbol || "N/A";

    const longitude = country.capitalInfo?.latlng
        ? country.capitalInfo.latlng[1]
        : "N/A";

    let showBorders = "";
    if (country.borders && country.borders.length >= 2) {
        const lastBorders = country.borders.slice(-2).join(", ");
        showBorders = `<p><b>Last Borders:</b> ${lastBorders}</p>`;
    }

    // 🟡 Weather START
    let weatherHtml = "<p>Loading weather...</p>";

    if (country.capital && country.capital.length > 0) {
        const city = country.capital[0];

        const locKey = await fetchLocationKey(city);

        if (locKey) {
            const weather = await fetchWeather(locKey);

            if (weather) {
                const temp = weather.Temperature.Metric.Value + " °" + weather.Temperature.Metric.Unit;
                const humidity = weather.RelativeHumidity + "%";

                weatherHtml = `
                  <p><b>Weather in ${city}:</b></p>
                  <p>Temperature: ${temp}</p>
                  <p>Humidity: ${humidity}</p>
                  <p>Condition: ${weather.WeatherText}</p>
                  <p>Wind: ${weather.Wind.Speed.Metric.Value} ${weather.Wind.Speed.Metric.Unit}</p>

                `;
            } else {
                weatherHtml = "<p>Weather data unavailable</p>";
            }
        } else {
            weatherHtml = "<p>Location not found</p>";
        }
    } else {
        weatherHtml = "<p>No capital city</p>";
    }
    // 🟡 Weather END

    modalBody.innerHTML = `
        <h3>${country.name.common}</h3>
        <p><b>Official:</b> ${official}</p>
        <p><b>Currency Symbol:</b> ${currencySymbol}</p>
        <p><b>Capital Longitude:</b> ${longitude}</p>

        ${showBorders}  <!-- only if >=2 borders -->

        ${weatherHtml}   <!-- weather section -->
    `;

    modal.classList.remove("hidden");
}

document.getElementById("close-bottom").onclick =
    () => modal.classList.add("hidden");
