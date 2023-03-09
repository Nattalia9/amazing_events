//Obtenemos los datos de los parametros de la URL
const params = new URLSearchParams(document.location.search);

const id = params.get('id');

//Guardamos el array en una variable
const arrayEvents = data.events;

//Buscar dato por id
const cardDetails = arrayEvents.filter(event => event._id == id)

//Impriminos la card detail en la plantilla html
const containerDetails = document.querySelector('.all-detail');

let detailsHtml = "";

for(let event of cardDetails) {
    detailsHtml += `
    <div class="col-lg-7 col-xl-6 p-0">
        <img class="img-detail img-fluid" src="${event.image}" alt="${event.name}">
    </div>
    <div class="colour"></div>
    <div class="col-lg-5 col-xl-4 container-text-detail">
        <div class="info-detail">
            <h3 class="mb-1">${event.name}</h3>
            <p>${event.description}</p>
            <div class="color-details"></div>
            <div class="d-flex justify-content-between mb-1">
                <p><span class="card-icon"><i class="bi bi-calendar2-check"></i>Date:</span> ${event.date}</p>
                <p><span class="card-icon"><i class="bi bi-bookmark-check"></i>Category:</span> ${event.category}</p>
            </div>
            <div class="d-flex justify-content-between">
                <p><span class="card-icon"><i class="bi bi-people-fill"></i>Capacity:</span> ${event.capacity}</p>
                <p class="containerAsistents"></p>
            </div>
            <div class="details d-flex justify-content-between align-items-center">
                <h6 class="text-white">Price: $${event.price}</h6>
                <a href="./index.html" class="btn">Back to Home</a>
            </div>
        </div>
    </div>`
}

containerDetails.innerHTML = detailsHtml;

//Filtramos las cards y mostramos asistencia o estimación
const asistents = document.querySelector('.containerAsistents');

let assistance = cardDetails.some(event => {
    if(event.estimate){
        asistents.innerHTML = `<span class="card-icon"><i class="bi bi-person-fill-check"></i>Estimate:</span> ${event.estimate}`;
    } else {
        asistents.innerHTML = `<span class="card-icon"><i class="bi bi-person-fill-check"></i>Assistance:</span> ${event.assistance}`;
    }   
})
