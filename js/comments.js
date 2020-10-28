'use strict';

(function () {
  const DEFAULT_COMMENTS_COUNT = 5;
  const commentsCountNode = document.querySelector(`.social__comment-count`);
  const commentsLoadButtonNode = document.querySelector(`.comments-loader`);
  const commentsContainerNode = document.querySelector(`.social__comments`);
  const commentTemplateNode = document.querySelector(`.social__comment`).cloneNode(true);
  let allComments;

  class Comments {
    constructor(comments) {
      this._arr = comments;
      this._length = comments.length;
      this._startCount = 0;
      this._endCount = 0;
      this._stringName = window.utils.getDeclension(this._length, [`комментария`, `комментариев`, `комментариев`]);
      this.isMax = false;
    }

    get currentString() {
      return this.isMax ? null : `${this._endCount} из <span class="comments-count">${this._length}</span> ${this._stringName}`;
    }

    get currentSlice() {
      return this.isMax ? null : this._arr.slice(this._startCount, this._endCount);
    }

    isLastStep() {
      return this._endCount === this._length;
    }

    increaseCount() {
      if (!this.isMax) {
        const newCount = this._endCount + DEFAULT_COMMENTS_COUNT > this._length ? this._length : this._endCount + DEFAULT_COMMENTS_COUNT;
        this._startCount = this._endCount;
        this._endCount = newCount;

        this.isMax = this._startCount === this._length;
      }

      return this.isMax;
    }
  }

  const getHtmlCommentsFragment = (comments) => {
    const fragment = document.createDocumentFragment();

    comments.forEach((comment) => {
      const commentElement = commentTemplateNode.cloneNode(true);

      commentElement.querySelector(`.social__picture`).src = comment.avatar;
      commentElement.querySelector(`.social__picture`).alt = comment.name;
      commentElement.querySelector(`.social__text`).textContent = comment.message;

      fragment.appendChild(commentElement);
    });

    return fragment;
  };

  const addComments = () => {
    if (!allComments.increaseCount()) {
      commentsCountNode.innerHTML = allComments.currentString;
      const fragment = getHtmlCommentsFragment(allComments.currentSlice);
      commentsContainerNode.appendChild(fragment);

      if (allComments.isLastStep()) {
        commentsLoadButtonNode.classList.add(`hidden`);
      }
    }
  };

  const setComments = (comments) => {
    allComments = new Comments(comments);

    commentsLoadButtonNode.classList.remove(`hidden`);
    commentsContainerNode.textContent = ``;
    addComments();
  };

  commentsLoadButtonNode.addEventListener(`click`, addComments);

  window.comments = {
    set: setComments
  };
})();
