fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => response.json())
    .then(data => {
        renderEvents(data.events);
        createCategoryCheckboxes(data.events);
        searchForm.addEventListener('input', () => filterEvents(data.events)); 
    })
    .catch(error => console.error('Error fetching data:', error));

const contenedor = document.getElementById("contenedor");
const checkboxContainer = document.getElementById("inputs");
const searchForm = document.getElementById("inputSearch")

function createCategoryCheckboxes() {
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
      checkbox.addEventListener('change', filterEvents);
  });
}


function filterEvents() {
  
  const selectedCategories = Array.from(checkboxContainer.querySelectorAll('input[type="checkbox"]:checked'))
  .map(checkbox => checkbox.value);

  const searchText = searchForm.value.toLowerCase()
    
  contenedor.innerHTML = '';

  const filteredEvents = data.events.filter(event =>{ 
    const isCategoryMatch = selectedCategories.length === 0 || selectedCategories.includes(event.category);
    const isSearchMatch = event.name.toLocaleLowerCase().includes(searchText) || event.description.toLocaleLowerCase().includes(searchText) || event.price.toString().includes(searchText);
    const dateFilter = data.currentDate > event.date;
    return isCategoryMatch && isSearchMatch && dateFilter
  });

renderEvents(filteredEvents);
}

function renderEvents(events) {
    contenedor.innerHTML = '';
    if (events.length === 0) {
        contenedor.innerHTML = `
        <div> <h3>No encontramos eventos que coincidan con tu búsqueda.</h3>
        </div>`;
    } else {
        events.forEach(event => {
            let tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta";
            tarjeta.innerHTML = `
                <img class="imgcard card-img-top" src="${event.image}">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h5 class="card-title">${event.name}</h5>
                    <p class=" card-text">${event.description}</p>
                    <div class="d-flex justify-content-between">
                        <p>${event.price} $</p>
                        <a href="../pages/details.html?id=${event._id}" class="btn btn-primary">Details</a>
                    </div>
                </div>`;
            contenedor.appendChild(tarjeta);
        });
    }
}

searchForm.addEventListener('input', filterEvents);

createCategoryCheckboxes();
filterEvents();