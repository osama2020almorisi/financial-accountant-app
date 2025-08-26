// js/invoices.js

// تهيئة صفحات الفواتير
function initInvoices() {
    console.log('تم تحميل صفحة الفواتير');
    
    // التحقق من تسجيل الدخول
    if (!isUserLoggedIn()) {
        window.location.href = '../auth/login.html';
        return;
    }
    
    // تحميل بيانات المستخدم
    loadUserData();
    
    // تهيئة القائمة الجانبية
    initSidebar();
    
    // تهيئة أحداث خاصة بصفحات الفواتير
    initInvoiceEvents();
}

// تهيئة أحداث الفواتير
function initInvoiceEvents() {
    // تحديد إذا كنا في صفحة إنشاء فاتورة
    const invoiceForm = document.getElementById('invoiceForm');
    if (invoiceForm) {
        initInvoiceForm();
    }
    
    // تحديد إذا كنا في صفحة قائمة الفواتير
    const invoicesTable = document.getElementById('invoicesTable');
    if (invoicesTable) {
        initInvoicesList();
    }
}

// تهيئة نموذج إنشاء الفاتورة
function initInvoiceForm() {
    console.log('تهيئة نموذج إنشاء الفاتورة');
    
    // تعيين التاريخ الحالي كتاريخ افتراضي
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('invoiceDate').value = today;
    
    // تعيين تاريخ الاستحقاق بعد 15 يوم
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15);
    document.getElementById('dueDate').value = dueDate.toISOString().split('T')[0];
    
    // أحداث اختيار العميل
    const clientSelect = document.getElementById('clientSelect');
    if (clientSelect) {
        clientSelect.addEventListener('change', handleClientSelect);
    }
    
    // أحداث إضافة عنصر جديد
    const addItemBtn = document.getElementById('addItem');
    if (addItemBtn) {
        addItemBtn.addEventListener('click', addInvoiceItem);
    }
    
    // أحداث الحذف للعناصر الموجودة
    const deleteButtons = document.querySelectorAll('.delete-row');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            deleteInvoiceItem(this);
        });
    });
    
    // أحداث حساب المبالغ
    initCalculations();
}

// التعامل مع اختيار العميل
function handleClientSelect(e) {
    const clientId = e.target.value;
    const clientInfo = document.getElementById('clientInfo');
    
    if (clientId) {
        // في التطبيق الحقيقي، سيتم جلب بيانات العميل من الخادم
        // هنا نقوم بمحاكاة البيانات
        const clients = {
            '1': {
                name: 'شركة التقنية المحدودة',
                email: 'info@techcompany.com',
                phone: '+966112345678',
                address: 'الرياض، حي العليا، شارع الملك فهد'
            },
            '2': {
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                phone: '+966501234567',
                address: 'جدة، حي الصفا'
            },
            '3': {
                name: 'مؤسسة النهضة',
                email: 'contact@nahda.com',
                phone: '+966112345679',
                address: 'الدمام، حي المدينة'
            },
            '4': {
                name: 'عبدالله سعيد',
                email: 'abdullah@example.com',
                phone: '+966502345678',
                address: 'الرياض، حي النخيل'
            },
            '5': {
                name: 'شركة الأصالة',
                email: 'info@asala.com',
                phone: '+966112345680',
                address: 'الرياض، حي السليمانية'
            }
        };
        
        const client = clients[clientId];
        if (client) {
            document.getElementById('clientName').textContent = client.name;
            document.getElementById('clientEmail').textContent = client.email;
            document.getElementById('clientPhone').textContent = client.phone;
            document.getElementById('clientAddress').textContent = client.address;
            clientInfo.style.display = 'block';
        }
    } else {
        clientInfo.style.display = 'none';
    }
}

// إضافة عنصر جديد للفاتورة
function addInvoiceItem() {
    const tbody = document.querySelector('#itemsTable tbody');
    const newRow = document.createElement('tr');
    
    newRow.innerHTML = `
        <td>
            <select class="product-select" required>
                <option value="">اختر منتج أو خدمة</option>
                <option value="1">تصميم موقع إلكتروني</option>
                <option value="2">استضافة سنوية</option>
                <option value="3">صيانة دورية</option>
                <option value="4">استشارة تقنية</option>
            </select>
        </td>
        <td><input type="number" class="quantity" min="1" value="1" required></td>
        <td><input type="number" class="unit-price" min="0" step="0.01" required></td>
        <td class="amount">0.00 ر.س</td>
        <td>
            <button type="button" class="btn-icon delete-row" title="حذف">
                <span>🗑️</span>
            </button>
        </td>
    `;
    
    tbody.insertBefore(newRow, tbody.lastElementChild);
    
    // إضافة الأحداث للعنصر الجديد
    const deleteBtn = newRow.querySelector('.delete-row');
    deleteBtn.addEventListener('click', function() {
        deleteInvoiceItem(this);
    });
    
    const quantityInput = newRow.querySelector('.quantity');
    const priceInput = newRow.querySelector('.unit-price');
    
    quantityInput.addEventListener('input', calculateRowTotal);
    priceInput.addEventListener('input', calculateRowTotal);
    
    // إضافة حدث لاختيار المنتج
    const productSelect = newRow.querySelector('.product-select');
    productSelect.addEventListener('change', function() {
        // في التطبيق الحقيقي، سيتم جلب سعر المنتج من الخادم
        // هنا نقوم بمحاكاة الأسعار
        const prices = {
            '1': 2500,
            '2': 1200,
            '3': 800,
            '4': 300
        };
        
        const price = prices[this.value] || 0;
        priceInput.value = price;
        calculateRowTotal.call(priceInput);
    });
}

// حذف عنصر من الفاتورة
function deleteInvoiceItem(button) {
    const row = button.closest('tr');
    if (document.querySelectorAll('#itemsTable tbody tr').length > 1) {
        row.remove();
        calculateInvoiceTotal();
    } else {
        alert('يجب أن تحتوي الفاتورة على عنصر واحد على الأقل');
    }
}

// تهيئة الحسابات
function initCalculations() {
    // أحداث لحساب المبالغ عند تغيير القيم
    const quantityInputs = document.querySelectorAll('.quantity');
    const priceInputs = document.querySelectorAll('.unit-price');
    const taxInput = document.getElementById('tax');
    const discountInput = document.getElementById('discount');
    
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateRowTotal);
    });
    
    priceInputs.forEach(input => {
        input.addEventListener('input', calculateRowTotal);
    });
    
    if (taxInput) {
        taxInput.addEventListener('input', calculateInvoiceTotal);
    }
    
    if (discountInput) {
        discountInput.addEventListener('input', calculateInvoiceTotal);
    }
    
    // حساب المبالغ الأولية
    calculateInvoiceTotal();
}

// حساب المجموع للصف
function calculateRowTotal() {
    const row = this.closest('tr');
    const quantity = parseFloat(row.querySelector('.quantity').value) || 0;
    const price = parseFloat(row.querySelector('.unit-price').value) || 0;
    const amountCell = row.querySelector('.amount');
    
    const total = quantity * price;
    amountCell.textContent = total.toFixed(2) + ' ر.س';
    
    calculateInvoiceTotal();
}

// حساب الإجمالي للفاتورة
function calculateInvoiceTotal() {
    let subtotal = 0;
    
    // جمع مبالغ جميع العناصر
    const amountCells = document.querySelectorAll('.amount');
    amountCells.forEach(cell => {
        const amount = parseFloat(cell.textContent) || 0;
        subtotal += amount;
    });
    
    // حساب الضريبة
    const taxRate = parseFloat(document.getElementById('tax').value) || 0;
    const taxAmount = subtotal * (taxRate / 100);
    
    // حساب الخصم
    const discountInput = document.getElementById('discount').value;
    let discountAmount = 0;
    
    if (discountInput) {
        if (discountInput.includes('%')) {
            const discountRate = parseFloat(discountInput) || 0;
            discountAmount = subtotal * (discountRate / 100);
        } else {
            discountAmount = parseFloat(discountInput) || 0;
        }
    }
    
    // حساب الإجمالي النهائي
    const totalAmount = subtotal + taxAmount - discountAmount;
    
    // تحديث واجهة المستخدم
    document.getElementById('subtotal').textContent = subtotal.toFixed(2) + ' ر.س';
    document.getElementById('taxAmount').textContent = taxAmount.toFixed(2) + ' ر.س';
    document.getElementById('discountAmount').textContent = discountAmount.toFixed(2) + ' ر.س';
    document.getElementById('totalAmount').textContent = totalAmount.toFixed(2) + ' ر.س';
}

// تهيئة قائمة الفواتير
function initInvoicesList() {
    console.log('تهيئة قائمة الفواتير');
    
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
            const invoiceId = this.closest('tr').querySelector('td:nth-child(2)').textContent;
            if (confirm(`هل أنت متأكد من حذف الفاتورة ${invoiceId}؟`)) {
                // في التطبيق الحقيقي، سيتم إرسال طلب حذف إلى الخادم
                this.closest('tr').remove();
                alert('تم حذف الفاتورة بنجاح');
            }
        });
    });
}

// تهيئة صفحات الفواتير عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initInvoices);