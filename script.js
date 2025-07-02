document.addEventListener('DOMContentLoaded', () => {
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

  // Sidebar navigation logic
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const openSidebarBtn = document.getElementById('open-sidebar');
  const closeSidebarBtn = document.getElementById('close-sidebar');

  function openSidebar() {
    sidebar.classList.add('open');
    sidebarOverlay.classList.add('open');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('open');
  }
  openSidebarBtn.addEventListener('click', openSidebar);
  closeSidebarBtn.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

  // Typewriter effect for hero section
  const typewriterText = document.getElementById('typewriter-text');
  if (typewriterText) {
    const phrases = [
      'Mechanical Engineering MS Student',
      'Self-driving Lab Researcher',
      'Autonomous Systems Enthusiast',
      'Additive Manufacturing Specialist',
      'Machine Learning Explorer',
      'Innovator & Collaborator'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;
    function type() {
      const current = phrases[phraseIndex];
      if (isDeleting) {
        charIndex--;
        typewriterText.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(type, 700);
        } else {
          setTimeout(type, 40);
        }
      } else {
        charIndex++;
        typewriterText.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) {
          isDeleting = true;
          setTimeout(type, 1200);
        } else {
          setTimeout(type, 80);
        }
      }
    }
    type();
  }

  // Scroll-in animation for sections
  function animateOnScroll() {
    const animatedEls = document.querySelectorAll('[data-animate]');
    animatedEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('animated');
      }
    });
  }
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('DOMContentLoaded', animateOnScroll);

  // Lightbox for images
  function createLightbox() {
    let lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = '<button class="lightbox-close">&times;</button><img src="" alt="Enlarged image">';
    document.body.appendChild(lightbox);
    const img = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    function open(src) {
      img.src = src;
      lightbox.classList.add('open');
    }
    function close() {
      lightbox.classList.remove('open');
      img.src = '';
    }
    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });
    document.querySelectorAll('img.project-image, .hero-image').forEach(image => {
      image.style.cursor = 'zoom-in';
      image.addEventListener('click', () => open(image.src));
    });
  }
  window.addEventListener('DOMContentLoaded', createLightbox);

  // Skills progress bar animation
  function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
      const percentage = bar.getAttribute('data-percentage');
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        setTimeout(() => {
          bar.style.width = percentage + '%';
        }, 200);
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  window.addEventListener('DOMContentLoaded', animateSkills);

  // Back to top button
  function handleBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }
  window.addEventListener('scroll', handleBackToTop);
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Lightbox for design images (designs.html)
  const designLightbox = document.getElementById('design-lightbox');
  if (designLightbox) {
    const designLightboxImg = designLightbox.querySelector('img');
    const designLightboxClose = designLightbox.querySelector('.lightbox-close');
    document.querySelectorAll('.design-card img').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        designLightboxImg.src = img.src;
        designLightbox.classList.add('active');
      });
    });
    designLightboxClose.addEventListener('click', () => {
      designLightbox.classList.remove('active');
      designLightboxImg.src = '';
    });
    designLightbox.addEventListener('click', e => {
      if (e.target === designLightbox) {
        designLightbox.classList.remove('active');
        designLightboxImg.src = '';
      }
    });
  }
});