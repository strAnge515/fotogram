let myImgs = ['antarctica.jpg', // Array of image filenames
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


let currentIndex = 0;   // tracks currently displayed image in lightbox
let lightbox = document.getElementById("lightbox"); // reference to the dialog element
let lastFocusedButton;

window.onload = function () {
    generateImgs(); // create image elements in the gallery
    lightboxPicker(); // add click + keyboard (Enter) listeners to images
    closeBtn(); // set up close button listener
};

function generateImgs() {
    let container = document.getElementById("content");
    // create figure + button + img for each image
    for (let i = 0; i < myImgs.length; i++) {
        let capitalizedName = myImgs[i].replace(".jpg", "");
        capitalizedName = capitalizedName.charAt(0).toUpperCase() + capitalizedName.slice(1);

        container.innerHTML += `
        <figure class="img_container">
            <button class="column" aria-label="Open image ${capitalizedName}">
                <img src="./img/${myImgs[i]}" alt="${capitalizedName}">
            </button>
        </figure>
    `;
    }
};


function lightboxPicker() {
    let content = document.getElementById("content");
    let showedImgs = content.getElementsByTagName("img");
    for (let i = 0; i < showedImgs.length; i++) {
        let parentButton = showedImgs[i].parentElement;
        parentButton.addEventListener("click", () => openLightbox(i));   // click on image opens lightbox
        parentButton.addEventListener("keydown", (event) => {   // pressing Enter while focused on image opens lightbox
            if (event.key === "Enter") {
                openLightbox(i);
            };
        });
    };
};



function openLightbox(index) {
    lastFocusedButton = document.getElementById("img-lightbox"); //save the focus
    let lightboxImg = document.getElementById("img-lightbox");
    lightbox.showModal();   // show dialog
    lightbox.focus();   // set keyboard focus
    lightboxImg.src = myImgs[index];    // display selected image
    currentIndex = index;
    showImageName(index);   // update image description
    showCurrentImg();   // update counter and displayed image
};



// show image name in header
function showImageName(index) {

    let imgDescription = document.getElementById("img-description");
    let imgName = myImgs[index].replace(".jpg", "");

    imgDescription.innerHTML = imgName.charAt(0).toUpperCase() + imgName.slice(1);

};

// Closebutton
function closeBtn() {
    const closeBtn = document.getElementById("closeButtonLightbox");
    closeBtn.addEventListener("click", function () {
        lightbox.close();
    });
};

// return focus
lightbox.addEventListener("close", function () {
    if (lastFocusedButton) {
        lastFocusedButton.focus();
    }
});

// close lightbox when clicking on the backdrop
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        lightbox.close();
    }
});





// update current image and counter in lightbox
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

// navigate with arrow keys

lightbox.addEventListener("keydown", function (event) {
    if (event.key === "ArrowRight") {
        next();
    }
    if (event.key === "ArrowLeft") {
        previous();
    }
});

//go to the next picture
function next() {
    currentIndex++;
    if (currentIndex >= myImgs.length) {
        currentIndex = 0
    }
    showCurrentImg();
};
//go to the previous picture
function previous() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = myImgs.length - 1
    }
    showCurrentImg();
};


