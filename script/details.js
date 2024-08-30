import { useData } from "../modules/functions.js";

document.addEventListener('DOMContentLoaded', () => {
    useData((data) => {
        const url = window.location.search;
        const urlObjeto = new URLSearchParams(url);
        const eventId = urlObjeto.get('id');

        if (eventId) {
            const event = data.events.find(e => e._id === parseInt (eventId));

            if (event) {
                const cardContainer = document.getElementById("card-container");
                const cardContent = document.createElement("div");
                cardContent.className = "d-flex align-items-center ";

                const eventDate = new Date(event.date);
                const currentDate = new Date(data.currentDate);

                const attendanceOrEstimate = eventDate < currentDate ?
                    `<p class="assistance d-card">Assistance: ${event.assistance ? event.assistance : 'N/A'}</p>` :
                    `<p class="estimate d-card">Estimate: ${event.estimate ? event.estimate : 'N/A'}</p>`;

                cardContent.innerHTML = `
                <div class="cardDetails align-items-center col-12 border flex-column border-dark flex-sm-column d-flex flex-wrap flex-lg-row">
                    <div class="col-lg-6 p-0">
                        <img class="detailCard" src="${event.image}" alt="${event.name}">
                    </div>
                    <div class="flex-wrap col-6">
                        <div class="card-body">
                            <h5 class="name d-card">${event.name}</h5>
                            <p class="date d-card">${event.date}</p>
                            <p class="description d-card">${event.description}</p>
                            <p class="category d-card">${event.category}</p>
                            <p class="place d-card">${event.place}</p>
                            <p class="capacity d-card">Capacity: ${event.capacity}</p>
                            ${attendanceOrEstimate}
                            <p class="price d-card">Price: ${event.price} $</p>
                        </div>
                    </div>
                </div>
                `;

                cardContainer.appendChild(cardContent);
            } else {
                console.log("Evento no encontrado");
            }
        } else {
            console.log("No se proporcionó ningún ID de evento en la URL");
        }
    });
});
