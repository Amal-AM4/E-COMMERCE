document.getElementById('themeBtn').addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    const theme = document.body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme); // Save theme preference to localStorage
});

// Check if theme preference is saved in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.classList.add(savedTheme); // Apply saved theme
}
