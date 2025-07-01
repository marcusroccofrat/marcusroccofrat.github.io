document.addEventListener('DOMContentLoaded', () => {
  // Toggle project description visibility
  document.querySelectorAll('.project h3').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      content.style.display = content.style.display === 'none' ? 'block' : 'none';
    });
  });

  // Lazy load images and videos
  const images = document.querySelectorAll('img[data-src]');
  const videos = document.querySelectorAll('video source[data-src]');

  const lazyLoad = (element) => {
    const src = element.getAttribute('data-src');
    if (src) {
      element.src = src;
      element.removeAttribute('data-src');
    }
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        lazyLoad(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  images.forEach(img => {
    img.setAttribute('data-src', img.src);
    img.src = '';
    observer.observe(img);
  });

  videos.forEach(video => {
    video.setAttribute('data-src', video.src);
    video.src = '';
    observer.observe(video);
  });
});