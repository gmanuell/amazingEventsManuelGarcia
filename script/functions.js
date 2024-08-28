// fetchData.js
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

export function createCategoryCheckboxes(data, checkboxContainer, filterEvents) {
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
        checkbox.addEventListener('change', () => filterEvents(data));
    });
}
