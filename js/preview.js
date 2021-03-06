'use strict';

const uploadForm = document.querySelector(`#upload-select-image`);
const uploadFileInput = uploadForm.querySelector(`#upload-file`);
const uploadCancel = uploadForm.querySelector(`#upload-cancel`);
const editForm = uploadForm.querySelector(`.img-upload__overlay`);
const imgPreview = uploadForm.querySelector(`.img-upload__preview img`);
const textHashtags = uploadForm.querySelector(`.text__hashtags`);
const comment = uploadForm.querySelector(`.text__description`);
const previewForm = document.querySelector(`.img-upload__form`);

const previewEscKeydownHandler = function (evt) {
  if (window.utils.isEscButton(evt.key) && document.activeElement !== textHashtags && document.activeElement !== comment) {
    textHashtags.value = ``;
    closeEditForm();
  }
};

const openEditForm = function () {
  document.body.classList.add(`modal-open`);
  editForm.classList.remove(`hidden`);
  window.slider.node.classList.add(`hidden`);
  window.setScaleValue();
  document.addEventListener(`keydown`, previewEscKeydownHandler);
};

const closeEditForm = function () {
  uploadFileInput.value = ``;
  document.body.classList.remove(`modal-open`);
  editForm.classList.add(`hidden`);
  window.slider.setValue();
  imgPreview.removeAttribute(`style`);
  document.removeEventListener(`keydown`, previewEscKeydownHandler);
};

uploadFileInput.addEventListener(`change`, () => {
  document.body.classList.add(`modal-open`);
  editForm.classList.remove(`hidden`);
});

uploadFileInput.addEventListener(`change`, () => {
  const imgFile = uploadFileInput.files[0];
  const imgReader = new FileReader();
  textHashtags.value = ``;
  comment.value = ``;

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
  close: closeEditForm,
  form: previewForm,
  img: imgPreview,
  hashtagsInput: textHashtags,
  descriptionTextarea: comment
};
