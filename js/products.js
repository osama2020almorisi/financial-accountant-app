// js/products.js

// تهيئة صفحات المنتجات
function initProducts() {
    console.log('تم تحميل صفحة المنتجات');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات المنتجات
    initProductEvents();
}

// تهيئة أحداث المنتجات
function initProductEvents() {
    // تحديد إذا كنا في صفحة قائمة المنتجات
    const productsTable = document.getElementById('productsTable');
    if (productsTable) {
        initProductsList();
    }
}

// تهيئة قائمة المنتجات
function initProductsList() {
    console.log('تهيئة قائمة المنتجات');
    
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
            const productName = this.closest('tr').querySelector('.name').textContent;
            if (confirm(`هل أنت متأكد من حذف المنتج ${productName}؟`)) {
                // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
                this.closest('tr').remove();
                alert('تم حذف المنتج بنجاح');
            }
        });
    });
}

// تهيئة صفحات المنتجات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initProducts);