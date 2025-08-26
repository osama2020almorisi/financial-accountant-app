// js/settings.js

// تهيئة صفحات الإعدادات
function initSettings() {
    console.log('تم تحميل صفحة الإعدادات');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات الإعدادات
    initSettingsEvents();
}

// تهيئة أحداث الإعدادات
function initSettingsEvents() {
    // تهيئة تبويبات الإعدادات
    initSettingsTabs();
    
    // أحداث رفع الصور
    const logoInput = document.getElementById('companyLogo');
    if (logoInput) {
        logoInput.addEventListener('change', handleLogoUpload);
    }
}

// تهيئة تبويبات الإعدادات
function initSettingsTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // إضافة النشاط للزر الحالي
            this.classList.add('active');
            
            // إخفاء جميع المحتويات
            tabPanes.forEach(pane => pane.classList.remove('active'));
            // إظهار المحتوى المناسب
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// التعامل مع رفع الشعار
function handleLogoUpload(e) {
    const file = e.target.files[0];
    const fileName = document.getElementById('logoFileName');
    const preview = document.getElementById('logoPreview');
    
    if (file) {
        fileName.textContent = file.name;
        
        // عرض معاينة الصورة
        const reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
        };
        reader.readAsDataURL(file);
    } else {
        fileName.textContent = 'لم يتم اختيار ملف';
    }
}

// تهيئة صفحات الإعدادات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initSettings);