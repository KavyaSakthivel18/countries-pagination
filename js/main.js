import { fetchCountries } from "./api.js";
import { setupPagination } from "./pagination.js";
import { displayCountries } from "./render.js";
import { ITEMS_PER_PAGE } from "./config.js";

const searchInput = document.getElementById("search-input");

let allCountries = [];
let currentData = [];


/* ======================
   INIT APP
====================== */
async function init() {
    const countries = await fetchCountries();

    // sort (optional but nicer UX)
    // countries.sort((a, b) =>
    //     a.name.common.localeCompare(b.name.common)
    // );

    allCountries = countries;
    currentData = countries;

    loadPage(currentData);
}


/* ======================
   LOAD DATA TO PAGINATION
====================== */
function loadPage(data) {
    // first page
    displayCountries(data.slice(0, ITEMS_PER_PAGE));

    // pagination
    setupPagination(data);
}


/* ======================
   SEARCH FEATURE
====================== */
searchInput.addEventListener("input", () => {

    const value = searchInput.value.toLowerCase();

    if (value === "") {
        currentData = allCountries;
    } else {
        currentData = allCountries.filter(country =>
            country.name.common.toLowerCase().includes(value)
        );
    }

    // reset to page 1 with filtered data
    loadPage(currentData);
});


init();
