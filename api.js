const buttonElement = document.getElementById("write-btn");
const nameInputElement = document.getElementById("nameEl");
const textInputElement = document.getElementById("textEl");
const textBlockElement = document.getElementById("block-text");
import { rendercomments } from "./render.js";
export let comments = [];
export const fetchAndRender = () => {
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
      comments = responseData.comments.map((comment) => {
        return {
          name: comment?.author?.name,
          date: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`,
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
          };
      });  
      rendercomments();
    });
  }



export const handlePostClick = () => {

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
        forceError: false,
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

