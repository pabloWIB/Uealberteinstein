function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('active');
}

document.addEventListener('click', function (event) {
    const menu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');

    if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
        menu.classList.remove('active');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const menu = document.getElementById('mobileMenu');
            menu.classList.remove('active');

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const EMAILJS_CONFIG = {
    SERVICE_ID: 'ID',
    TEMPLATE_ID: 'ID',
    PUBLIC_KEY: 'KEY'
};

(function () {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

function openThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const contactFormHome = document.getElementById('contactFormHome');

    if (!contactFormHome) return;

    const submitButton = contactFormHome.querySelector('button[type="submit"]');
    if (!submitButton) return;

    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const modal = document.getElementById('thankYouModal');

    contactFormHome.addEventListener('submit', function (event) {
        event.preventDefault();

        submitButton.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';

        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            this
        )
            .then(function () {
                submitButton.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';

                contactFormHome.reset();

                openThankYouModal();
            })
            .catch(function (error) {
                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');

                submitButton.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
            });
    });

    if (modal) {
        const modalOverlay = modal.querySelector('.modal-overlay');
        const modalClose = modal.querySelector('.modal-close');

        if (modalOverlay) {
            modalOverlay.addEventListener('click', closeThankYouModal);
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeThankYouModal);
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('active')) {
                closeThankYouModal();
            }
        });
    }
});