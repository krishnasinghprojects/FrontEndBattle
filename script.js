document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const counterElement = document.getElementById('counter');
    const centerLoaderContainer = document.getElementById('center-loader-container');
    const loaderOverlay = document.getElementById('loader-overlay');
    const lShapeV = document.getElementById('l-shape-vertical');
    const lShapeH = document.getElementById('l-shape-horizontal');

    let progress = 0;
    const loadingDuration = 2000; // 2 seconds
    const intervalTime = loadingDuration / 100;

    const loadingInterval = setInterval(() => {
        progress += 1;
        if (progress <= 100) {
            // *** CHANGE THIS LINE ***
            progressBar.style.width = progress + '%'; // Changed from height to width
            counterElement.textContent = progress;
        }

        if (progress >= 100) {
            clearInterval(loadingInterval);
            startTransition();
        }
    }, intervalTime);

    function startTransition() {
        // Phase 1: Fade out the center loader and counter.
        setTimeout(() => {
            centerLoaderContainer.style.opacity = '0';
            counterElement.style.opacity = '0';

            // Phase 2: Start drawing the L-shape from the corner.
            // This happens right after the center loader starts fading.
            lShapeV.style.opacity = '1';
            lShapeH.style.opacity = '1';
            lShapeV.style.height = '100vh';
            lShapeH.style.width = '100vw';
        }, 100);

        // Phase 3: Trigger the final zoom-in animation.
        // This is timed to start after the L-shape has finished drawing (500ms transition + 100ms buffer).
        setTimeout(() => {
            document.body.classList.add('loading-done');
        }, 600);

        // Phase 4: Clean up the loader from the DOM after all animations are finished.
        setTimeout(() => {
            if (loaderOverlay) {
                loaderOverlay.style.display = 'none';
            }
        }, 2000); // Should be longer than all combined animations.
    }
});


document.addEventListener('DOMContentLoaded', () => {

    // --- Theme Toggler ---
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        body.classList.replace('light-theme', 'dark-theme');
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        }
    });


    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navbarMenu = document.getElementById('navbarMenu');

    mobileMenuToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.navbar-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navbarMenu.classList.contains('active')) {
                navbarMenu.classList.remove('active');
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const logoWrappers = document.querySelectorAll('.customer-logo-wrapper');

    logoWrappers.forEach(wrapper => {
        const images = wrapper.querySelectorAll('img');
        let currentImageIndex = 0;

        // Initially show the first image
        images[currentImageIndex].classList.add('active');

        setInterval(() => {
            // Step 1: Fade out the current image
            images[currentImageIndex].classList.remove('active');

            // Step 2: After the fade-out transition, switch to the next image and fade it in
            // The timeout duration should match the CSS transition duration for opacity (1s here)
            setTimeout(() => {
                currentImageIndex = (currentImageIndex + 1) % images.length;
                images[currentImageIndex].classList.add('active');
            }, 1000); // This delay must match the 'transition: opacity 1s' in CSS
        }, 3000); // Total cycle time: 3 seconds (1s fade out, 1s fade in, 1s static)
    });
});





document.addEventListener('DOMContentLoaded', () => {
    const rippleBox = document.querySelector('.ripple-box-container');
    const rippleAnimationDuration = 2500;
    const rippleCreationDelay = 80;

    let lastRippleTime = 0;

    rippleBox.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();

        if (currentTime - lastRippleTime < rippleCreationDelay) {
            return;
        }
        lastRippleTime = currentTime;

        const rect = rippleBox.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('div');
        ripple.classList.add('ripple-effect');
        rippleBox.appendChild(ripple);

        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => {
            ripple.remove();
        }, rippleAnimationDuration);
    });

    rippleBox.addEventListener('mouseleave', () => {
        const activeRipples = rippleBox.querySelectorAll('.ripple-effect');
        activeRipples.forEach(ripple => {
            ripple.style.animation = 'none';
            void ripple.offsetWidth;
            ripple.style.animation = `ripple-fast-disappear 0.5s ease-out forwards`;

            setTimeout(() => {
                ripple.remove();
            }, 500);
        });
    });

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        @keyframes ripple-fast-disappear {
            from {
                opacity: inherit;
                transform: inherit;
            }
            to {
                opacity: 0;
                transform: scale(0.01);
            }
        }
    `;
    document.head.appendChild(styleSheet);
});





document.addEventListener('DOMContentLoaded', function() {
    const parallexBox = document.getElementById('parallex-box');
    const parallaxWrapper = document.getElementById('parallax-wrapper');
    const parallaxText = document.getElementById('parallax-text');

    // Ensure elements exist before adding event listener
    if (parallexBox && parallaxWrapper && parallaxText) {
        
        const handleScroll = () => {
            const boxTop = parallexBox.offsetTop;
            const boxHeight = parallexBox.offsetHeight;
            const scrollTop = window.pageYOffset;
            const windowHeight = window.innerHeight;

            // Check if the parallex-box is within the viewport
            if (scrollTop + windowHeight > boxTop && scrollTop < boxTop + boxHeight) {
                
                // Calculate scroll position relative to the top of the box
                const scrollInsideBox = scrollTop - boxTop;
                
                const parallaxFactorImage = 0.3;
                const parallaxFactorText = 0.5;

                // Move image down
                parallaxWrapper.style.backgroundPositionY = (scrollInsideBox * parallaxFactorImage) + 'px';
                
                // Move text up
                parallaxText.style.transform = `translate(-50%, calc(-50% - ${scrollInsideBox * parallaxFactorText}px))`;
            
            }
        };

        window.addEventListener('scroll', handleScroll);
    }
});









document.addEventListener('DOMContentLoaded', () => {
    // Select the main component container
    const workShowcase = document.querySelector('.work-showcase');

    // If the component doesn't exist on the page, do nothing.
    if (!workShowcase) {
        return;
    }

    const textItems = workShowcase.querySelectorAll('.showcase-item');
    const imageItems = workShowcase.querySelectorAll('.showcase-image');
    const numberSlide = workShowcase.querySelector('.number-slide');
    const progressBar = workShowcase.querySelector('.scroll-progress-bar');
    
    const totalItems = textItems.length;
    const itemHeight = workShowcase.querySelector('.showcase-number').clientHeight;
    let currentItem = 0;
    
    // Function to update the active slide
    function setActiveItem(index) {
        // Update text content
        textItems.forEach(item => item.classList.remove('active'));
        textItems[index].classList.add('active');
        
        // Update image
        imageItems.forEach(item => item.classList.remove('active'));
        imageItems[index].classList.add('active');

        // Update background number
        numberSlide.style.transform = `translateY(-${index * itemHeight}px)`;

        // Update progress bar
        const progress = (index / (totalItems - 1)) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Main scroll handler function
    function handleScroll(e) {
        // Prevent the main page from scrolling while interacting with the div
        e.preventDefault();
        
        const delta = e.deltaY;
        
        // Move to the next or previous item based on scroll direction
        if (delta > 0) {
            currentItem = (currentItem + 1) % totalItems;
        } else {
            currentItem = (currentItem - 1 + totalItems) % totalItems;
        }
        
        setActiveItem(currentItem);
    }

    // --- Event Listener Logic ---
    let isThrottled = false;
    const throttleDuration = 1000; // 1 second between scrolls

    // Attach the wheel event listener directly to the showcase container
    workShowcase.addEventListener('wheel', (e) => {
        if (isThrottled) return; // If throttled, do nothing
        isThrottled = true;
        handleScroll(e);
        setTimeout(() => {
            isThrottled = false; // Release the throttle after the duration
        }, throttleDuration);
    }, { passive: false }); // passive:false is needed for preventDefault() to work

    // Initialize the first item as active
    setActiveItem(0);
});