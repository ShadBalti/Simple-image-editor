document.addEventListener('DOMContentLoaded', () => {
  // Function to handle file input change
  const FileRead = () => {
  let reader = new FileReader();
  let fileInput = document.getElementById('file');
  let img = document.getElementById('img');

  if (fileInput.files.length > 0) {
    let file = fileInput.files[0];

    reader.onload = e => {
      img.src = e.target.result;
    };

    reader.onerror = error => {
      console.error('Error reading the file:', error);
    };

    try {
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error reading the file:', err);
    }
  } else {
    console.error('No file selected.');
  }
};

  }

  // Get references to HTML elements
  let img = document.getElementById('img');
  let zoom = document.getElementById('zoom');
  let opacity = document.getElementById('opacity');
  let blur = document.getElementById('blur');
  let invert = document.getElementById('invert');
  let contrast = document.getElementById('contrast');

  let span = document.querySelectorAll('.arrow');
  let arrUp = span[0];
  let arrRe = span[1];
  let arrLe = span[2];
  let arrDw = span[3];

  let rotateButton = document.getElementById('rotate');

  // Add event listeners for various image adjustments
  zoom.addEventListener('input', () => {
    let valz = zoom.value;
    img.style.filter = `brightness(${valz})`;
    document.getElementById('sp1').textContent = valz;
  });

  opacity.addEventListener('input', () => {
    let valo = opacity.value;
    img.style.opacity = valo / 100;
    document.getElementById('sp2').textContent = valo;
  });

  blur.addEventListener('input', () => {
    let valz = blur.value;
    img.style.filter = `blur(${valz}px)`;
    document.getElementById('spBlur').textContent = valz;
  });

  contrast.addEventListener('input', () => {
    let valz = contrast.value;
    img.style.filter = `contrast(${valz})`;
    document.getElementById('spCon').textContent = valz;
  });

  invert.addEventListener('input', () => {
    let valo = '0.' + invert.value;
    img.style.filter = `invert(${valo})`;
    document.getElementById('spin').textContent = invert.value;
  });

  // Add event listeners for arrow buttons
  arrUp.addEventListener('click', () => {
    let hi = img.clientHeight + 4;
    img.style.height = hi + 'px';
  });

  arrDw.addEventListener('click', () => {
    let hi = img.clientHeight - 4;
    img.style.height = hi + 'px';
  });

  arrLe.addEventListener('click', () => {
    let hi = img.clientWidth + 4;
    img.style.width = hi + 'px';
  });

  arrRe.addEventListener('click', () => {
    let hi = img.clientWidth - 4;
    img.style.width = hi + 'px';
  });

  // Add event listener for image rotation
  let currentRotation = 0; // Initialize the current rotation angle

  rotateButton.addEventListener('click', () => {
    currentRotation += 90;
    img.style.transform = `rotate(${currentRotation}deg)`;
  });
});