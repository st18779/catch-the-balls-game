// בחירת כניסה \הרשמה
const login = document.getElementById('login');
const register = document.getElementById('register');
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');

login.addEventListener('click', () => {
    formLogin.classList.add('active');
    formRegister.classList.remove('active');
    login.classList.add('active');
    register.classList.remove('active');
    login.style.color = "white";
    register.style.color = "#df70d2";
});

register.addEventListener('click', () => {
    formRegister.classList.add('active');
    formLogin.classList.remove('active');
    register.classList.add('active');
    login.classList.remove('active');
    register.style.color = "white";
    login.style.color = "#df70d2";
});

// --- כניסה ---
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const storedUser = JSON.parse(localStorage.getItem(loginUsername)); 

    if (storedUser && storedUser.password === loginPassword) {
        sessionStorage.setItem('currentUserEmail', loginUsername);
        window.location.href = 'home.html';
        alert("התחברת בהצלחה!!");
    } else {
        alert('המשתמש לא קיים במערכת, אנא הירשם או בדוק את האימייל/סיסמה');
    }
});

// --- הרשמה ---
formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('registerFirstName').value;
    const lastName = document.getElementById('registerLastName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const checkPass = document.getElementById('registerCheckPass').value;

    if (password === checkPass) {
        const user = {
            firstName: firstName,
            lastName: lastName,
            password: password,
            highScore: 0
        };

        localStorage.setItem(email, JSON.stringify(user));
        sessionStorage.setItem('currentUserEmail', email);
        alert('ההרשמה בוצעה בהצלחה!');
        window.location.href = 'home.html';
    } else {
        alert('יש לכתוב סיסמא זהה');
    }
});