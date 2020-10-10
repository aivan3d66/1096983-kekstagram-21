'use strict';

(function () {
  const uploadForm = document.querySelector(`#upload-select-image`);
  const uploadFileInput = uploadForm.querySelector(`#upload-file`);
  const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
  const editForm = uploadForm.querySelector(`.img-upload__overlay`);
  const imgPreview = uploadForm.querySelector(`.img-upload__preview img`);
  const textHashtags = uploadForm.querySelector(`.text__hashtags`);
  const comment = uploadForm.querySelector(`.text__description`);

  function previewEscKeydownHandler(evt) {
    if (window.isEscButton(evt.key) && document.activeElement !== textHashtags && document.activeElement !== comment) {
      window.validation.textHashtagInput.value = ``;
      closeEditForm();
    }
  }

  function openEditForm() {
    document.body.classList.add(`modal-open`);
    editForm.classList.remove(`hidden`);
    window.slider.node.classList.add(`hidden`);
    window.setScaleValue();
    textHashtags.addEventListener(`input`, window.validation.textHashtag);
    uploadForm.addEventListener(`submit`, window.validation.formSubmit);
    document.addEventListener(`keydown`, previewEscKeydownHandler);
  }

  function closeEditForm() {
    uploadFileInput.value = ``;
    document.body.classList.remove(`modal-open`);
    editForm.classList.add(`hidden`);
    window.slider.setValue();
    imgPreview.removeAttribute(`style`);
    textHashtags.removeEventListener(`input`, window.validation.textHashtag);
    uploadForm.removeEventListener(`submit`, window.validation.formSubmit);
    document.removeEventListener(`keydown`, previewEscKeydownHandler);
  }

  uploadFileInput.addEventListener(`change`, () => {
    document.body.classList.add(`modal-open`);
    editForm.classList.remove(`hidden`);
  });

  uploadFileInput.addEventListener(`change`, () => {
    const imgFile = uploadFileInput.files[0];
    const imgReader = new FileReader();

    imgReader.onloadend = () => {
      imgPreview.src = imgReader.result;
      openEditForm();
    };

    if (imgFile) {
      imgReader.readAsDataURL(imgFile);
    }
  });

  uploadCancel.addEventListener(`click`, closeEditForm);

  window.preview = {
    img: imgPreview,
    hashtagsInput: textHashtags,
    descriptionTextarea: comment
  };
})();
