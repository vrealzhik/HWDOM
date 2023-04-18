import { loginUser, regUser } from "./api.js";
export function renderLoginComponent ({ appEl, setToken, nameForForm, fetchAndRender }) {
    let isloginMode = true;

    const renderForm = () => {
        const appHtml = `   
        <div class="login">
            <div class="login__content">
            <p class="login__content_title">${isloginMode ? "Авторизация" : "Регистрация"}</p>
            <span class="login__content_logpas">Логин</span><input id="login-imput" class="login__content_imput" type="text">
            <br>
            <span class="login__content_logpas">Пароль</span><input id="password-imput" class="login__content_imput" type="password" >
            <br>
            ${isloginMode ? "" : `<span class="login__content_logpas">Имя</span><input id="name-imput" class="login__content_imput" type="text" >`}
            <button id="loginBtn" class="login__content_btnlog">${isloginMode ? "Войти" : "Зарегистрироваться"}</button>
            <button id="toggleBtn" class="login__content_btnreg">${isloginMode ? "Перейти к регистрации" : "Перейти ко входу"}</button>
            </div>
        </div>`;
        appEl.innerHTML = appHtml;

        document.getElementById('loginBtn').addEventListener("click", () => {
            if(isloginMode) {
                const login = document.getElementById("login-imput").value;
                const password = document.getElementById("password-imput").value;

                if(!login) {
                    alert('Введите логин');
                    return;
                }
    
                if(!password) {
                    alert('Введите пароль');
                    return;
                }
    
                loginUser({
                    login: login,
                    password: password
                })
                .then((user) => {
                    console.log(user);
                    console.log(user.user.name)
                    nameForForm(user.user.name);
                    setToken(`Bearer ${user.user.token}`);
                    fetchAndRender();
                }) 
                .catch((error) => {
                    alert(error.message);
                })
            } else {
                const login = document.getElementById("login-imput").value;
                const password = document.getElementById("password-imput").value;
                const name = document.getElementById("name-imput").value;
    
                if(!login) {
                    alert('Введите логин');
                    return;
                }
                if(!password) {
                    alert('Введите пароль');
                    return;
                }
                if(!name) {
                    alert('Введите имя');
                    return;
                }

                regUser({
                    login: login,
                    password: password,
                    name: name,
                })
                .then((user) => {
                    console.log(user);
                    nameForForm(user.user.name);
                    setToken(`Bearer ${user.user.token}`);
                    fetchAndRender();
                }) 
                .catch((error) => {
                    alert(error.message);
                })
            }
        })

        document.getElementById('toggleBtn').addEventListener("click", () => {
            isloginMode = !isloginMode;
            renderForm();
        })
    }
    renderForm();
}