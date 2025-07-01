document.addEventListener('DOMContentLoaded', () => {
  // Smooth scrolling for navigation links
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const sectionId = this.getAttribute('href').substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Toggle project details (optional interactivity)
  document.querySelectorAll('.project h3').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });
});