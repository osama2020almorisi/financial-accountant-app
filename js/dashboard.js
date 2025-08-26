// js/dashboard.js

// تهيئة لوحة التحكم
function initDashboard() {
    console.log('تم تحميل لوحة التحكم');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = 'auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    const userData = loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تحميل إحصائيات لوحة التحكم
    loadDashboardStats();
    
    // تحميل آخر الفواتير
    loadRecentInvoices();
    
    // تحميل آخر المصروفات
    loadRecentExpenses();
}

// تهيئة القائمة الجانبية
function initSidebar() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }
    
    // إضافة أحداث العناصر المنبثقة في القائمة الجانبية
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (this.classList.contains('logout')) {
                logout();
            }
        });
    });
}

// تحميل إحصائيات لوحة التحكم
function loadDashboardStats() {
    // في التطبيق الحقيقي، سيتم جلب هذه البيانات من الخادم
    // هنا سنقوم بمحاكاة البيانات
    
    const stats = {
        revenue: 25000,
        expenses: 8500,
        profit: 16500,
        invoices: 42
    };
    
    // تحديث واجهة المستخدم بالإحصائيات
    document.querySelectorAll('.stat-value')[0].textContent = formatCurrency(stats.revenue);
    document.querySelectorAll('.stat-value')[1].textContent = formatCurrency(stats.expenses);
    document.querySelectorAll('.stat-value')[2].textContent = formatCurrency(stats.profit);
    document.querySelectorAll('.stat-value')[3].textContent = `${stats.invoices} فاتورة`;
}

// تحميل آخر الفواتير
function loadRecentInvoices() {
    // في التطبيق الحقيقي، سيتم جلب هذه البيانات من الخادم
    // هنا سنقوم بمحاكاة البيانات
    
    const invoices = [
        { id: 'INV-2023-001', client: 'شركة التقنية المحدودة', date: '2023-10-15', amount: 5000, status: 'paid' },
        { id: 'INV-2023-002', client: 'أحمد محمد', date: '2023-10-14', amount: 3200, status: 'pending' },
        { id: 'INV-2023-003', client: 'مؤسسة النهضة', date: '2023-10-13', amount: 7800, status: 'paid' },
        { id: 'INV-2023-004', client: 'عبدالله سعيد', date: '2023-10-12', amount: 2500, status: 'overdue' }
    ];
    
    // سيتم ملء الجدول بالبيانات في التطبيق الحقيقي
    console.log('تم تحميل الفواتير:', invoices);
}

// تحميل آخر المصروفات
function loadRecentExpenses() {
    // في التطبيق الحقيقي، سيتم جلب هذه البيانات من الخادم
    // هنا سنقوم بمحاكاة البيانات
    
    const expenses = [
        { date: '2023-10-15', description: 'فاتورة كهرباء', amount: 450, category: 'مرافق' },
        { date: '2023-10-14', description: 'شراء مواد مكتبية', amount: 320, category: 'مصاريف مكتب' },
        { date: '2023-10-13', description: 'إعلانات على الإنترنت', amount: 1200, category: 'تسويق' },
        { date: '2023-10-12', description: 'صيانة المعدات', amount: 650, category: 'صيانة' }
    ];
    
    // سيتم ملء الجدول بالبيانات في التطبيق الحقيقي
    console.log('تم تحميل المصروفات:', expenses);
}

// تنسيق العملة
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', { style: 'currency', currency: 'SAR' }).format(amount);
}

// تهيئة لوحة التحكم عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initDashboard);