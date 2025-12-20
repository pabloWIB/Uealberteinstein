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
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeThankYouModal() {
    const modal = document.getElementById('thankYouModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('.btn-submit');
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    const modal = document.getElementById('thankYouModal');
    const modalOverlay = modal.querySelector('.modal-overlay');
    const modalClose = modal.querySelector('.modal-close');

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        submitButton.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';

        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            this
        )
            .then(function () {
                submitButton.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';

                contactForm.reset();
                openThankYouModal();
            })
            .catch(function (error) {
                    alert('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.');

                submitButton.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            });
    });

    modalOverlay.addEventListener('click', closeThankYouModal);
    modalClose.addEventListener('click', closeThankYouModal);

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
            closeThankYouModal();
        }
    });
});
