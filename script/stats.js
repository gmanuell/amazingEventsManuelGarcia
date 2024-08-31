import { fetchData } from "../modules/functions.js";

document.addEventListener('DOMContentLoaded', () => {
    fetchData()
        .then(data => {
            
            console.log(data);
            
            const currentDate = new Date(data.currentDate);
            data.pastEvents = data.events.filter(event => new Date(event.date) < currentDate);
            data.upcomingEvents = data.events.filter(event => new Date(event.date) > currentDate);

            
            data.highestAttendance = calcularMayorAsistencia(data.events);
            data.lowestAttendance = calcularMenorAsistencia(data.events);
            data.highestCapacity = calcularMayorCapacidad(data.events);

            
            mostrarEstadisticas(data);
        })
        .catch(error => {
            console.error("Error al obtener los datos:", error);
        });
});

function calcularMayorAsistencia(events) {
    if (events.length === 0) return null;
    return events.reduce((max, event) => {
        const attendancePercentage = (event.assistance / event.capacity) * 100;
        return attendancePercentage > max.attendancePercentage ? { ...event, attendancePercentage } : max;
    }, { attendancePercentage: 0 });
}

function calcularMenorAsistencia(events) {
    if (events.length === 0) return null;
    return events.reduce((min, event) => {
        const attendancePercentage = (event.assistance / event.capacity) * 100;
        return attendancePercentage < min.attendancePercentage ? { ...event, attendancePercentage } : min;
    }, { attendancePercentage: 100 });
}

function calcularMayorCapacidad(events) {
    if (events.length === 0) return null;
    return events.reduce((max, event) => {
        return event.capacity > max.capacity ? event : max;
    }, { capacity: 0 });
}

function agruparPorCategoria(events) {
    const categorias = {};
    events.forEach(event => {
        if (!categorias[event.category]) {
            categorias[event.category] = {
                category: event.category,
                revenue: 0,
                attendancePercentage: 0,
                count: 0
            };
        }

        
        const assistance = event.assistance !== undefined ? event.assistance : (event.estimate || 0);
        const price = event.price || 0;
        const capacity = event.capacity || 1;

        
        if (event.capacity !== undefined) {
            categorias[event.category].attendancePercentage += (assistance / capacity) * 100;
        }

        categorias[event.category].revenue += assistance * price;
        categorias[event.category].count += 1;
    });

    return Object.values(categorias).map(categoria => ({
        ...categoria,
        attendancePercentage: categoria.attendancePercentage / categoria.count
    }));
}

function mostrarEstadisticas(data) {
    const cardContainer = document.getElementById("tableStats");
    const cardContent = document.createElement("div");
    cardContent.className = "d-flex align-items-center justify-content-center";

    const upcomingEvents = Array.isArray(data.upcomingEvents) ? agruparPorCategoria(data.upcomingEvents) : [];
    const pastEvents = Array.isArray(data.pastEvents) ? agruparPorCategoria(data.pastEvents) : [];

    cardContent.innerHTML = `
        <table class="table table-responsive">
            <thead class="thead-dark">
                <tr>
                    <th class="table-active" colspan="3">Events Statistics</th>
                </tr>
                <tr>
                    <th>Events with highest % of assistance</th>
                    <th>Events with lowest % of assistance</th>
                    <th>Events with larger capacity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>${data.highestAttendance ? data.highestAttendance.name : 'N/A'} (${data.highestAttendance ? data.highestAttendance.attendancePercentage.toFixed(2) : 'N/A'}%)</td>
                    <td>${data.lowestAttendance ? data.lowestAttendance.name : 'N/A'} (${data.lowestAttendance ? data.lowestAttendance.attendancePercentage.toFixed(2) : 'N/A'}%)</td>
                    <td>${data.highestCapacity ? data.highestCapacity.name : 'N/A'} (${data.highestCapacity ? data.highestCapacity.capacity : 'N/A'})</td>
                </tr>
                <tr>
                    <th class="table-active" colspan="3">Upcoming events statistics by category</th>
                </tr>
                <tr>
                    <th>Categories</th>
                    <th>Revenues ($)</th>
                    <th>percentage of assistance</th>
                </tr>
                ${upcomingEvents.map(event => `
                    <tr>
                        <td>${event.category}</td>
                        <td>${event.revenue.toFixed(2)}</td>
                        <td>${event.attendancePercentage.toFixed(2)}%</td>
                    </tr>
                `).join('')}
                <tr>
                    <th class="table-active" colspan="3">Past events statistics by category</th>
                </tr>
                <tr>
                    <th>Categories</th>
                    <th>Revenues ($) </th>
                    <th>percentage of assistance</th>
                </tr>
                ${pastEvents.map(event => `
                    <tr>
                        <td>${event.category}</td>
                        <td>${event.revenue.toFixed(2)}</td>
                        <td>${event.attendancePercentage.toFixed(2)}%</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    cardContainer.appendChild(cardContent);
}
