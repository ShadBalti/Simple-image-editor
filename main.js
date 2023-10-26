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