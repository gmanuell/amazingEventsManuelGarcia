export function fetchData() {
    return fetch("https://aulamindhub.github.io/amazing-api/events.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("HTTP error " + response.status);
            }
            return response.json();
        })
        .then(data => data)
        .catch(error => {
            console.error("Error fetching data:", error);
            throw error;
        });
}

export function useData(callback) {
    fetchData()
        .then(data => {
            callback(data);
        })
        .catch(error => {
            console.error("Error en useData:", error);
        });
}

export function createCategoryCheckboxes(data, checkboxContainer, filterEventsCallback) {
    const categories = [...new Set(data.events.map(event => event.category))];
    checkboxContainer.innerHTML = '';

    categories.forEach(category => {
        const checkbox = document.createElement('div');
        checkbox.className = 'form-check';
        checkbox.innerHTML = `
            <input class="form-check-input" type="checkbox" value="${category}" id="${category}">
            <label class="form-check-label" for="${category}">${category}</label>
        `;
        checkboxContainer.appendChild(checkbox);
    });

    checkboxContainer.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', () => filterEventsCallback(data));
    });
}

export function renderEvents(events, contenedor) {
    contenedor.innerHTML = '';
    if (events.length === 0) {
        contenedor.innerHTML = `
        <div> <h3>We did not find events that match your search.</h3>
        </div>`;
    } else {
        events.forEach(event => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `
                <img class="imgcard card-img-top" src="${event.image}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                    <div class="d-flex justify-content-between">
                        <p>${event.price} $</p>
                        <a href="../pages/Details.html?id=${event._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>`;
            contenedor.appendChild(tarjeta);
        });
    }
}



export function filterEvents(data, contenedor, checkboxContainer, searchForm, filterType) {
    const selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    const searchText = searchForm.value.toLowerCase();
    const currentDate = new Date(data.currentDate);

    const filteredEvents = data.events.filter(event => {
        const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
        const isSearchMatch = event.name.toLowerCase().includes(searchText) || event.description.toLowerCase().includes(searchText) || event.price.toString().includes(searchText);

        let isDateMatch = true;
        const eventDate = new Date(event.date);
        
        if (filterType === 'upcoming') {
            isDateMatch = eventDate > currentDate;
        } else if (filterType === 'past') {
            isDateMatch = eventDate < currentDate;
        }

        return isCategoryMatch && isSearchMatch && isDateMatch;
    });

    renderEvents(filteredEvents, contenedor);
}
