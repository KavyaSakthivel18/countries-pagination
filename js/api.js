import { API_URL } from "./config.js";

import { x } from "./config.js";


export async function fetchLocationKey(city) {
    const url = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${x}&q=${city}`;

    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data[0]?.Key || null;
}

export async function fetchWeather(locationKey) {
    const url = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${x}&details=true`;

    const response = await fetch(url);
    if (!response.ok) return null;

    const data = await response.json();
    return data[0] || null;
}


export async function fetchCountries() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("API Failed");
    }

    return await response.json();
}

