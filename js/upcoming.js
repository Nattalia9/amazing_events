const arrayEvents = data.events;

let currentDate = data.currentDate;

const upcomingEvents = [];

function filterUpcomingEvents(arrayData, currentDate) {
    for (const event of arrayData) {
        if(event.date > currentDate) {
            upcomingEvents.push(event)
        } 
    }
    console.log("Upcoming Events: ",upcomingEvents);
}

filterUpcomingEvents(arrayEvents, currentDate)


/*******function Display********/

const cardsContainer = document.querySelector('#eventsContainer');

let cardsDisplayed = displayUpcomingEvents(upcomingEvents)

cardsContainer.innerHTML = cardsDisplayed;

function displayUpcomingEvents(arrayData){
    let cardsUpcoming = "";
    for (const event of arrayData) {
        cardsUpcoming += `
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
    return cardsUpcoming;
}

