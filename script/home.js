
// function renderEvents(events) {
//     contenedor.innerHTML = '';
//     if (events.length === 0) {
//         contenedor.innerHTML = `
//         <div> <h3>No encontramos eventos que coincidan con tu búsqueda.</h3>
//         </div>`;
//     } else {
//         events.forEach(event => {
//             let tarjeta = document.createElement("div");
//             tarjeta.className = "tarjeta";
//             tarjeta.innerHTML = `
//                 <img class="imgcard card-img-top" src="${event.image}">
//                 <div class="card-body d-flex flex-column justify-content-between">
//                     <h5 class="card-title">${event.name}</h5>
//                     <p class=" card-text">${event.description}</p>
//                     <div class="d-flex justify-content-between">
//                         <p>${event.price} $</p>
//                         <a href="./pages/details.html?id=${event._id}" class="btn btn-primary">Details</a>
//                     </div>
//                 </div>`;
//             contenedor.appendChild(tarjeta);
//         });
//     }
// } 

//home.js

// import {  useData, createCategoryCheckboxes, renderEvents } from "./functions.js";

// document.addEventListener('DOMContentLoaded', () => {
//     renderEvents();
// });

// const contenedor = document.getElementById("contenedor");
// const checkboxContainer = document.getElementById("inputs");
// const searchForm = document.getElementById("inputSearch");

// function filterEvents(data) {
//     const selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
//         .map(checkbox => checkbox.value);

//     const searchText = searchForm.value.toLowerCase();

//     const filteredEvents = data.events.filter(event => {
//         const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
//         const isSearchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText) || event.price.toString().includes(searchText);
//         return isCategoryMatch && isSearchMatch;
//     });

//     renderEvents(filteredEvents);
// }

// // Escuchar cambios en el campo de búsqueda y filtrar
// searchForm.addEventListener('input', () => {
//     useData(filterEvents);
// });

// // Iniciar el codigo y asegurar que todos los componentes estén sincronizados
// useData((data) => {
//     createCategoryCheckboxes(data, checkboxContainer, filterEvents); renderEvents(events);
//     filterEvents(data); 
// });


import { useData, createCategoryCheckboxes, renderEvents } from "./functions.js";

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch");

function filterEvents(data) {
    const selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const searchText = searchForm.value.toLowerCase();

    const filteredEvents = data.events.filter(event => {
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const isSearchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText) || event.price.toString().includes(searchText);
        return isCategoryMatch && isSearchMatch;
    });

    renderEvents(filteredEvents, contenedor);
}

document.addEventListener('DOMContentLoaded', () => {
    useData((data) => {
        createCategoryCheckboxes(data, checkboxContainer, filterEvents);
        renderEvents(data.events, contenedor);
        filterEvents(data);
    });
});

searchForm.addEventListener('input', () => {
    useData(filterEvents);
});
