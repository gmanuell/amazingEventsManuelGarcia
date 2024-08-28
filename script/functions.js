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




