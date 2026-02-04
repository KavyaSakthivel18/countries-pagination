import { ITEMS_PER_PAGE } from "./config.js";
import { displayCountries } from "./render.js";

const paginationDiv = document.getElementById("pagination");

export function setupPagination(countriesData) {

    const totalPages = Math.ceil(countriesData.length / ITEMS_PER_PAGE);

    paginationDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;

        btn.addEventListener("click", () => {
            const start = (i - 1) * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;

            const pageData = countriesData.slice(start, end);
            displayCountries(pageData);
        });

        paginationDiv.appendChild(btn);
    }
}

