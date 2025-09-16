document.addEventListener('DOMContentLoaded', () => {
    // --- Header Scroll Effect ---
    const mainHeader = document.querySelector('.main-header');
    
    const scrollThreshold = 150; 

    window.addEventListener('scroll', () => {
        if (window.scrollY > scrollThreshold) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Management ---
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuBtn = document.getElementById('close-menu');
    const mobileNavLinks = mobileMenu.querySelectorAll('.menu-nav-links a');

    navToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.classList.add('no-scroll');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
                mobileMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });

        link.addEventListener('mouseenter', () => {
            const bgImg = link.getAttribute('data-bg-img');
            if (bgImg) {
                mobileMenu.style.backgroundImage = `url(${bgImg})`;
            }
        });
        
        link.addEventListener('mouseleave', () => {
            mobileMenu.style.backgroundImage = 'none';
        });
    });

    // --- Booking Modal Management ---
    const bookingBtns = document.querySelectorAll('.booking-btn, .booking-btn-header, .booking-btn-menu');
    const bookingModal = document.getElementById('booking-modal');
    const closeModalBtn = document.getElementById('close-modal');

    bookingBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            bookingModal.classList.add('visible');
            document.body.classList.add('no-scroll');
        });
    });

    closeModalBtn.addEventListener('click', () => {
        bookingModal.classList.remove('visible');
        document.body.classList.remove('no-scroll');
    });

    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('visible');
            document.body.classList.remove('no-scroll');
        }
    });

    // --- Hero Carousel ---
    const heroImages = document.querySelectorAll('.hero-carousel-img');
    let currentImageIndex = 0;

    function showNextImage() {
        if (heroImages.length === 0) return;

        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    if (heroImages.length > 1) {
        setInterval(showNextImage, 6000);
    }

    // --- Form submission (example) ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Il tuo messaggio è stato inviato. Il nostro team ti contatterà a breve.');
            contactForm.reset();
        });
    }

    const modalBookingForm = document.getElementById('modal-booking-form');
    if (modalBookingForm) {
        modalBookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;

            if (checkIn && checkOut) {
                alert(`Verifica disponibilità per le date: ${checkIn} al ${checkOut}.`);
                bookingModal.classList.remove('visible');
                document.body.classList.remove('no-scroll');
                modalBookingForm.reset();
            } else {
                alert('Per favore, seleziona sia la data di arrivo che quella di partenza.');
            }
        });
    }

    // --- Intersection Observer per le animazioni al caricamento ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });
});