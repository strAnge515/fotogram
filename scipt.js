let myImgs = ['antarctica.jpg',
    'beach.jpg',
    'bird.jpg',
    'kite-surfing.jpg',
    'lightning.jpg',
    'milky-way.jpg',
    'mountains.jpg',
    'orion.jpg',
    'senbon-torii.jpg',
    'sun-rays.jpg',
    'surfer.jpg',
    'tree.jpg'
];
let path = './img/'

let currentIndex = 0;

let lightbox;


/*

window.onload = function () {
    let container = document.getElementById("content");

    // schleife für alle Bilder, die den Namen augibt, 
    // div und img container erzeugt und sie mit src und class austattet
    for (let i = 0; i < myImgs.length; i++) {

        let fullPath = path + myImgs[i];

        let divContainer = document.createElement("div");
        divContainer.className = "img-container";

        let imgElement = document.createElement("img");
        imgElement.src = fullPath;

        divContainer.appendChild(imgElement);
        container.appendChild(divContainer);
    }
};
*/


window.onload = function () {

    lightbox = this.document.getElementById ("lightbox");
    generateImgs();
    lightboxPicker();
    initButtons();
    initCloseButton();
    initKeyboard();
    showCurrentImg();
    closeLightbox();

};

function generateImgs() {

    let container = document.getElementById("content");

    // Schleife für alle Bilder, die den Namen augibt, 
    // div und img container erzeugt und sie mit src und class austattet

    for (let i = 0; i < myImgs.length; i++) {
        let fullPath = path + myImgs[i];
        container.innerHTML += `<div class = "img_container">
                                    <img src = ${fullPath}>
                                    
                                </div>`

    };
};

// macht die lightbox sichtbar mit einer zusätzlichen Klasse, lädt das Bild ind die lightbox
// current Index ist ganz oben definiert mit 0
function lightboxPicker() {

    
    let content = document.getElementById("content");
    let showedImgs = content.getElementsByTagName("img");
    let lightboxImg = document.getElementById("img-lightbox");

    for (let i = 0; i < showedImgs.length; i++) {

        showedImgs[i].addEventListener("click", function () {

            lightbox.classList.add('active');

            lightboxImg.src = showedImgs[i].src;

            currentIndex = i;

            showImageName(i);

        });
    };

};
// seperate Funktion für einen "schönen" Namen, um lightboxPicker() übersichtlich zu halten
function showImageName(index) {

    let imgDescription = document.getElementById("img-description");
    let imgName = myImgs[index].replace(".jpg", "");

    imgDescription.innerHTML = imgName.charAt(0).toUpperCase() + imgName.slice(1);

};
// Funktion für Buttons links und rechts 
function initButtons() {

    let buttonRight = document.getElementById("button-right");
    let buttonLeft = document.getElementById("button-left");

    buttonRight.addEventListener("click", function () {
        currentIndex++;

        showCurrentImg();

    });

    buttonLeft.addEventListener("click", function () {
        currentIndex--;

        showCurrentImg();
    });

};
// Funktion Closebutton
function initCloseButton() {
    
    let closeBtn = document.getElementById("closeButtonLightbox");

    closeBtn.addEventListener("click", function () {
        lightbox.classList.remove("active");
    });
};
// Funktion für Pfeiltasten
function initKeyboard() {
    document.addEventListener('keydown', function (event) {
        if (lightbox.classList.contains("active")) {
            if (event.key === "ArrowLeft") {
                currentIndex--;
                showCurrentImg();
            };
            if (event.key === "ArrowRight") {
                currentIndex++;
                showCurrentImg();
            };
        };
    });
};
// Funktion für das aktualisieren des Imgs in der Lightbox
function showCurrentImg() {
    let counter = document.getElementById("img-counter");
    let lightboxImg = document.getElementById("img-lightbox");

    if (currentIndex >= myImgs.length) {
        currentIndex = 0;
    };
    if (currentIndex < 0) {
        currentIndex = myImgs.length - 1;
    };

    lightboxImg.src = path + myImgs[currentIndex];

    showImageName(currentIndex);

    counter.innerHTML = (currentIndex + 1) + " / " + myImgs.length;
};

// Funtion für das Schließen der Lightbox mit prüfen, ob das geklickte Element die Lightbox ist
function closeLightbox() {
    
    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            lightbox.classList.remove("active");
        };
    });

};

