
export function getcomment(token) {
  return fetch("https://webdev-hw-api.vercel.app/api/v2/vladislav-zhalin/comments", {
  method: "GET" ,
  headers: {
      Authorization: token,
  },
})
.then((response) => {
  if (response.status === 401) {
      console.log(1)
  }
  return response.json()
})
}

export function postcomment({token, text, name, date}) {
      return fetch("https://webdev-hw-api.vercel.app/api/v2/vladislav-zhalin/comments", {
      method: "POST",
      body: JSON.stringify({
          text,
          name,
          date,
          likes: 0,
          isLiked: false,
          forceError: false,
      }),
      headers: {
          Authorization: token, 
      },
    })
    
}

export function loginUser({login, password}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
  method: "POST",
  body: JSON.stringify({
      login,
      password,
  }),
}).then((response) => {
  if(response.status === 400) {
      throw new Error("Неверный логин или пароль")
  }
  return response.json();
})

}

export function regUser({login, password, name}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
  method: "POST",
  body: JSON.stringify({
      login,
      password,
      name,
  }),
}).then((response) => {
  if(response.status === 400) {
      throw new Error("Пользователь с таким логином уже существует")
  }
  return response.json();
})

}