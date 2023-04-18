// import { comments } from "./api.js";
// import { blockButton } from "./script.js";
// import { fetchAndRender } from "./api.js";
// import { handlePostClick } from "./api.js";
// const listElement = document.getElementById("list");
// export const rendercomments = () => {
//     const appEl = document.getElementById("app");

//     const commentsHtml  = comments.map((comment, index) => {

//         return ` <li class="comment" >
//         <div class="comment-header">
//             <div>${comment.name}</div>
//             <div>${comment.date}</div>
//           </div>
//           <div class="comment-body">
//             <div id="com-txt-el" class="comment-text">
//               ${comment.text}
//             </div>
//           </div>
//           <div class="comment-footer">
  
//             <div class="likes">
//               <span class="likes-counter">${comment.likes}</span>
//               <button class="${comment.isLiked ? `like-button -active-like` : `like-button`}" data-index="${index}"></button>
//             </div>
//           </div>
//       </li>`;}).join("");

//     const appHtml =  `    
//         <div class="login">
//             <div class="login__content">
//             <p class="login__content_title">Авторизация</p>
//             <span class="login__content_logpas">Логин</span><input class="login__content_imput" type="text">
//             <br>
//             <span class="login__content_logpas">Пароль</span><input class="login__content_imput" type="password" >
//             <button class="login__content_btnlog">Войти</button>
//             <button class="login__content_btnreg">Зарегистрироваться</button>
//             </div>
//         </div>
//         <div class="registration">
//             <div class="registration__content">
//             <p class="registration__content_title">Регистрация</p>
//             <span class="registration__content_logpas">Имя</span><input class="registration__content_imput" type="text">
//             <br>
//             <span class="registration__content_logpas">Логин</span><input class="registration__content_imput" type="text">
//             <br>
//             <span class="registration__content_logpas">Пароль</span><input class="registration__content_imput" type="password" >
//             <button class="registration__content_btnlog">Зарегистрироваться</button>
//             <button class="registration__content_btnreg">Войти</button>
//             </div>
//         </div>
//         <div class="container">
//             <li hidden id="start-loader" class="all-add">
//             Пожалуйста подождите, комментарии загружаются...
//             </li>
//             <ul id="list" class="comments">
//             <!-- render -->
//             ${commentsHtml}
//             </ul>
//             <div class="add-form">
//             <p hidden id="block-text" class="text-add-comm">Комментарий добаляется...</p>
//             <input 
//                 id="nameEl"
//                 type="text"
//                 class="add-form-name"
//                 placeholder="Введите ваше имя"
//             />
//             <textarea id="answer-area-form" type="textarea" class="answer-area" rows="3" readonly hidden></textarea>
//             <textarea
//                 id="textEl"
//                 type="textarea"
//                 class="add-form-text"
//                 placeholder="Введите ваш коментарий"
//                 rows="4"
//             ></textarea>
//             <div class="add-form-row">
//                 <button id="write-btn" class="add-form-button" disabled>Написать</button>
//             </div>
//             </div>
//         </div>`

//     appEl.innerHTML = appHtml;

//     const nameInputElement = document.getElementById("nameEl");
//     const textInputElement = document.getElementById("textEl");
//     const buttonElement = document.getElementById("write-btn");
//     const loaderElement = document.getElementById("start-loader");

//     loaderElement.hidden = false;
//     fetchAndRender().then(() => {
//       loaderElement.hidden = true;
//     });

//     const validateInput = () => {
//         if (nameInputElement.value !== "" && textInputElement.value !== "") {
//           buttonElement.disabled = false;
//         } else {
//           buttonElement.disabled = true;
//         }
//     }

//     buttonElement.addEventListener("click", handlePostClick);

//     validateInput();
//     const initEventListeners = () => {
//         const likeButtonElements = document.querySelectorAll(".like-button");
  
//         for ( const likeButtonElement of likeButtonElements) {
//           const index = +(likeButtonElement.dataset.index);
//           likeButtonElement.addEventListener("click", () => {
//             if (comments[index].isLiked === false) {
//               comments[index].isLiked = true;
//               comments[index].likes += 1;
              
//             } else {
//               comments[index].isLiked = false;
//               comments[index].likes -= 1;
//             } 
//             rendercomments();
//           })
//         }
//       }
//     initEventListeners();
//     blockButton();
//     return 1;
//   }
