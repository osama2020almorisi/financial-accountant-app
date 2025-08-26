// js/expenses.js

// تهيئة صفحات المصروفات
function initExpenses() {
    console.log('تم تحميل صفحة المصروفات');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات المصروفات
    initExpenseEvents();
}

// تهيئة أحداث المصروفات
function initExpenseEvents() {
    // تحديد إذا كنا في صفحة قائمة المصروفات
    const expensesTable = document.getElementById('expensesTable');
    if (expensesTable) {
        initExpensesList();
    }
}

// تهيئة قائمة المصروفات
function initExpensesList() {
    console.log('تهيئة قائمة المصروفات');
    
    // تحديد عنصر تحديد الكل
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.row-checkbox');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
    
    // إضافة أحداث لأزرار الحذف
    const deleteButtons = document.querySelectorAll('.action-buttons .delete');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const expenseDesc = this.closest('tr').querySelector('td:nth-child(3)').textContent;
            if (confirm(`هل أنت متأكد من حذف المصروف "${expenseDesc}"؟`)) {
                // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
                this.closest('tr').remove();
                alert('تم حذف المصروف بنجاح');
            }
        });
    });
}

// تهيئة صفحات المصروفات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initExpenses);