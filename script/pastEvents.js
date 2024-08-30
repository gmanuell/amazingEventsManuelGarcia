import { useData, createCategoryCheckboxes, filterEvents } from "../modules/functions.js";

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch");

document.addEventListener('DOMContentLoaded', () => {
    useData((data) => {
        createCategoryCheckboxes(data, checkboxContainer, () => filterEvents(data, contenedor, checkboxContainer, searchForm, 'past'));
        filterEvents(data, contenedor, checkboxContainer, searchForm, 'past');
    });
});

checkboxContainer.addEventListener('change', () => {
    useData((data) => filterEvents(data, contenedor, checkboxContainer, searchForm, 'past'));
});

searchForm.addEventListener('input', () => {
    useData((data) => filterEvents(data, contenedor, checkboxContainer, searchForm, 'past'));
});
