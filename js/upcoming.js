let arrayEvents = []
let currentDate
let pastEvents = []
let upcomingEvents = []

/*-------FETCH----------------------------------------------------- */
function getData(){
    fetch('https://mindhub-xj03.onrender.com/api/amazing')
    // fetch('./amazing_1.json')
    .then(response => response.json())
    .then(data => {
        arrayEvents = data.events;
        currentDate = data.currentDate;
        filterEvents(arrayEvents, currentDate);
        createCards(upcomingEvents)
        createCategories2(upcomingEvents)
        const searchHTML = document.querySelector('#search');
        const checkboxCategory = document.querySelectorAll('input[type="checkbox"]');
        for (const checkbox of checkboxCategory) {
        checkbox.addEventListener('change', () => {
        const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const value = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
        let cardsSearched = upcomingEvents.filter((event)=> event.name.toLowerCase().includes(searchHTML.value.toLowerCase()))
        const arraySelectedEvents = cardsSearched.filter(event => value.includes(event.category))
          if(arraySelectedEvents.length == 0){
            cardsContainer.innerHTML = createCards(cardsSearched)
          } else {
              cardsContainer.innerHTML =  createCards(arraySelectedEvents)
          }
        });
      }
				searchHTML.addEventListener("keyup",()=> {
				let cardsSearched = upcomingEvents.filter((event)=> event.name.toLowerCase().includes(searchHTML.value.toLowerCase()))
				const checkedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
				const value = Array.from(checkedCheckboxes).map(checkbox => checkbox.value);
				const arraySelectedEvents = cardsSearched.filter(event => value.includes(event.category))
				if(arraySelectedEvents.length == 0){
					cardsContainer.innerHTML = createCards(cardsSearched)
				} else {
					cardsContainer.innerHTML =  createCards(arraySelectedEvents)
				}
				})
			})
    .catch( error => console.log(error.message))
}

getData()


function filterEvents(arrayData, currentDate) {
    pastEvents = arrayData.filter((event) => event.date < currentDate); 
    upcomingEvents = arrayData.filter((event) => event.date > currentDate);
}

/*-------CREATE CARDS----------------------------------------------------- */

//Función para crear cards y mostrarlas en la plantilla html
const cardsContainer = document.querySelector('#eventsContainer');
const categoryContainer = document.querySelector(".categories")


function createCards(arrayData){
    if(arrayData.length == 0){
        return cardsContainer.innerHTML = `<h5 class="text-center">No events found</h5>`
    }
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
    cardsContainer.innerHTML = cards;
    return cards
}

/*-------CHECKBOXS--------------------------------------------------------- */
function createCategories2(arrayData) {
    let categories = []
    arrayData.map(events => {
        if (!categories.includes(events.category)) {
            categories.push(events.category)
        }
    })
    let category = ""
    let idNumber = 1;
    categories.forEach(categ => {
            category += `
            <div class="d-flex gap-2">
                <input type="checkbox" class="checkbox" id="category${idNumber}" value="${categ}">
                <label for="category${idNumber}">${categ}</label>
            </div>`
        })
        categoryContainer.innerHTML = category;
        idNumber ++
}