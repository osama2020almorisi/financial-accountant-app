// js/auth.js

// تهيئة صفحات المصادقة
function initAuthPages() {
    console.log('تم تحميل صفحة المصادقة');
    
    // التحقق إذا كان المستخدم مسجلاً بالفعل
    if (isUserLoggedIn()) {
        window.location.href = '../dashboard.html';
        return;
    }
    
    // تهيئة أحداث النماذج
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
        
        // إضافة تحقق من تطابق كلمات المرور
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        confirmPassword.addEventListener('input', function() {
            if (password.value !== confirmPassword.value) {
                confirmPassword.setCustomValidity('كلمات المرور غير متطابقة');
            } else {
                confirmPassword.setCustomValidity('');
            }
        });
    }
}

// تهيئة صفحات المصادقة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initAuthPages);