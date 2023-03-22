const highestAttendance = document.querySelector('#highestAttendance');

const lowestAttendance = document.querySelector('#lowestAttendance');

const containerCapacity = document.querySelector('#containerCapacity');

let upcomingContainer = document.querySelector('#upcomingContainer')

let pastContainer = document.querySelector('#pastContainer')


/*-------FETCH----------------------------------------------------- */

let arrayEvents = []
let currentDate
let pastEvents = []
let upcomingEvents = []

function getData(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    // fetch('./amazing_1.json')
    .then(response => response.json())
    .then(data => {
        arrayEvents = data.events;
        currentDate = data.currentDate;
        filterEvents(arrayEvents, currentDate);
        percentagesOfAttendance(pastEvents)
        largerCapacityE(arrayEvents)
        printTableCategory(upcomingEvents, upcomingContainer)
        printTableCategory(pastEvents, pastContainer)
     })
    .catch( error => console.log(error.message))
}

getData()

//Filtramos los eventos pasados y los eventos futuros
function filterEvents(arrayData, currentDate) {
    pastEvents = arrayData.filter((event) => event.date < currentDate); 
    upcomingEvents = arrayData.filter((event) => event.date > currentDate);
}

//Función para calcular los porcentajes de eventos con mayor y menor cantidad de asistencia
function percentagesOfAttendance(arrayData) {
    const assistances= arrayData.map(event => {
        return {
            percentage : ((event.assistance * 100) / event.capacity).toFixed(2),
            nameEvent: event.name
        } 
    })
    assistances.sort((a, b) => b.percentage - a.percentage)
    highestAttendance.innerText = assistances[0].nameEvent + ": " + assistances[0].percentage + '%'
    lowestAttendance.innerText = (assistances.reverse())[0].nameEvent + ": " + assistances[0].percentage + '%'
    return assistances
}

//Función para traer el evento con mayor capacidad
function largerCapacityE(arrayData) {
    const largerCapacity = arrayData.map(event => {
      return {
        capacity: event.capacity,
        nameEvent: event.name
      }
    })
    largerCapacity.sort((a, b) => b.capacity - a.capacity)
    containerCapacity.innerText = (largerCapacity[0].nameEvent) + ': ' + (largerCapacity[0].capacity)
    return largerCapacity
  }

//Función tabla por categorias, ganacia y porcentaje de asistencia
function filterByCategory(arrayData) {
    let categories = []
    let tableCategory = []
    //filtramos las categorias del array, sin repetidas
    arrayData.map(events => {
        if (!categories.includes(events.category)) {
            categories.push(events.category)
        }
    })
    categories.map(category => {
        let eventsByCategory = arrayData.filter(event => event.category === category)

        let renueves = eventsByCategory.map(event => (event.assistance ? event.assistance : event.estimate) * event.price)
        let totalRenueves = renueves.reduce((actualValue, lastValue) => actualValue = actualValue + lastValue, 0)

        let percentageAttendance = eventsByCategory.map(event => (event.assistance ? event.assistance : event.estimate) / event.capacity)
        let attendance = ((percentageAttendance.reduce((actualValue, lastValue) => actualValue = actualValue + lastValue, 0) / percentageAttendance.length) * 100).toFixed(2)
        
        tableCategory.push([category, "$" + totalRenueves, attendance + "%"])
    })
    return tableCategory
}

//Función imprime datos por categorias para eventos pasadas y futuras
function printTableCategory(arrayData, container) {
    let eventTable = filterByCategory(arrayData)
    eventTable?.forEach(event => {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${event[0]}</td>
        <td>${event[1]}</td>
        <td>${event[2]}</td>
        `
        container.appendChild(row)
    })
}