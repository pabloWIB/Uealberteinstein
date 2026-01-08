// assets/js/contacto/script.js

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
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) {
        return;
    }

    const submitButton = contactForm.querySelector('.btn-submit');

    if (!submitButton) {
        return;
    }

    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const modal = document.getElementById('thankYouModal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        submitButton.disabled = true;
        if (btnText) btnText.style.display = 'none';
        if (btnLoading) btnLoading.style.display = 'inline';

        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            this
        )
            .then(function (response) {

                submitButton.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';

                contactForm.reset();

                openThankYouModal();
            })
            .catch(function (error) {

                alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.\n\nError: ' + (error.text || error.message || 'Desconocido'));

                submitButton.disabled = false;
                if (btnText) btnText.style.display = 'inline';
                if (btnLoading) btnLoading.style.display = 'none';
            });
    });

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeThankYouModal);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeThankYouModal);
    }

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal?.classList.contains('active')) {
            closeThankYouModal();
        }
    });
});