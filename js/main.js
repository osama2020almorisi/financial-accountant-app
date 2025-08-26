// js/main.js

// دالة التهيئة العامة
function initApp() {
    console.log('تم تحميل التطبيق المحاسبي بنجاح');
    
    // تهيئة الأحداث العامة
    initEvents();
    
    // تحميل البيانات إذا كان المستخدم مسجلاً
    if (isUserLoggedIn()) {
        loadUserData();
    }
}

// تهيئة الأحداث
function initEvents() {
    // الأحداث العامة المشتركة بين الصفحات
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// التعامل مع إرسال النماذج
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formId = form.id;
    
    // منع الإرسال إذا كان النموذج غير صالح
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // التعامل مع النماذج المختلفة
    if (formId === 'loginForm') {
        handleLogin(form);
    } else if (formId === 'registerForm') {
        handleRegister(form);
    }
}

// التعامل مع تسجيل الدخول
function handleLogin(form) {
    const formData = new FormData(form);
    const email = formData.get('email');
    const password = formData.get('password');
    const rememberMe = formData.get('rememberMe') === 'on';
    
    // هنا سيتم الاتصال بالخادم في التطبيق الحقيقي
    // لمثالنا، سنقوم بمحاكاة تسجيل الدخول الناجح
    
    // حفظ بيانات المستخدم في localStorage
    const userData = {
        email: email,
        name: 'محمد أحمد', // سيتم استبدالها بالبيانات الحقيقية من الخادم
        company: 'شركة التقنية المحدودة'
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
    }
    
    // توجيه المستخدم إلى لوحة التحكم
    window.location.href = 'dashboard.html';
}

// التعامل مع إنشاء الحساب
function handleRegister(form) {
    const formData = new FormData(form);
    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const company = formData.get('company');
    const phone = formData.get('phone');
    const password = formData.get('password');
    
    // هنا سيتم الاتصال بالخادم في التطبيق الحقيقي
    // لمثالنا، سنقوم بمحاكاة إنشاء الحساب الناجح
    
    // حفظ بيانات المستخدم في localStorage
    const userData = {
        email: email,
        name: fullName,
        company: company,
        phone: phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // توجيه المستخدم إلى لوحة التحكم
    window.location.href = 'dashboard.html';
}

// التحقق من وجود مستخدم مسجل
function isUserLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

// تحميل بيانات المستخدم
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('currentUser'));
    
    // تحديث واجهة المستخدم ببيانات المستخدم
    const userElements = document.querySelectorAll('.user-profile span');
    userElements.forEach(el => {
        if (el.textContent === '') {
            el.textContent = userData.name;
        }
    });
    
    return userData;
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'auth/login.html';
}

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initApp);