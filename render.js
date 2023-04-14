import { comments } from "./api.js";
import { initEventListeners } from "./script.js";
import { blockButton } from "./script.js";
const listElement = document.getElementById("list");
export const rendercomments = () => {
    const commentsHtml  = comments.map((comment, index) => {
      let color;
      if (comment.isLiked === false) {
        color = "like-button";
      } else {
        color = "like-button -active-like";
      }
      return ` <li class="comment" >
      <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div id="com-txt-el" class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">

          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${color}" data-index="${index}"></button>
          </div>
        </div>
    </li>`;}).join("");


    listElement.innerHTML = commentsHtml;
    initEventListeners();
    blockButton();
    return 1;
  }
