// js/customers.js

// تهيئة صفحات العملاء
function initCustomers() {
    console.log('تم تحميل صفحة العملاء');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات العملاء
    initCustomerEvents();
}

// تهيئة أحداث العملاء
function initCustomerEvents() {
    // تحديد إذا كنا في صفحة قائمة العملاء
    const customersTable = document.getElementById('customersTable');
    if (customersTable) {
        initCustomersList();
    }
}

// تهيئة قائمة العملاء
function initCustomersList() {
    console.log('تهيئة قائمة العملاء');
    
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
            const customerName = this.closest('tr').querySelector('.name').textContent;
            if (confirm(`هل أنت متأكد من حذف العميل ${customerName}؟`)) {
                // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
                this.closest('tr').remove();
                alert('تم حذف العميل بنجاح');
            }
        });
    });
}

// تهيئة صفحات العملاء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initCustomers);