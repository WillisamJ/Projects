// Object containing video data for each category (category1 and category2)
// Each category has a list of videos with id and title, along with a description
const videos = {
  category1: {
      urls: [
          {id: "QjPJyMVSFS4", title: "Relaxing Video 1"},
          {id: "Z67utPxiiuw", title: "Relaxing Video 2"},
          {id: "WjB9rLod1ZI", title: "Relaxing Video 3"},
          {id: "jfKfPfyJRdk", title: "Relaxing Video 4"}
      ],
      description: "Let your worries float away"  // Description for category1
  },
  category2: {
      urls: [
          {id: "tE7-Bt2Qkr8", title: "Leaked Content 1"},
          {id: "3_GibjzXbDg", title: "Leaked Content 2"},
          {id: "NWZxyWEyf74", title: "Leaked Content 3"},
          {id: "htTH89H7Kag", title: "Leaked Content 4"}
      ],
      description: "Real, not clickbait, actual leaked gameplay just trust me bro"  // Description for category2
  }
};

// Variable to track the current video index
let currentVideoIndex = 0;

// Get references to DOM elements used throughout the app
const mainVideoContainer = document.getElementById('main-video-container');
const categoryElement = document.getElementById('category');
const autoplayCheckbox = document.getElementById('autoplay');
const descriptionElement = document.getElementById('video-description');
const videoTitleElement = document.getElementById('video-title');
const suggestedVideosContainer = document.getElementById('suggested-videos');
const pageTitleElement = document.getElementById('page-title');
const modal = document.getElementById("themeModal");
const btn = document.getElementById("themeBtn");
const span = document.getElementsByClassName("close")[0];
const form = document.getElementById("themeForm");

// Function to create YouTube embed iframe based on video ID
const createYouTubeEmbed = (videoId) => `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;

// Function to update main video, suggested videos, and page title
const updateVideoAndDescription = () => {
  const category = categoryElement.value;  // Get the selected category (either category1 or category2)
  const video = videos[category].urls[currentVideoIndex];  // Get the current video for the selected category

  // Update the main video container with the embedded YouTube iframe
  mainVideoContainer.innerHTML = createYouTubeEmbed(video.id);
  videoTitleElement.textContent = video.title;  // Set the video title
  descriptionElement.textContent = videos[category].description;  // Set the category description

  // Clear and populate the suggested videos section (excluding the current video)
  suggestedVideosContainer.innerHTML = '';
  videos[category].urls.forEach((video, index) => {
      if (index !== currentVideoIndex) {  // Skip the current video
          const videoItem = document.createElement('div');
          videoItem.className = 'video-item';
          videoItem.innerHTML = `
              <img src="https://img.youtube.com/vi/${video.id}/0.jpg" alt="Video thumbnail">
              <p>${video.title}</p>
          `;
          videoItem.addEventListener('click', () => {
              currentVideoIndex = index;  // Update the current video index
              updateVideoAndDescription();  // Re-run the update to show the selected video
          });
          suggestedVideosContainer.appendChild(videoItem);  // Add the video item to the grid
      }
  });

  // Update the page title based on the selected category
  pageTitleElement.textContent = category === 'category1' ? '3+ hours of relaxing white noise' : 'Five Nights At Freddys 12 leaked gameplay';
};

// Function to handle autoplay functionality: auto-play the next video if checked
const playNextVideo = () => {
  if (autoplayCheckbox.checked) {  // Check if the autoplay checkbox is checked
      currentVideoIndex = (currentVideoIndex + 1) % videos[categoryElement.value].urls.length;  // Loop back to the first video
      updateVideoAndDescription();  // Update the video and description
  }
};

// Function to apply the selected theme to the page by changing the body class
const applyTheme = (theme) => document.body.className = `${theme}-theme`;

// Modal functionality to display and hide the theme selection modal
btn.addEventListener('click', () => modal.style.display = "block");  // Open modal when profile button is clicked
span.addEventListener('click', () => modal.style.display = "none");  // Close modal when close button is clicked
window.addEventListener('click', (event) => {
  if (event.target == modal) modal.style.display = "none";  // Close modal if user clicks outside of it
});

// Handle theme form submission to save and apply user preferences
form.addEventListener('submit', (e) => {
  e.preventDefault();  // Prevent form submission

  // Get the values from the form fields
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const theme = document.querySelector('input[name="theme"]:checked')?.value;

  // Validate the form inputs
  if (!theme) {
      alert("Please select a theme.");
      return;
  }

  if (name.length < 4) {
      alert("The name must be at least 4 characters long.");
      return;
  }

  // Save user preferences to localStorage for future sessions
  localStorage.setItem("userName", name);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userTheme", theme);

  // Apply the selected theme immediately
  applyTheme(theme);
  modal.style.display = "none";  // Close the modal after saving preferences
});

// Load saved theme on page load if there is a saved preference in localStorage
const loadSavedTheme = () => {
  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) applyTheme(savedTheme);  // Apply the saved theme if it exists
};

// Load saved profile data (name, email, and theme) on page load
const loadSavedProfile = () => {
  const savedName = localStorage.getItem("userName");
  const savedEmail = localStorage.getItem("userEmail");

  // Populate form fields with saved user profile data
  if (savedName) document.getElementById("name").value = savedName;
  if (savedEmail) document.getElementById("email").value = savedEmail;

  // Check and apply the saved theme
  const savedTheme = localStorage.getItem("userTheme");
  if (savedTheme) {
      document.querySelector(`input[name="theme"][value="${savedTheme}"]`).checked = true;
      applyTheme(savedTheme);
  }
};

// Initialize the application on page load
const initializeApp = () => {
  updateVideoAndDescription();  // Initial update of video and description
  loadSavedTheme();  // Load saved theme preferences
  loadSavedProfile();  // Load saved user profile preferences
};

// Event listeners to trigger the app initialization and video updates
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();  // Initialize the app when the DOM is ready
  categoryElement.addEventListener('change', updateVideoAndDescription);  // Update video when category changes
  setInterval(playNextVideo, 5000);  // Auto-play next video every 5 seconds if autoplay is checked
});

