// Get the HTML Elements by their Tag Name and assigned to variable

// Wait for the document to fully load before starting the automatic transition
document.addEventListener("DOMContentLoaded", function () {
  // Set a timeout to automatically redirect to the menu page after a certain time
  setTimeout(function () {
    // Redirect to the menu page
    window.location.href = "menu.html";
  }, 30000); // Change the delay (in milliseconds) to your preferred time
});