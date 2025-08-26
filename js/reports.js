// js/reports.js

// تهيئة صفحات التقارير
function initReports() {
    console.log('تم تحميل صفحة التقارير');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات التقارير
    initReportEvents();
}

// تهيئة أحداث التقارير
function initReportEvents() {
    // أحداث تغيير نوع الفترة
    const periodSelect = document.getElementById('period');
    if (periodSelect) {
        periodSelect.addEventListener('change', handlePeriodChange);
    }
    
    // أحداث أزرار الطباعة والتصدير
    const printBtn = document.getElementById('printReport');
    const exportBtn = document.getElementById('exportReport');
    
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            alert('سيتم تصدير التقرير إلى PDF. هذه الميزة قيد التطوير.');
        });
    }
}

// التعامل مع تغيير نوع الفترة
function handlePeriodChange(e) {
    const periodType = e.target.value;
    const monthField = document.getElementById('monthField');
    const yearField = document.getElementById('yearField');
    const customDateField = document.getElementById('customDateField');
    
    // إخفاء جميع الحقول أولاً
    monthField.style.display = 'none';
    yearField.style.display = 'none';
    customDateField.style.display = 'none';
    
    // إظهار الحقول المناسبة حسب نوع الفترة
    if (periodType === 'monthly' || periodType === 'quarterly' || periodType === 'yearly') {
        monthField.style.display = periodType === 'yearly' ? 'none' : 'block';
        yearField.style.display = 'block';
    } else if (periodType === 'custom') {
        customDateField.style.display = 'block';
    }
}

// تهيئة صفحات التقارير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initReports);