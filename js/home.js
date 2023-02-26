const cardsContainer = document.querySelector('#eventsContainer');

const arrayEvents = data.events;

let cardsCreated = createCards(arrayEvents)

cardsContainer.innerHTML = cardsCreated;

function createCards(arrayData){
    let cards = "";
    for (const event of arrayData) {
        cards += `
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
    return cards;
}




