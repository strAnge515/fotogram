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


let currentIndex = 0;
let lightbox = document.getElementById("lightbox");




window.onload = function () {

    
    generateImgs();
    lightboxPicker();
    closeBtn ();
   



};

function generateImgs() {

    let container = document.getElementById("content");

    // Schleife für alle Bilder, die den Namen augibt, 
    // div und img container erzeugt und sie mit src und class austattet

    for (let i = 0; i < myImgs.length; i++) {

        container.innerHTML += `<figure class = "img_container">
                                    <button class= "column">
                                        <img src ="./img/${myImgs[i]}">
                                    </button>
                                </figure>`

    };
};

// macht die lightbox sichtbar mit einer zusätzlichen Klasse, lädt das Bild ind die lightbox
// current Index ist ganz oben definiert mit 0
function lightboxPicker() { // überarbeiten


    let content = document.getElementById("content");
    let showedImgs = content.getElementsByTagName("img");
    let lightboxImg = document.getElementById("img-lightbox");

    for (let i = 0; i < showedImgs.length; i++) {

        showedImgs[i].addEventListener("click", function () {

            lightbox.showModal();
            lightbox.focus();

            lightboxImg.src = showedImgs[i].src;

            currentIndex = i;

            showImageName(i);
            showCurrentImg();

        });
    };

};



// seperate Funktion für einen "schönen" Namen, um lightboxPicker() übersichtlich zu halten
function showImageName(index) {

    let imgDescription = document.getElementById("img-description");
    let imgName = myImgs[index].replace(".jpg", "");

    imgDescription.innerHTML = imgName.charAt(0).toUpperCase() + imgName.slice(1);

};
function closeBtn () {
const closeBtn = document.getElementById("closeButtonLightbox");
closeBtn.addEventListener("click", function () {
    
        lightbox.close();
    
});
};


// Funktion für das aktualisieren des Imgs in der Lightbox
function showCurrentImg() {

    let counter = document.getElementById("img-counter");
    let lightboxImg = document.getElementById("img-lightbox");



    if (currentIndex >= myImgs.length) {
        currentIndex = 0;
        console.log(currentIndex);
    };
    if (currentIndex < 0) {
        currentIndex = myImgs.length - 1;
        console.log(currentIndex);
    };

    lightboxImg.src = "./img/" + myImgs[currentIndex];

    showImageName(currentIndex);

    counter.innerHTML = (currentIndex + 1) + " / " + myImgs.length;
};

// Funktion für Pfeiltasten

lightbox.addEventListener("keydown", function (event){
    if (event.key === "ArrowRight") {
        next();
    }
    if (event.key === "ArrowLeft") {
        previous();
    }
});


function next() {
    currentIndex++;
    if (currentIndex === myImgs.length - 1) {
        currentIndex = 0
    }
    showCurrentImg();
};

function previous() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = myImgs.length - 1
    }
    showCurrentImg();
};

