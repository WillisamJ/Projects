// Object containing video data for each category
const videos = {
    category1: {
        urls: [
            {id: "QjPJyMVSFS4", title: "Relaxing Video 1"},
            {id: "Z67utPxiiuw", title: "Relaxing Video 2"},
            {id: "WjB9rLod1ZI", title: "Relaxing Video 3"},
            {id: "jfKfPfyJRdk", title: "Relaxing Video 4"}
        ],
        description: "Let your worries float away"
    },
        category2: {
            urls: [
                {id: "tE7-Bt2Qkr8", title: "Leaked Content 1"},
                {id: "3_GibjzXbDg", title: "Leaked Content 2"},
                {id: "NWZxyWEyf74", title: "Leaked Content 3"},
                {id: "htTH89H7Kag", title: "Leaked Content 4"}
            ],
            description: "Real, not clickbait, actual leaked gameplay just trust me bro"
        }

    }

let currentVideoIndex = 0;

// Get references to DOM elements
const mainVideoContainer = document.getElementById('main-video-container');
const categoryElement = document.getElementById('category');
const autoplayCheckbox = document.getElementById('autoplay');
const descriptionElement = document.getElementById('video-description');
const videoTitleElement = document.getElementById('video-title');
const suggestedVideosContainer = document.getElementById('suggested-videos');
const pageTitleElement = document.getElementById('page-title');

// Function to create YouTube embed iframe
function createYouTubeEmbed(videoId) {
    return `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
}

// Function to play the next video when autoplay is enabled
function playNextVideo() {
    if (autoplayCheckbox.checked) {
        currentVideoIndex = (currentVideoIndex + 1) % videos[categoryElement.value].urls.length;
        updateMainVideo();
    }
}

// Function to update the main video
function updateMainVideo() {
    const category = categoryElement.value;
    const video = videos[category].urls[currentVideoIndex];
    mainVideoContainer.innerHTML = createYouTubeEmbed(video.id);
    videoTitleElement.textContent = video.title;
    descriptionElement.textContent = videos[category].description;
}

// Function to update the suggested videos
function updateSuggestedVideos() {
    const category = categoryElement.value;
    suggestedVideosContainer.innerHTML = '';
    videos[category].urls.forEach((video, index) => {
        if (index !== currentVideoIndex) {
            const videoItem = document.createElement('div');
            videoItem.className = 'video-item';
            videoItem.innerHTML = `
                <img src="https://img.youtube.com/vi/${video.id}/0.jpg" alt="Video thumbnail">
                <p>${video.title}</p>
            `;
            videoItem.addEventListener('click', () => {
                currentVideoIndex = index;
                updateMainVideo();
            });
            suggestedVideosContainer.appendChild(videoItem);
        }
    });
}

// Function to update the page title
function updatePageTitle() {
    const category = categoryElement.value;
    if (category === 'category1') {
      pageTitleElement.textContent = '3+ hours of relaxing white noise';
    } else if (category === 'category2') {
      pageTitleElement.textContent = 'Five Nights aT Freddys 12 leaked gameplay';
    }
}

// Function to update both main video and suggested videos
function updateVideoAndDescription() {
    currentVideoIndex = 0;
    updateMainVideo();
    updateSuggestedVideos();
    updatePageTitle();
}

// Event listener for category change
categoryElement.addEventListener('change', updateVideoAndDescription);

// Set interval to check for autoplay and change video every 5 seconds
setInterval(playNextVideo, 5000);

// New code for theme functionality

// Get modal elements
const modal = document.getElementById("themeModal");
const btn = document.getElementById("themeBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("themeForm");

// Open modal
btn.onclick = function() {
  modal.style.display = "block";
}

// Close modal
span.onclick = function() {
  modal.style.display = "none";
}

// Close modal if clicked outside
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Handle form submission
form.onsubmit = function(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const theme = document.getElementById("theme").value;
  
  // Save user preferences to localStorage
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userTheme", theme);
  
  // Apply the selected theme
  applyTheme(theme);
  
  // Close the modal
  modal.style.display = "none";
}

// Function to apply theme
function applyTheme(theme) {
  document.body.className = theme + "-theme";
}

// Load saved theme on page load
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) {
    applyTheme(savedTheme);
  }
}

// Initialize the application
function initializeApp() {
  updateVideoAndDescription();
  loadSavedTheme();
}

// Call initializeApp when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);