// Loading Screen
window.addEventListener("load", () => {
    document.getElementById("loader").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("loader").style.display = "none";
    }, 500);
});

// Typing Animation Function
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '3px solid var(--acsentColor)';
    element.style.display = 'inline-block';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Blink cursor effect setelah selesai
            setInterval(() => {
                if (element.style.borderRight === 'none' || element.style.borderRight === '') {
                    element.style.borderRight = '3px solid var(--acsentColor)';
                } else {
                    element.style.borderRight = 'none';
                }
            }, 500);
        }
    }
    type();
}

// Welcome Modal Close
function closeWelcome() {
    document.getElementById("welcome").style.display = "none";
    document.getElementById("blur").style.display = "none";

    // Start typing animation untuk nama
    const typingElement = document.getElementById('typing-name');
    if (typingElement) {
        setTimeout(() => {
            typeWriter(typingElement, 'Mochamad  Tirta Bening', 100);
        }, 300);
    }
}

// Terminal Typing Animation
const terminalLines = [
    "Initializing portfolio system...",
    "Loading user interface...",
    "System ready!"
];
let terminalIndex = 0;
let charIndex = 0;

function typeTerminalLine() {
    const terminal = document.getElementById("terminal-anim");
    if (!terminal) return;
    if (terminalIndex < terminalLines.length) {
        if (charIndex < terminalLines[terminalIndex].length) {
            terminal.innerHTML += terminalLines[terminalIndex][charIndex];
            charIndex++;
            setTimeout(typeTerminalLine, 40);
        } else {
            terminal.innerHTML += "<br>";
            terminalIndex++;
            charIndex = 0;
            setTimeout(typeTerminalLine, 400);
        }
    }
}

window.addEventListener("DOMContentLoaded", typeTerminalLine);

// Section Navigation
function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(sectionId).style.display = "block";

    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
    });
    document.querySelector(`.nav-link[href='#${sectionId}']`).classList.add("active");
}

// Portfolio Tab Filtering
document.addEventListener('DOMContentLoaded', function() {
    const portfolioTabs = document.querySelectorAll('.portfolio-tab');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    portfolioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            portfolioTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');

            const category = this.getAttribute('data-category');

            portfolioItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Modal functionality
    const modal = document.getElementById('portfolio-modal');
    const modalImages = document.getElementById('modal-images');
    const closeBtn = document.querySelector('.close');
    let currentSlide = 0;
    let totalSlides = 0;
    let isPdfMode = false;

    function showSlide(n) {
        const slides = document.querySelectorAll('.carousel-slide');
        const indicators = document.querySelectorAll('.carousel-indicator');

        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;

        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        if (slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
            indicators[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }

    // Pastikan elemen modal ada sebelum menambahkan event listener
    if (modal && modalImages && closeBtn) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                const imagesAttr = this.getAttribute('data-images');
                const filesAttr = this.getAttribute('data-files');
                const mixedAttr = this.getAttribute('data-mixed');

                if (!imagesAttr && !filesAttr && !mixedAttr) return;

                modalImages.innerHTML = '';
                currentSlide = 0;
                isPdfMode = false;

                if (mixedAttr) {
                    // Handle mixed files (images and PDFs)
                    const mixedFiles = JSON.parse(mixedAttr);
                    totalSlides = mixedFiles.length;

                    const carouselContainer = document.createElement('div');
                    carouselContainer.className = 'carousel-container';

                    mixedFiles.forEach((src, index) => {
                        const slide = document.createElement('div');
                        slide.className = 'carousel-slide';
                        if (index === 0) slide.classList.add('active');

                        if (src.toLowerCase().endsWith('.pdf')) {
                            // PDF file
                            const embed = document.createElement('embed');
                            embed.src = src;
                            embed.type = 'application/pdf';
                            embed.width = '100%';
                            embed.height = '100%';
                            embed.style.border = '2px solid var(--acsentColor)';
                            embed.style.borderRadius = '5px';
                            slide.appendChild(embed);
                        } else {
                            // Image file
                            const img = document.createElement('img');
                            img.src = src;
                            img.alt = 'Portfolio Item';
                            slide.appendChild(img);
                        }

                        carouselContainer.appendChild(slide);
                    });

                    // Add navigation buttons
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'carousel-btn prev';
                    prevBtn.innerHTML = '&#10094;';
                    prevBtn.onclick = prevSlide;

                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'carousel-btn next';
                    nextBtn.innerHTML = '&#10095;';
                    nextBtn.onclick = nextSlide;

                    carouselContainer.appendChild(prevBtn);
                    carouselContainer.appendChild(nextBtn);

                    // Add indicators
                    const indicators = document.createElement('div');
                    indicators.className = 'carousel-indicators';
                    mixedFiles.forEach((_, index) => {
                        const indicator = document.createElement('div');
                        indicator.className = 'carousel-indicator';
                        if (index === 0) indicator.classList.add('active');
                        indicator.onclick = () => {
                            currentSlide = index;
                            showSlide(currentSlide);
                        };
                        indicators.appendChild(indicator);
                    });
                    carouselContainer.appendChild(indicators);

                    modalImages.appendChild(carouselContainer);
                } else if (filesAttr) {
                    // Handle PDF files
                    isPdfMode = true;
                    const files = JSON.parse(filesAttr);
                    totalSlides = files.length;

                    if (files.length === 1) {
                        // Single PDF - embed directly
                        const embed = document.createElement('embed');
                        embed.src = files[0];
                        embed.type = 'application/pdf';
                        embed.width = '100%';
                        embed.height = '100%';
                        embed.style.border = '2px solid var(--acsentColor)';
                        embed.style.borderRadius = '5px';
                        modalImages.appendChild(embed);
                    } else {
                        // Multiple PDFs - create carousel
                        const carouselContainer = document.createElement('div');
                        carouselContainer.className = 'carousel-container';

                        files.forEach((src, index) => {
                            const slide = document.createElement('div');
                            slide.className = 'carousel-slide';
                            if (index === 0) slide.classList.add('active');

                            const embed = document.createElement('embed');
                            embed.src = src;
                            embed.type = 'application/pdf';
                            embed.width = '100%';
                            embed.height = '100%';
                            embed.style.border = '2px solid var(--acsentColor)';
                            embed.style.borderRadius = '5px';

                            slide.appendChild(embed);
                            carouselContainer.appendChild(slide);
                        });

                        // Add navigation buttons
                        const prevBtn = document.createElement('button');
                        prevBtn.className = 'carousel-btn prev';
                        prevBtn.innerHTML = '&#10094;';
                        prevBtn.onclick = prevSlide;

                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'carousel-btn next';
                        nextBtn.innerHTML = '&#10095;';
                        nextBtn.onclick = nextSlide;

                        carouselContainer.appendChild(prevBtn);
                        carouselContainer.appendChild(nextBtn);

                        // Add indicators
                        const indicators = document.createElement('div');
                        indicators.className = 'carousel-indicators';
                        files.forEach((_, index) => {
                            const indicator = document.createElement('div');
                            indicator.className = 'carousel-indicator';
                            if (index === 0) indicator.classList.add('active');
                            indicator.onclick = () => {
                                currentSlide = index;
                                showSlide(currentSlide);
                            };
                            indicators.appendChild(indicator);
                        });
                        carouselContainer.appendChild(indicators);

                        modalImages.appendChild(carouselContainer);
                    }
                } else if (imagesAttr) {
                    // Handle images (existing logic)
                    const images = JSON.parse(imagesAttr);
                    totalSlides = images.length;

                    // Create carousel structure
                    const carouselContainer = document.createElement('div');
                    carouselContainer.className = 'carousel-container';

                    // Create slides
                    images.forEach((src, index) => {
                        const slide = document.createElement('div');
                        slide.className = 'carousel-slide';
                        if (index === 0) slide.classList.add('active');

                        const img = document.createElement('img');
                        img.src = src;
                        img.alt = 'Portfolio Image';

                        slide.appendChild(img);
                        carouselContainer.appendChild(slide);
                    });

                    // Add navigation buttons if more than one image
                    if (images.length > 1) {
                        const prevBtn = document.createElement('button');
                        prevBtn.className = 'carousel-btn prev';
                        prevBtn.innerHTML = '&#10094;';
                        prevBtn.onclick = prevSlide;

                        const nextBtn = document.createElement('button');
                        nextBtn.className = 'carousel-btn next';
                        nextBtn.innerHTML = '&#10095;';
                        nextBtn.onclick = nextSlide;

                        carouselContainer.appendChild(prevBtn);
                        carouselContainer.appendChild(nextBtn);

                        // Add indicators
                        const indicators = document.createElement('div');
                        indicators.className = 'carousel-indicators';
                        images.forEach((_, index) => {
                            const indicator = document.createElement('div');
                            indicator.className = 'carousel-indicator';
                            if (index === 0) indicator.classList.add('active');
                            indicator.onclick = () => {
                                currentSlide = index;
                                showSlide(currentSlide);
                            };
                            indicators.appendChild(indicator);
                        });
                        carouselContainer.appendChild(indicators);
                    }

                    modalImages.appendChild(carouselContainer);
                }

                modal.style.display = 'block';
            });
        });

        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            isPdfMode = false;
        });

        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                isPdfMode = false;
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(event) {
            if (modal.style.display === 'block') {
                if (event.key === 'ArrowLeft') prevSlide();
                if (event.key === 'ArrowRight') nextSlide();
                if (event.key === 'Escape') {
                    modal.style.display = 'none';
                    isPdfMode = false;
                }
            }
        });
    }
});

// clear a form after submission
window.onbeforeunload = () => {
  for(const form of document.getElementsByTagName('form')) {
    form.reset();
  }
}
