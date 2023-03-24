    const buttonElement = document.getElementById("write-btn");
    const nameInputElement = document.getElementById("nameEl");
    const textInputElement = document.getElementById("textEl");
    const listElement = document.getElementById("list");
    const delButtonElement = document.getElementById("del-btn");
    const answerAreaElement = document.getElementById("answer-area-form");
    let answer = "";

    let comments = [];

    const fetchPromise = fetch("https://webdev-hw-api.vercel.app/api/v1/vladislav-zhalin/comments", {
        method: "GET" 
    });

    fetchPromise.then((response) => {
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
        response.json().then((responseData) => {
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

      
        });



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
    


/*    textInputElement.addEventListener("keyup", (e) => {
      if(e.code === 'Enter') {
        enter();
      }
    })

    nameInputElement.addEventListener("keyup", (a,e) => {
      if(e.code === 'Enter') {
        enter();
      }
    })*/




      buttonElement.addEventListener("click", () => {
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

        fetch("https://webdev-hw-api.vercel.app/api/v1/vladislav-zhalin/comments", {
            method: "POST",
            body: JSON.stringify({
                text: textInputElement.value,
                name: nameInputElement.value,
                date: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`,
                likes: 0,
                isLiked: false,
            })
        }).then(() => {
          fetch("https://webdev-hw-api.vercel.app/api/v1/vladislav-zhalin/comments", {
            method: "GET",
          }).then((responseData) => {
            comments = responseData.comments;
            
          });
          rendercomments();
          
          nameInputElement.value = "";
          textInputElement.value = "";
        })
          

        });


/*    buttonElement.addEventListener("click", enter);

    function enter() {

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
        minute: '2-digit'
      }
      
      nameInputElement.classList.remove("error");
      textInputElement.classList.remove("error");

      if (nameInputElement.value === "" && textInputElement.value === "") {
        nameInputElement.classList.add("error");
        textInputElement.classList.add("error");
        return;
      } else if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
      } else if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
      }

      comments.push({
        name: nameInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        time: `${userDate.toLocaleDateString(locale, dateFormat)} ${userDate.toLocaleTimeString(locale, timeFormat)}`,
        comm: textInputElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),
        like: 0,
        ans: answer,
        userLike: false,
        color: "like-button",
        isEdit: false,
      })

      rendercomments();
      initEventListeners();

      nameInputElement.value = "";
      textInputElement.value = "";
      buttonElement.disabled = true;
      answer = "";
      answerAreaElement.value = "";
      answerAreaElement.hidden = true;

    }


    console.log("It works!");  */