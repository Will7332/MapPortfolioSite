import maps from './maps.mjs';

console.log(maps);

function mapTemplate(map){
    return `<div class="column">
                <img src= "${map.image}" alt="Map image" class="imgmap">
                <p>${map.description}</p>
            </div>`
}

function renderMaps(mapsList){
    let gallery = document.getElementById("gallery");
    gallery.innerHTML="";
    const mapshtml = mapsList.map(mapTemplate).join("");
    gallery.innerHTML = mapshtml;
}

function init(){
    renderMaps(maps);
}


document.addEventListener("DOMContentLoaded", init);


console.log(maps.name);

//******MODAL******//

function viewerTemplate(pic, alt,) {
    return `<div class="viewer">
                <button class="close">X</button>
                <img class="enlarged" src="${pic}" alt="${alt}">
                <p>${maps.description}</p>
            </div>`;
}

function viewHandler(event) {
    console.log("function called");

    const clicked = event.target;
    if (clicked.tagName === "IMG") {  
        const modalContainer = document.createElement("div");
        modalContainer.innerHTML = viewerTemplate(clicked.src, clicked.alt);
        modalContainer.classList.add("viewer");

        document.body.appendChild(modalContainer);

        // Close button 
        modalContainer.querySelector(".close").addEventListener("click", () => {
            modalContainer.remove();
        });

        // Clicking outside the modal closes it
        modalContainer.addEventListener("click", (e) => {
            if (e.target === modalContainer) {
                modalContainer.remove();
            }
        });
    }
}

// Attach event listener to all images in gallery
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("gallery").addEventListener("click", viewHandler);
});


//******SEARCH******//

const forminput = document.querySelector("form");
forminput.addEventListener("submit", searchHandler);

function filterMaps(query) {
    const filtered = maps.filter(map =>
        map.name.toLowerCase().includes(query) ||
        map.description.toLowerCase().includes(query) ||
        map.tags.some(tag => tag.toLowerCase().includes(query))
    );

    return filtered.sort((a, b) => a.name.localeCompare(b.name));
}

function searchHandler(event) {
    event.preventDefault()
    let userInput = forminput.querySelector("input").value.toLowerCase();
    let filteredMaps = filterMaps(userInput);
    renderMaps(filteredMaps);

}