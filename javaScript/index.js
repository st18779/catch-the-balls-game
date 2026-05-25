// בחירת כניסה / הרשמה
const login = document.getElementById('login');
const register = document.getElementById('register');
const formLogin = document.getElementById('formLogin');
const formRegister = document.getElementById('formRegister');

function setActiveTab(tab){
    if(tab === 'login'){
        formLogin.classList.add('active');
        formRegister.classList.remove('active');
        login.classList.add('active');
        register.classList.remove('active');
    } else {
        formRegister.classList.add('active');
        formLogin.classList.remove('active');
        register.classList.add('active');
        login.classList.remove('active');
    }
}

login.addEventListener('click', () => setActiveTab('login'));
register.addEventListener('click', () => setActiveTab('register'));

function showMessage(id, text, type = 'error'){
    const el = document.getElementById(id);
    if(!el) return;
    el.textContent = text || '';
    el.style.color = type === 'error' ? '#ffb3d9' : '#b6ffd9';
    if(text){
        clearTimeout(el._hideTimeout);
        el._hideTimeout = setTimeout(()=>{ el.textContent = ''; }, 4000);
    }
}

// --- כניסה ---
formLogin.addEventListener('submit', (event) => {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value.trim().toLowerCase();
    const loginPassword = document.getElementById('loginPassword').value;
    if(!loginUsername || !loginPassword){
        showMessage('loginMessage', 'אנא מלא את כל השדות');
        return;
    }

    const storedUserRaw = localStorage.getItem(loginUsername);
    const storedUser = storedUserRaw ? JSON.parse(storedUserRaw) : null;

    if (storedUser && storedUser.password === loginPassword) {
        sessionStorage.setItem('currentUserEmail', loginUsername);
        showMessage('loginMessage', 'התחברת בהצלחה!', 'success');
        setTimeout(()=> window.location.href = 'home.html', 600);
    } else {
        showMessage('loginMessage', 'אימייל או סיסמה שגויים, או שהמשתמש אינו קיים');
    }
});

// --- הרשמה ---
formRegister.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstName = document.getElementById('registerFirstName').value.trim();
    const lastName = document.getElementById('registerLastName').value.trim();
    const emailRaw = document.getElementById('registerEmail').value.trim();
    const email = emailRaw.toLowerCase();
    const password = document.getElementById('registerPassword').value;
    const checkPass = document.getElementById('registerCheckPass').value;

    if(!firstName || !email || !password || !checkPass){
        showMessage('registerMessage', 'אנא מלא את כל השדות המסומנים');
        return;
    }
    if(password.length < 6){
        showMessage('registerMessage', 'הסיסמא חייבת להכיל לפחות 6 תווים');
        return;
    }
    if(password !== checkPass){
        showMessage('registerMessage', 'הסיסמאות אינן תואמות');
        return;
    }
    if(localStorage.getItem(email)){
        showMessage('registerMessage', 'כבר רשום משתמש עם אימייל זה');
        return;
    }

    const user = {
        firstName: firstName,
        lastName: lastName,
        password: password,
        highScore: 0
    };

    localStorage.setItem(email, JSON.stringify(user));
    sessionStorage.setItem('currentUserEmail', email);
    showMessage('registerMessage', 'הרשמת בהצלחה! טוען את הדף...', 'success');
    setTimeout(()=> window.location.href = 'home.html', 800);
});