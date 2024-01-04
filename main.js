        const imageInput = document.getElementById("image-input");
        const imageUrlInput = document.getElementById("image-url");
        const loadImageBtn = document.getElementById("load-image");
        const editedImage = document.getElementById("edited-image");
        const brightnessInput = document.getElementById("brightness");
        const opacityInput = document.getElementById("opacity");
        const blurInput = document.getElementById("blur");
        const contrastInput = document.getElementById("contrast");
        const invertBtn = document.getElementById("invert");
        const rotateBtn = document.getElementById("rotate");
        const resizePlusBtn = document.getElementById("resize-plus");
        const resizeMinusBtn = document.getElementById("resize-minus");

        let currentImage = new Image();

        imageInput.addEventListener("change", handleImageUpload);
        loadImageBtn.addEventListener("click", loadExternalImage);
        brightnessInput.addEventListener("input", updateImage);
        opacityInput.addEventListener("input", updateImage);
        blurInput.addEventListener("input", updateImage);
        contrastInput.addEventListener("input", updateImage);
        invertBtn.addEventListener("click", invertColors);
        rotateBtn.addEventListener("click", rotateImage);
        resizePlusBtn.addEventListener("click", resizeImagePlus);
        resizeMinusBtn.addEventListener("click", resizeImageMinus);

        function handleImageUpload(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (event) {
                    currentImage.src = event.target.result;
                    currentImage.onload = updateImage;
                };
                reader.readAsDataURL(file);
            }
        }

        function loadExternalImage() {
            const url = imageUrlInput.value;
            if (url) {
                currentImage.src = url;
                currentImage.onload = updateImage;
            }
        }

        function updateImage() {
            const canvas = document.createElement("canvas");
            canvas.width = currentImage.width;
            canvas.height = currentImage.height;
            const ctx = canvas.getContext("2d");

            ctx.filter = `brightness(${brightnessInput.value}%) opacity(${opacityInput.value}%) blur(${blurInput.value}px) contrast(${contrastInput.value}%)`;

            ctx.drawImage(currentImage, 0, 0);

            editedImage.src = canvas.toDataURL();
        }

        function invertColors() {
            const canvas = document.createElement("canvas");
            canvas.width = currentImage.width;
            canvas.height = currentImage.height;
            const ctx = canvas.getContext("2d");
            ctx.filter = "invert(100%)";
            ctx.drawImage(currentImage, 0, 0);
            editedImage.src = canvas.toDataURL();
        }

        function rotateImage() {
            currentImage = rotateImage90Degrees(currentImage);
            updateImage();
        }

        function resizeImagePlus() {
            currentImage.width *= 1.1;
            currentImage.height *= 1.1;
            updateImage();
        }

        function resizeImageMinus() {
            currentImage.width *= 0.9;
            currentImage.height *= 0.9;
            updateImage();
        }

        function rotateImage90Degrees(image) {
            const canvas = document.createElement("canvas");
            canvas.width = image.height;
            canvas.height = image.width;
            const ctx = canvas.getContext("2d");

            ctx.translate(canvas.width / 2, canvas.height / 2);
            ctx.rotate(Math.PI / 2);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);

            return canvas;
        }


// Add a script to apply animations when the page loads
document.addEventListener("load", function () {
    // Get the elements to animate
    const ownerImage = document.querySelector(".owner-image");
    const ownerBio = document.querySelector(".owner-bio");
    const socialLinks = document.querySelector(".social-links");

    // Add a class to trigger the animations
    ownerImage.classList.add("show");
    ownerBio.classList.add("show");
    socialLinks.classList.add("show");
});


// Define variables to store the editing history
let editingHistory = [];
let currentIndex = -1;

// Function to save the current image state
function saveState() {
    if (currentIndex < editingHistory.length - 1) {
        editingHistory = editingHistory.slice(0, currentIndex + 1);
    }
    const canvas = document.createElement("canvas");
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(currentImage, 0, 0);
    editingHistory.push(canvas.toDataURL());
    currentIndex++;
}

// Undo function
function undo() {
    if (currentIndex > 0) {
        currentIndex--;
        const imgData = editingHistory[currentIndex];
        const img = new Image();
        img.src = imgData;
        img.onload = () => {
            currentImage = img;
            updateImage();
        };
    }
}

// Redo function
function redo() {
    if (currentIndex < editingHistory.length - 1) {
        currentIndex++;
        const imgData = editingHistory[currentIndex];
        const img = new Image();
        img.src = imgData;
        img.onload = () => {
            currentImage = img;
            updateImage();
        };
    }
}

// Attach event listeners to Undo and Redo buttons
const undoButton = document.getElementById("undo");
const redoButton = document.getElementById("redo");

undoButton.addEventListener("click", undo);
redoButton.addEventListener("click", redo);

// Save the initial state when an image is loaded
currentImage.onload = () => {
    saveState();
    updateImage();
};



// Function to download the edited image
function downloadImage() {
    const canvas = document.createElement("canvas");
    canvas.width = currentImage.width;
    canvas.height = currentImage.height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(currentImage, 0, 0);

    // Create a download link for the image
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = "edited_image.png";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Function to share the edited image (sample implementation)
function shareImage() {
    const imageUrl = currentImage.src;
    // Implement sharing logic here, e.g., opening a sharing dialog or copying the URL to the clipboard
    alert("Share this image: " + imageUrl);
}

// Attach event listeners to the "Download" and "Share" buttons
const downloadButton = document.getElementById("download");
const shareButton = document.getElementById("share");

downloadButton.addEventListener("click", downloadImage);
shareButton.addEventListener("click", shareImage);



        // JavaScript for dynamic clock
        function updateClock() {
            const now = new Date();
            const timeElement = document.getElementById("clock");
            timeElement.innerText = now.toLocaleTimeString();
        }
        setInterval(updateClock, 1000);
