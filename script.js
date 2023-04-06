    const buttonElement = document.getElementById("write-btn");
    const nameInputElement = document.getElementById("nameEl");
    const textInputElement = document.getElementById("textEl");
    const listElement = document.getElementById("list");
    const delButtonElement = document.getElementById("del-btn");
    const answerAreaElement = document.getElementById("answer-area-form");
    const textBlockElement = document.getElementById("block-text");
    const loaderElement = document.getElementById("start-loader");
    let answer = "";

    let comments = [];

    const fetchAndRender = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/vladislav-zhalin/comments", {
        method: "GET" 
    })
    .then((response) => response.json())
    .then((responseData) => {
      let userDate = new Date();
      const locale = 'ru-RU';
      const dateFormat = {
        day: 'numeric', 
        month: 'numeric',
        year: '2-digit',
      }
      const timeFormat = {
        timezone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
      }
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment?.author?.name,
          date: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`,
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
          };
      });  
      comments = appComments;
      rendercomments();
    });
  }


    const rendercomments = () => {
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



    const initEventListeners = () => {
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

    const blockButton = () => {
      
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

    const handlePostClick = () => {

      let userDate = new Date();
      const locale = 'ru-RU';
      const dateFormat = {
        day: 'numeric', 
        month: 'numeric',
        year: '2-digit',

      }
      const timeFormat = {
        timezone: 'UTC',
        hour: 'numeric',
        minute: '2-digit',
      }


      textBlockElement.hidden = false;
      buttonElement.hidden = true;
      nameInputElement.hidden = true;
      textInputElement.hidden = true;


      fetch("https://webdev-hw-api.vercel.app/api/v1/vladislav-zhalin/comments", {
        method: "POST",
        body: JSON.stringify({
            text: textInputElement.value,
            name: nameInputElement.value,
            date: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`,
            likes: 0,
            isLiked: false,
            forceError: true,
        })
      })
      .then((response) => {
        if(response.status === 500) {
          //throw new Error("Сервер упал");
          return Promise.reject("Сервер упал")
        } else if(response.status === 400) {
          //throw new Error("Неправильный ввод");
          return Promise.reject("Неправильный ввод");
        } else {
          fetchAndRender();
        }
      })
      .then(() => {
        textBlockElement.hidden = true;
        buttonElement.hidden = false;
        nameInputElement.hidden = false;
        textInputElement.hidden = false;
        nameInputElement.value = "";
        textInputElement.value = "";
      })
      .catch((error) =>{
        textBlockElement.hidden = true;
        buttonElement.hidden = false;
        nameInputElement.hidden = false;
        textInputElement.hidden = false;
        console.log(error);
        if(error === "Сервер упал") {
          handlePostClick();
        } else if(error === "Неправильный ввод") {
          alert("Имя и комментарий должны быть не короче 3 символов")
        } else {
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      })
    }


    buttonElement.addEventListener("click", handlePostClick);