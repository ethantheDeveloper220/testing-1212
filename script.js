// Unsplash API key (replace with your key)
const UNSPLASH_API_KEY = 'YOUR_UNSPLASH_API_KEY';
const UNSPLASH_API_URL = 'https://api.unsplash.com/search/photos?query=';

let selectedImage = ''; // To store the URL of the selected image

// Function to search for images on Unsplash
async function searchImages() {
  const query = document.getElementById('imageSearch').value;

  if (query === '') {
    alert('Please enter a search term.');
    return;
  }

  const response = await fetch(`${UNSPLASH_API_URL}${query}&client_id=${UNSPLASH_API_KEY}`);
  const data = await response.json();

  const imageResultsDiv = document.getElementById('imageResults');
  imageResultsDiv.innerHTML = ''; // Clear previous results

  // Display the images as clickable thumbnails
  data.results.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.thumb;
    imgElement.alt = image.alt_description;
    imgElement.classList.add('image-thumb');
    imgElement.addEventListener('click', () => selectImage(image.urls.full));

    imageResultsDiv.appendChild(imgElement);
  });
}

// Function to set the selected image URL
function selectImage(imageUrl) {
  selectedImage = imageUrl;
  alert('Image selected!');
}

// Function to generate the theme
function generateTheme() {
  // Get user inputs
  const leagueBackgroundToggle = document.getElementById('leagueBackgroundToggle').checked;
  const garageBackgroundToggle = document.getElementById('garageBackgroundToggle').checked;
  const imageChoice = document.getElementById('imageChoice').value;

  // Determine which background to apply
  let leagueBackground = 'https://default-image-url.com'; // Default
  let garageBackground = 'https://default-image-url.com'; // Default

  if (selectedImage) {
    if (imageChoice === 'league') {
      leagueBackground = selectedImage;
    } else if (imageChoice === 'garage') {
      garageBackground = selectedImage;
    }
  }

  // Build the CSS code
  let generatedCss = `
/* ==UserStyle==
@name         Mighty
@version      20230515.14.12
@namespace    ?
==/UserStyle== */

@-moz-document domain("www.nitrotype.com") {
  :root {
    --league-page-background: url("${leagueBackground}");
    --garage-background: url("${garageBackground}");
    --use-transparent-league: ${leagueBackgroundToggle ? 'true' : 'false'};
    --use-transparent-garage: ${garageBackgroundToggle ? 'true' : 'false'};
  }

  body {
    background-color: #2d2e2e;
    overflow-y: scroll;
    background: none;
    overflow-x: hidden;
    position: relative;
  }

  .league-page {
    background: var(--use-transparent-league) ? transparent : var(--league-page-background);
    background-size: cover;
    background-position: center;
  }

  .garage {
    background: var(--use-transparent-garage) ? transparent : var(--garage-background);
    background-size: cover;
    background-position: center;
  }

  .btn--primary {
    background: #0c0c0c;
    color: #ffffff;
  }

  .btn--secondary {
    background: #0c0c0c;
    color: #ffffff;
  }

  .theme--pDefault .profile-title {
    color: #0818ff;
    text-shadow: 0 2px 2px rgba(2, 2, 2, 0.25);
  }
}
  `;

  // Display the generated CSS in the textarea
  document.getElementById('generatedCss').value = generatedCss;
}
