// import { useData, createCategoryCheckboxes, filterUpcomingEvents, filterEvents } from "./functions.js";

// const contenedor = document.getElementById("contenedor");
// const checkboxContainer = document.getElementById("inputs");
// const searchForm = document.getElementById("inputSearch");

// document.addEventListener('DOMContentLoaded', () => {
//     useData((data) => {
//         createCategoryCheckboxes(data, checkboxContainer, () => filterUpcomingEvents(data, contenedor, checkboxContainer, searchForm));
//         filterEvents(data, contenedor, checkboxContainer, searchForm);
//     });
// });

// searchForm.addEventListener('input', () => {
//     useData((data) => 
//         // filterUpcomingEvents(data, contenedor, checkboxContainer, searchForm));
//     filterUpcomingEvents(data, contenedor, checkboxContainer, searchForm));filterEvents(data, contenedor, checkboxContainer, searchForm);

// });

// upcomingEvents.js


// upcomingEvents.js

import { useData, createCategoryCheckboxes, filterEvents } from "../modules/functions.js";

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch");

document.addEventListener('DOMContentLoaded', () => {
    useData((data) => {
        createCategoryCheckboxes(data, checkboxContainer, () => filterEvents(data, contenedor, checkboxContainer, searchForm, 'upcoming'));
        filterEvents(data, contenedor, checkboxContainer, searchForm, 'upcoming');
    });
});

checkboxContainer.addEventListener('change', () => {
    useData((data) => filterEvents(data, contenedor, checkboxContainer, searchForm, 'upcoming'));
});

searchForm.addEventListener('input', () => {
    useData((data) => filterEvents(data, contenedor, checkboxContainer, searchForm, 'upcoming'));
});
