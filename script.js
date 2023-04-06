    const buttonElement = document.getElementById("write-btn");
    const nameInputElement = document.getElementById("nameEl");
    const textInputElement = document.getElementById("textEl");
    const listElement = document.getElementById("list");
    const delButtonElement = document.getElementById("del-btn");
    const answerAreaElement = document.getElementById("answer-area-form");
    const textBlockElement = document.getElementById("block-text");
    const loaderElement = document.getElementById("start-loader");
    let answer = "";

    import { handlePostClick } from "./api.js";

    import { comments } from "./api.js";

    import { fetchAndRender } from "./api.js";

    import { rendercomments } from "./render.js";

    export  const initEventListeners = () => {
      const likeButtonElements = document.querySelectorAll(".like-button");

      for ( const likeButtonElement of likeButtonElements) {
        const index = +(likeButtonElement.dataset.index);
        likeButtonElement.addEventListener("click", () => {
          if (comments[index].isLiked === false) {
            comments[index].isLiked = true;
            comments[index].likes += 1;
            
          } else {
            comments[index].isLiked = false;
            comments[index].likes -= 1;
          } 
          rendercomments();
        })
      }
    }

    const validateInput = () => {
      if (nameInputElement.value !== "" && textInputElement.value !== "") {
        buttonElement.disabled = false;
      } else {
        buttonElement.disabled = true;
      }
    }

    export const blockButton = () => {
      
      document.querySelectorAll("#nameEl, #textEl").forEach((el) => {
        el.addEventListener("input", () => {
          validateInput();
        })
      })
    }

    validateInput();
    blockButton();
    rendercomments();
    initEventListeners();
    loaderElement.hidden = false;
    fetchAndRender().then(() => {
      loaderElement.hidden = true;
    });

    buttonElement.addEventListener("click", handlePostClick);