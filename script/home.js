import { useData, createCategoryCheckboxes, renderEvents, filterEvents } from "../modules/functions.js";

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch");

document.addEventListener('DOMContentLoaded', () => {
    useData((data) => {
        createCategoryCheckboxes(data, checkboxContainer, (data) => filterEvents(data, contenedor, checkboxContainer, searchForm));
        renderEvents(data.events, contenedor);
        filterEvents(data, contenedor, checkboxContainer, searchForm);
    });
});

searchForm.addEventListener('input', () => {
    useData((data) => filterEvents(data, contenedor, checkboxContainer, searchForm));
});
