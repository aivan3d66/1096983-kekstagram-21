'use strict';

(function () {
  const MAX_TAG_COUNT = 5;
  const MIN_TAG_LENGTH = 4;
  const MAX_TAG_LENGTH = 19;

  const uploadForm = document.querySelector(`#upload-select-image`);
  const textHashtags = uploadForm.querySelector(`.text__hashtags`);

  const startWithHash = (hashes) => {
    return hashes.every((hash) => hash.startsWith(`#`));
  };

  const checkRegEx = (hashes) => {
    const regEx = RegExp(`^(#[а-яА-ЯёЁa-zA-Z0-9]+,? *)*#[а-яА-ЯёЁa-zA-Z0-9]{${MIN_TAG_LENGTH},${MAX_TAG_LENGTH}$`);
    return hashes.every((hash) => regEx.test(hash));
  };

  const checkDuplicatesAbsence = (hashes) => {
    return hashes.length === new Set(hashes.map((el) => el.toUpperCase())).size;
  };

  const checkTagMaxCount = (hashes) => {
    return hashes.length <= MAX_TAG_COUNT;
  };

  const checkHashTags = () => {
    const hashInputValue = textHashtags.value.trim();
    const hashes = hashInputValue.split(` `).filter((el) => el.length);
    const tagValid = (startWithHash(hashes) && checkRegEx(hashes) && checkDuplicatesAbsence(hashes) && checkTagMaxCount(hashes));
    return !hashInputValue.length || tagValid;
  };

  const onTextHashtagsInput = () => {
    if (!checkHashTags()) {
      textHashtags.setCustomValidity(`Хэш-тег не прошёл валидацию`);
    } else {
      textHashtags.setCustomValidity(``);
    }
  };

  const onUploadFormSubmit = (evt) => {
    if (!textHashtags.validity.valid) {
      evt.preventDefault();
    }
  };

  window.validation = {
    textHashtag: onTextHashtagsInput,
    formSubmit: onUploadFormSubmit
  };
})();
