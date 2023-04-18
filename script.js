import { getcomment, postcomment } from "./api.js";
import { renderLoginComponent } from "./login-component.js";

let comments = [];

const fetchAndRender = () => {
return getcomment()
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
 renderApp();
});
}

let token = null;
let nameForFormText = null;

const renderApp = () => {
    const appEl = document.getElementById("app");  

    const commentsHtml  = comments.map((comment, index) => {
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
            <button class="${comment.isLiked ? `like-button -active-like` : `like-button`}" data-index="${index}"></button>
            </div>
        </div>
        </li>`;}).join("");

    const appHtml = `   
        <div class="container">
        <li hidden id="start-loader" class="all-add">
            Пожалуйста подождите, комментарии загружаются...
        </li>
        <ul id="list" class="comments">
            <!-- render -->
            ${commentsHtml}
        </ul>
        ${token ?
        `<div class="add-form">
        <p hidden id="block-text" class="text-add-comm">Комментарий добаляется...</p>
        <input 
        id="nameEl"
        type="text"
        class="add-form-name"
        readonly
        value = "${nameForFormText}"
        />
        <textarea
        id="textEl"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
        ></textarea>
        <div class="add-form-row">
        <button id="write-btn" class="add-form-button" disabled>Написать</button>
        </div>
        </div>` 
        : 
        `<p><button id="startLoginBtn" class="startLogBtn">Авторизуйтесь</button>, чтобы добавить комментарий</p>` }

        </div>`

    appEl.innerHTML = appHtml;

    if(!token) {
        document.getElementById("startLoginBtn").addEventListener("click", () => {
            const appEl = document.getElementById("app"); 
            renderLoginComponent({
                appEl, 
                nameForForm: (newName) => {
                nameForFormText = newName;
                },
                setToken: (newToken) => {
                token = newToken;
                },
                fetchAndRender
            });
        })    
    }

    if(token) {

        const buttonElement = document.getElementById("write-btn");
        const nameInputElement = document.getElementById("nameEl");
        const textInputElement = document.getElementById("textEl");
        const textBlockElement = document.getElementById("block-text");
    
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
          
            postcomment( {
                token,
                text: textInputElement.value,
                name: nameInputElement.value,
                date: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`
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
    
        validateInput();
        initEventListeners();
        blockButton();
    }
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
     renderApp();
    })
  }
}
fetchAndRender();
initEventListeners();