//your JS code here. If required.
// Function to set a cookie
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

// Function to get a cookie by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Function to apply styles to the page
function applyPreferences(size, color) {
    if (size) {
        document.documentElement.style.setProperty('--fontsize', size + 'px');
        document.getElementById('fontsize').value = size;
    }
    if (color) {
        document.documentElement.style.setProperty('--fontcolor', color);
        document.getElementById('fontcolor').value = color;
    }
}

// 1. On Page Load: Apply preferences if cookies exist
window.onload = function() {
    const savedSize = getCookie("fontsize");
    const savedColor = getCookie("fontcolor");
    applyPreferences(savedSize, savedColor);
};

// 2. On Save: Prevent default form submission and save values
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault(); // Stop page refresh

    const fontSize = document.getElementById('fontsize').value;
    const fontColor = document.getElementById('fontcolor').value;

    // Save to cookies (valid for 30 days)
    setCookie("fontsize", fontSize, 30);
    setCookie("fontcolor", fontColor, 30);

    // Apply immediately to the UI
    applyPreferences(fontSize, fontColor);
    
    alert("Preferences saved!");
});