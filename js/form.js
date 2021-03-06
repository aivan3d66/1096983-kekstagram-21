'use strict';

const TIMEOUT_VALUE = 5000;
const submitButtonNode = document.querySelector(`.img-upload__submit`);

submitButtonNode.addEventListener(`click`, (evt) => {
  if (window.preview.form.checkValidity()) {
    evt.preventDefault();

    const formData = new FormData(window.preview.form);

    window.preview.close();
    window.backend.upload(
        formData,
        window.modal.uploadSuccess,
        window.modal.uploadError
    );
  } else {
    window.preview.hashtagsInput.classList.add(`invalid-input`);

    setTimeout(() => {
      window.preview.hashtagsInput.classList.remove(`invalid-input`);
    }, TIMEOUT_VALUE);
  }
});
