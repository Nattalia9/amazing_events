const arrayEvents = data.events;

let currentDate = data.currentDate;

const pastEvents = [];

function filterPastEvents(arrayData, currentDate) {
    for (const event of arrayData) {
        if(event.date < currentDate) {
            pastEvents.push(event)
        } 
    }
    console.log("Past Events: ",pastEvents);
}

filterPastEvents(arrayEvents, currentDate)


/*******function Display********/

const cardsContainer = document.querySelector('#eventsContainer');

let cardsDisplayed = displayPastEvents(pastEvents)

cardsContainer.innerHTML = cardsDisplayed;

function displayPastEvents(arrayData){
    let cardsPast = "";
    for (const event of arrayData) {
        cardsPast += `
        <div class="card p-0" style="width: 18rem;">
            <img src=${event.image} class="card-img-top img-fluid" alt="img_events1">
            <div class="card-body d-flex flex-column justify-content-between">
                <div class="text">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.description}</p>
                </div>
                <div class="details d-flex justify-content-between align-items-center">
                    <h6>Price: $${event.price}</h6>
                    <a href="./details.html" class="btn">Details</a>
                </div>
            </div>
        </div>`
    }
    return cardsPast;
}