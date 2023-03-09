/*-------CREATE CARDS----------------------------------------------------- */

//Guardamos en variables el array y la fecha actual

const arrayEvents = data.events;

let currentDate = data.currentDate;

//Filtramos del array los eventos futuros
const upcomingEvents = arrayEvents.filter((event) => event.date > currentDate);

//Función para crear cards y mostrarlas en la plantilla html

const cardsContainer = document.querySelector('#eventsContainer');

function createCards(arrayData){
    let cards = ""
    arrayData.forEach(event => {
       cards += `
        <div class="card p-0" style="width: 18rem;">
            <img src=${event.image} class="card-img-top img-fluid" alt="img_event">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="text">
                    <h5 class="card-title mb-1">${event.name}</h5>
                    <p class="card-date"><i class="bi bi-calendar2-check"></i> ${event.date}</p>
                    <div class="card-line"></div>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="details d-flex justify-content-between align-items-center">
                    <h6>Price: $${event.price}</h6>
                    <a href="./details.html?id=${event._id}" class="btn">See more</a>
                </div>
            </div>
        </div>`
    })
    return cards
}

createCards(upcomingEvents)

cardsContainer.innerHTML = createCards(upcomingEvents);

/*-------CHECKBOXS--------------------------------------------------------- */

//Filtramos del array las categorias
const arrayCategory = upcomingEvents.map((event) => event.category); 

//Almacenamos en un array las categorias que no se repitan
const filterCategory = arrayCategory.filter((value, index) => { 
    return arrayCategory.indexOf(value) === index;
});

//Función para crear las categorias y mostrarlas en la plantilla html
const categoryContainer = document.querySelector(".categories")

let category = ""

function createCategories(arrayCategories){
    let idNumber = 1;
    arrayCategories.forEach(categ => {
        category += `
        <input type="checkbox" class="checkbox" id="category${idNumber}" value="${categ}">
        <label for="category${idNumber}">${categ}</label>`
    })
    idNumber ++
}

createCategories(filterCategory)
categoryContainer.innerHTML = category;

//Imprimimos en la plantilla Html las cards de las categorias seleccionadas
const checkboxCategory = document.querySelectorAll('input[type="checkbox"]');

for (const checkbox of checkboxCategory) {
  checkbox.addEventListener('change', () => {
    const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const value = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
    const arraySelectedEvents = upcomingEvents.filter(event => value.includes(event.category))
    if(arraySelectedEvents.length == 0){
        cardsContainer.innerHTML = createCards(upcomingEvents)
    } else {
        cardsContainer.innerHTML =  createCards(arraySelectedEvents)
    }
  });
}

/*-------SEARCH----------------------------------------------------- */

//Agregamos un escuchador al input y mostramos las cards de la busqueda realizada
const searchHTML = document.querySelector('#search');

searchHTML.addEventListener("keyup",()=> {
    let cardsSearched = upcomingEvents.filter((event)=> event.name.toLowerCase().includes(searchHTML.value.toLowerCase()))
    cardsContainer.innerHTML = createCards(cardsSearched);
})
