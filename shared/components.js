/**
 * JR Printiq — Shared Components & Data Layer
 * Provides: Header, Footer, WhatsApp FAB, Language Toggle, Data Layer, Booking ID Generator
 */

// ============================================================
// DATA LAYER (localStorage-based MVP)
// ============================================================
const JRData = {
    KEYS: {
        BOOKINGS: 'jr_bookings',
        AUTH: 'jr_admin_auth',
        PRINTERS: 'jr_printers',
        CATALOG: 'jr_catalog',
        STAFF: 'jr_staff',
        LANGUAGE: 'jr_language'
    },

    // --- Bookings ---
    getBookings() {
        return JSON.parse(localStorage.getItem(this.KEYS.BOOKINGS) || '[]');
    },
    saveBooking(booking) {
        const bookings = this.getBookings();
        booking.id = booking.id || this.generateBookingId();
        booking.createdAt = booking.createdAt || new Date().toISOString();
        booking.status = booking.status || 'submitted';
        booking.statusHistory = booking.statusHistory || [
            { status: 'submitted', date: new Date().toISOString(), note: 'Booking submitted by client' }
        ];
        booking.dataConfirmed = false;
        booking.paymentLog = booking.paymentLog || null;
        booking.printerAssigned = booking.printerAssigned || null;
        booking.proofUrl = booking.proofUrl || null;
        booking.proofApproved = false;
        booking.proofComments = [];
        booking.priceChange = null;
        bookings.push(booking);
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
        return booking;
    },
    getBookingById(id) {
        return this.getBookings().find(b => b.id === id);
    },
    getBookingByIdAndPhone(id, phone) {
        return this.getBookings().find(b => b.id === id && b.phone && b.phone.replace(/\s/g,'').includes(phone.replace(/\s/g,'')));
    },
    updateBooking(id, updates) {
        const bookings = this.getBookings();
        const idx = bookings.findIndex(b => b.id === id);
        if (idx === -1) return null;
        Object.assign(bookings[idx], updates);
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
        return bookings[idx];
    },
    updateBookingStatus(id, newStatus, note, loggedBy) {
        const booking = this.getBookingById(id);
        if (!booking) return null;
        booking.status = newStatus;
        booking.statusHistory = booking.statusHistory || [];
        booking.statusHistory.push({
            status: newStatus,
            date: new Date().toISOString(),
            note: note || '',
            loggedBy: loggedBy || 'Admin'
        });
        return this.updateBooking(id, { status: newStatus, statusHistory: booking.statusHistory });
    },

    // --- Auth ---
    getAuth() {
        return JSON.parse(localStorage.getItem(this.KEYS.AUTH) || '{"loggedIn":false}');
    },
    login(username, password) {
        const staff = this.getStaff();
        const user = staff.find(s => s.username === username && s.password === password);
        if (user) {
            const auth = { loggedIn: true, username: user.username, name: user.name, role: user.role };
            localStorage.setItem(this.KEYS.AUTH, JSON.stringify(auth));
            return auth;
        }
        return null;
    },
    logout() {
        localStorage.setItem(this.KEYS.AUTH, JSON.stringify({ loggedIn: false }));
    },
    requireAuth() {
        const auth = this.getAuth();
        if (!auth.loggedIn) {
            // Try relative path — works for both /admin/ and root level
            const isInAdmin = window.location.pathname.includes('/admin/');
            window.location.href = isInAdmin ? 'login.html' : 'admin/login.html';
            return false;
        }
        return auth;
    },
    getAdminEmail() {
        return localStorage.getItem('jr_admin_email') || 'reserch2024@gmail.com';
    },
    setAdminEmail(email) {
        localStorage.setItem('jr_admin_email', email);
    },

    // --- Staff ---
    getStaff() {
        const staff = JSON.parse(localStorage.getItem(this.KEYS.STAFF) || 'null');
        if (!staff) {
            const defaults = [
                { username: 'admin', password: 'admin123', name: 'JR Admin', role: 'admin' }
            ];
            localStorage.setItem(this.KEYS.STAFF, JSON.stringify(defaults));
            return defaults;
        }
        return staff;
    },
    addStaff(member) {
        const staff = this.getStaff();
        staff.push(member);
        localStorage.setItem(this.KEYS.STAFF, JSON.stringify(staff));
        return staff;
    },
    removeStaff(username) {
        let staff = this.getStaff();
        staff = staff.filter(s => s.username !== username);
        localStorage.setItem(this.KEYS.STAFF, JSON.stringify(staff));
        return staff;
    },

    // --- Printers ---
    getPrinters() {
        const printers = JSON.parse(localStorage.getItem(this.KEYS.PRINTERS) || 'null');
        if (!printers) {
            const defaults = [
                { id: 'P001', name: 'Sharma Print House', specialty: 'Wedding Cards, Gold Foil', phone: '9876543210', turnaround: '5-7 days', notes: 'Best for premium wedding cards' },
                { id: 'P002', name: 'Digital Express UP', specialty: 'Visiting Cards, Brochures', phone: '9876543211', turnaround: '2-3 days', notes: 'Fast digital printing' },
                { id: 'P003', name: 'Banner King Lucknow', specialty: 'Posters, Banners, Flex', phone: '9876543212', turnaround: '1-2 days', notes: 'Wide format specialist' }
            ];
            localStorage.setItem(this.KEYS.PRINTERS, JSON.stringify(defaults));
            return defaults;
        }
        return printers;
    },
    savePrinters(printers) {
        localStorage.setItem(this.KEYS.PRINTERS, JSON.stringify(printers));
    },

    // --- Catalog ---
    getCatalog() {
        const catalog = JSON.parse(localStorage.getItem(this.KEYS.CATALOG) || 'null');
        if (!catalog) {
            const defaults = [
                { id: 'D001', name_en: 'Royal Heritage Suite', name_hi: 'रॉयल हेरिटेज सूट', category: 'Wedding Cards', paper: 'Premium Matte', gsm: 300, finish: 'Gold Foil Embossed', size: '5x7 inches', minQty: 100, turnaround: '5-7 days', tags: ['premium','gold','traditional'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy1k1XY0aI5quURrskNaueZvV-RAwhTSkv8G-JSpmi1zYkvombJE9lmBoMcnhYpqxyBtOcChYQL5puWjoxI1SmZyPgA8Egt70aLPxJhoXG2-jvCK1wQozB1GQE6PHh67JGfvhopeT7c4U32bYE9zXA-cvKBHVSirmDMuGse9QBTi62Td6SfJT1ybjvtPxGlDM64IveaARxbR2Fp17SnOhoFkBO3-udvLB-B0tdV__ucnnS2R4uQHH8HcZKhYGr7NORf5uH69LRUn0X' },
                { id: 'D002', name_en: 'Minimalist Azure', name_hi: 'मिनिमलिस्ट एज़्योर', category: 'Wedding Cards', paper: 'Luxury Matte', gsm: 350, finish: 'Digital Print', size: '5x7 inches', minQty: 50, turnaround: '3-5 days', tags: ['modern','minimal','blue'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEQXr9UObx-Ob45nIEm8-jjyuc6w71Su-aLZEI85vMoopXL4os-sG_KtHVNCOifUxFVnNoM5WSOU-TzWKjTxDoHpGwHVBtb7PW8FgRpIKaE0JK7tGhj712mIQVw9IoILZ7-As_kbbuxkz5yOFaBD53azIV4Ga0k9Um4wstV2SFJpIkT6iJgGRD9ur350Axr1nrVWqKshE0B83HhHuUobzBOIta_pYQ0Yy3WBm5GZo-yXd3icWg52MqfoI6fnKz3VNJd7icdi8g3y9g' },
                { id: 'D003', name_en: 'Crimson Elegance', name_hi: 'क्रिमसन एलिगेंस', category: 'Wedding Cards', paper: 'Art Card', gsm: 300, finish: 'High-Gloss UV', size: '5x7 inches', minQty: 100, turnaround: '5-7 days', tags: ['traditional','red','glossy'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBWQAXTAOI3XtahQFRidi2jJ8wkPiPfCChxIbf5fKHrVwGmUxWkUV7rcuL5WedrJj-jalpwr9NOoiZFhhx09lvYMg7wY8Q4bX0IHytJnn30k4CSNQNOBVyL_jjKr76OLeA4uea_lOr4GoIIsFj2pJmB96Ry1-E9W0gIII3Q0JX1jD9tRoEgr9HHgZcCACFRiEx7lnRS2xrgK-TS6KReYclTn6Hd5KjN0OrdooA8HgDurrEqxdLpM8Eq_7SR2AUIEAC8zWkSMZHdnHkS' },
                { id: 'D004', name_en: 'Elegant Floral', name_hi: 'एलिगेंट फ्लोरल', category: 'Wedding Cards', paper: 'Premium Matte', gsm: 350, finish: 'Gold Foil Embellished', size: '5x7 inches', minQty: 100, turnaround: '5-7 days', tags: ['floral','gold','premium'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfikXV2HtcFAv9Xt38MkxlsfhK7tT-EqLm57L_3jkxOgKYhFftZSKdQcs-5dK_Ocex9XIiiftVMkZF-OOu5TczOlI5dqMaXQlpnztVBVAVR2I7MuIQeG5n1bnjndBJSOPu2_6gYxTPQ2GMqF964FAM5QuPSzqm4m---gpiN-Jzapk-EChe80-luHbq7ZBhyCdPR0BIK5URYkZrre-N9zy_c4vzD3l77Er7Tvf9z_or2dQCouUx2NtIpaHMgxWRUaiV3c3PnTG-ethh' },
                { id: 'D005', name_en: 'Corporate Sleek', name_hi: 'कॉर्पोरेट स्लीक', category: 'Visiting Cards', paper: 'Premium Card', gsm: 350, finish: 'Matte Lamination', size: '3.5x2 inches', minQty: 200, turnaround: '2-3 days', tags: ['business','modern','navy'], image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnRxEVnG4Svdy90N_lKf1cPqQfKfQkyJ707pdH1vBp9ARElXyAhiqRieLznj0PSx2ij2tx0m4mFmvIfDgfAyb7eR7OPkkzuFFE7LdIiZFPCqBuSkEAyB1RnupBwSqA0qhr9L41y0fgPRYh_gTx4TOQyG7luAXQhYsaImi2VpWmfMJKgJAaXG3uYdXP4dK42to3CuatTdHEEwd20RLPvaK2HihKhNn9hEinJPIP-HX4TqpV9b4ZYswQwZF3MlVmjiYMQ6G1gA_4UyKs' }
            ];
            localStorage.setItem(this.KEYS.CATALOG, JSON.stringify(defaults));
            return defaults;
        }
        return catalog;
    },
    saveCatalog(catalog) {
        localStorage.setItem(this.KEYS.CATALOG, JSON.stringify(catalog));
    },

    // --- Language ---
    getLanguage() {
        return localStorage.getItem(this.KEYS.LANGUAGE) || 'en';
    },
    setLanguage(lang) {
        localStorage.setItem(this.KEYS.LANGUAGE, lang);
        applyLanguage(lang);
    },
    toggleLanguage() {
        const current = this.getLanguage();
        const next = current === 'en' ? 'hi' : 'en';
        this.setLanguage(next);
        return next;
    },

    // --- Utilities ---
    generateBookingId() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let id = 'JR-';
        for (let i = 0; i < 6; i++) id += chars[Math.floor(Math.random() * chars.length)];
        return id;
    },

    // --- Seed demo data ---
    seedDemoData() {
        if (this.getBookings().length > 0) return;
        const demoBookings = [
            {
                id: 'JR-X7K9M2', designId: 'D001', designName: 'Royal Heritage Suite',
                names: 'Rahul & Priya', eventDate: '2026-08-15T10:00', venue: 'Grand Palace Banquet, Hazratganj, Lucknow',
                familyNames: ['Mr. & Mrs. Sharma', 'Mr. & Mrs. Gupta'], language: 'Hindi',
                quantity: 500, city: 'Lucknow', pincode: '226001', preferredDate: '2026-08-01',
                phone: '7376550040', email: 'rahul@example.com', whatsappOptIn: true,
                status: 'proof_sent', dataConfirmed: true, createdAt: '2026-06-25T14:30:00.000Z',
                printerAssigned: 'P001',
                paymentLog: { finalPrice: 15000, advanceAmount: 7500, method: 'UPI', reference: 'UPI-REF-123456', dateReceived: '2026-06-26', loggedBy: 'JR Admin' },
                proofUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDy1k1XY0aI5quURrskNaueZvV-RAwhTSkv8G-JSpmi1zYkvombJE9lmBoMcnhYpqxyBtOcChYQL5puWjoxI1SmZyPgA8Egt70aLPxJhoXG2-jvCK1wQozB1GQE6PHh67JGfvhopeT7c4U32bYE9zXA-cvKBHVSirmDMuGse9QBTi62Td6SfJT1ybjvtPxGlDM64IveaARxbR2Fp17SnOhoFkBO3-udvLB-B0tdV__ucnnS2R4uQHH8HcZKhYGr7NORf5uH69LRUn0X',
                proofApproved: false, proofComments: [],
                statusHistory: [
                    { status: 'submitted', date: '2026-06-25T14:30:00.000Z', note: 'Booking submitted' },
                    { status: 'confirmed', date: '2026-06-25T16:00:00.000Z', note: 'Details confirmed via WhatsApp' },
                    { status: 'advance_received', date: '2026-06-26T10:00:00.000Z', note: 'Advance ₹7,500 received via UPI', loggedBy: 'JR Admin' },
                    { status: 'assigned', date: '2026-06-26T11:00:00.000Z', note: 'Assigned to Sharma Print House' },
                    { status: 'proof_sent', date: '2026-06-28T15:00:00.000Z', note: 'Proof sent for client approval' }
                ]
            },
            {
                id: 'JR-A3B8N5', designId: 'D005', designName: 'Corporate Sleek',
                names: 'Vikram Industries', eventDate: '', venue: '',
                familyNames: ['Mr. Vikram Singh'], language: 'English',
                quantity: 1000, city: 'Kanpur', pincode: '208001', preferredDate: '2026-07-10',
                phone: '9876543211', email: 'vikram@industries.com', whatsappOptIn: true,
                status: 'submitted', dataConfirmed: false, createdAt: '2026-07-01T09:00:00.000Z',
                printerAssigned: null, paymentLog: null, proofUrl: null,
                proofApproved: false, proofComments: [],
                statusHistory: [
                    { status: 'submitted', date: '2026-07-01T09:00:00.000Z', note: 'Booking submitted' }
                ]
            },
            {
                id: 'JR-P5Q2R8', designId: 'D003', designName: 'Crimson Elegance',
                names: 'Amit & Neha', eventDate: '2026-07-05T18:00', venue: 'Riverside Resort, Varanasi',
                familyNames: ['Mr. & Mrs. Verma'], language: 'Both',
                quantity: 300, city: 'Varanasi', pincode: '221001', preferredDate: '2026-07-01',
                phone: '9876543213', email: '', whatsappOptIn: true,
                status: 'confirmed', dataConfirmed: true, createdAt: '2026-06-20T11:00:00.000Z',
                printerAssigned: 'P001',
                paymentLog: null,
                proofUrl: null, proofApproved: false, proofComments: [],
                statusHistory: [
                    { status: 'submitted', date: '2026-06-20T11:00:00.000Z', note: 'Booking submitted' },
                    { status: 'confirmed', date: '2026-06-20T14:00:00.000Z', note: 'Client confirmed details' }
                ]
            }
        ];
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(demoBookings));
        this.getStaff();
        this.getPrinters();
        this.getCatalog();
    }
};

// Initialize demo data on first load
JRData.seedDemoData();

// ============================================================
// LANGUAGE TOGGLE
// ============================================================
function applyLanguage(lang) {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = lang === 'hi' ? (el.getAttribute('data-hi') || el.getAttribute('data-en')) : el.getAttribute('data-en');
    });
    const toggleBtns = document.querySelectorAll('.lang-toggle-text');
    toggleBtns.forEach(btn => {
        btn.textContent = lang === 'hi' ? 'Switch to English' : 'EN | हिंदी';
    });
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';
}

// ============================================================
// STATUS HELPERS
// ============================================================
const STATUS_CONFIG = {
    submitted: { label: 'Submitted', labelHi: 'जमा किया गया', color: 'warning', icon: 'schedule' },
    confirmed: { label: 'Details Confirmed', labelHi: 'विवरण की पुष्टि', color: 'primary', icon: 'fact_check' },
    advance_received: { label: 'Advance Received', labelHi: 'अग्रिम प्राप्त', color: 'success', icon: 'payments' },
    assigned: { label: 'Assigned to Printer', labelHi: 'प्रिंटर को सौंपा', color: 'primary', icon: 'print' },
    proof_sent: { label: 'Proof Sent', labelHi: 'प्रूफ भेजा गया', color: 'warning', icon: 'preview' },
    proof_approved: { label: 'Proof Approved', labelHi: 'प्रूफ स्वीकृत', color: 'success', icon: 'thumb_up' },
    price_change_pending: { label: 'Price Change Pending', labelHi: 'मूल्य परिवर्तन लंबित', color: 'warning', icon: 'currency_rupee' },
    in_print: { label: 'In Print', labelHi: 'प्रिंट में', color: 'primary', icon: 'precision_manufacturing' },
    ready: { label: 'Ready for Delivery', labelHi: 'डिलीवरी के लिए तैयार', color: 'success', icon: 'inventory' },
    delivered: { label: 'Delivered', labelHi: 'डिलीवर किया गया', color: 'success', icon: 'check_circle' },
    cancelled: { label: 'Cancelled', labelHi: 'रद्द', color: 'error', icon: 'cancel' }
};

const STATUS_TIMELINE_ORDER = ['submitted','confirmed','advance_received','assigned','proof_sent','proof_approved','in_print','ready','delivered'];

function getStatusBadgeHTML(status) {
    const cfg = STATUS_CONFIG[status] || { label: status, color: 'secondary', icon: 'info' };
    const colorMap = {
        primary: 'bg-primary/10 text-primary',
        success: 'bg-[#2E8B57]/10 text-[#2E8B57]',
        warning: 'bg-[#C98A1F]/10 text-[#C98A1F]',
        error: 'bg-[#C0392B]/10 text-[#C0392B]',
        secondary: 'bg-secondary/10 text-secondary'
    };
    return `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-label-caps font-label-caps font-bold ${colorMap[cfg.color]}">
        <span class="material-symbols-outlined" style="font-size:14px">${cfg.icon}</span>${cfg.label}</span>`;
}

// ============================================================
// REUSABLE COMPONENTS
// ============================================================

/**
 * Generate the site header HTML
 * @param {string} activePage - Current page identifier for nav highlighting
 * @param {string} basePath - Relative path prefix to root (e.g. '../' for subfolders)
 */
function renderHeader(activePage = '', basePath = '../') {
    const navItems = [
        { id: 'catalog', label: 'Catalog', href: `${basePath}catalog_wedding_cards/index.html` },
        { id: 'smart-print', label: 'Price Estimator', href: `${basePath}smart_print_utility/index.html` },
        { id: 'track-order', label: 'Track Order', href: `${basePath}order_tracking/index.html` },
        { id: 'about', label: 'About', href: `${basePath}about/index.html` }
    ];

    const navHTML = navItems.map(item => {
        const isActive = activePage === item.id;
        const cls = isActive
            ? 'text-on-primary border-b-2 border-on-primary pb-1 font-bold'
            : 'text-on-primary-container/80 font-medium hover:text-on-primary transition-colors duration-200';
        return `<a href="${item.href}" class="${cls}">${item.label}</a>`;
    }).join('');

    const mobileNavHTML = navItems.map(item => {
        const isActive = activePage === item.id;
        const cls = isActive ? 'text-primary font-bold bg-primary/5' : 'text-on-surface hover:bg-surface-container-high';
        return `<a href="${item.href}" class="block px-4 py-3 rounded-lg ${cls} transition-all">${item.label}</a>`;
    }).join('');

    return `
    <header class="bg-primary-container shadow-sm fixed top-0 w-full z-50" id="site-header">
        <div class="flex justify-between items-center w-full px-gutter max-w-max_width mx-auto h-16">
            <a href="${basePath}home_page/index.html" class="flex items-center gap-2 no-underline">
                <span class="text-h3 font-h1-mobile font-bold text-on-primary">JR Printiq</span>
            </a>
            <nav class="hidden md:flex items-center gap-md">${navHTML}</nav>
            <div class="flex items-center gap-sm">
                <button onclick="JRData.toggleLanguage()" class="hidden sm:flex items-center gap-xs bg-on-primary-container/10 px-3 py-1.5 rounded-full border border-on-primary/20 text-on-primary hover:bg-on-primary-container/20 transition-all">
                    <span class="material-symbols-outlined" style="font-size:16px">language</span>
                    <span class="text-label-caps font-label-caps lang-toggle-text">EN | हिंदी</span>
                </button>
                <a href="tel:+917376550040" class="text-on-primary hover:opacity-80 transition-all p-1">
                    <span class="material-symbols-outlined">call</span>
                </a>
                <a href="https://wa.me/917376550040" target="_blank" class="text-on-primary hover:opacity-80 transition-all p-1">
                    <span class="material-symbols-outlined">chat</span>
                </a>
                <button onclick="toggleMobileMenu()" class="md:hidden text-on-primary p-1" id="mobile-menu-btn">
                    <span class="material-symbols-outlined" id="menu-icon">menu</span>
                </button>
            </div>
        </div>
        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-surface-container-lowest shadow-lg border-t border-outline-variant/20 absolute top-16 left-0 right-0 z-50">
            <div class="p-4 space-y-1 max-w-max_width mx-auto">
                ${mobileNavHTML}
                <div class="border-t border-outline-variant/20 pt-3 mt-3">
                    <button onclick="JRData.toggleLanguage()" class="flex items-center gap-2 px-4 py-3 rounded-lg text-on-surface hover:bg-surface-container-high transition-all w-full">
                        <span class="material-symbols-outlined" style="font-size:18px">language</span>
                        <span>Switch Language / भाषा बदलें</span>
                    </button>
                </div>
            </div>
        </div>
    </header>`;
}

function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    icon.textContent = isOpen ? 'menu' : 'close';
}

/**
 * Generate the site footer HTML
 */
function renderFooter(basePath = '../') {
    return `
    <footer class="bg-primary-container text-on-primary-container pt-lg pb-md">
        <div class="flex flex-col md:flex-row justify-between items-start w-full px-gutter max-w-max_width mx-auto gap-md">
            <div class="max-w-xs space-y-sm">
                <span class="text-body-lg font-h3 text-on-primary block font-bold">JR Printiq</span>
                <p class="text-body-sm opacity-70">Your partner for smart, high-quality printing solutions in Uttar Pradesh. We bring precision to every page.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-lg">
                <div class="space-y-xs">
                    <h6 class="text-on-primary font-bold text-label-caps uppercase tracking-wider">Quick Links</h6>
                    <nav class="flex flex-col gap-xs">
                        <a href="${basePath}catalog_wedding_cards/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Catalog</a>
                        <a href="${basePath}smart_print_utility/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Price Estimator</a>
                        <a href="${basePath}order_tracking/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Track Order</a>
                        <a href="${basePath}booking_requirement_form/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Place a Booking</a>
                    </nav>
                </div>
                <div class="space-y-xs">
                    <h6 class="text-on-primary font-bold text-label-caps uppercase tracking-wider">Support</h6>
                    <nav class="flex flex-col gap-xs">
                        <a href="${basePath}about/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">About Us</a>
                        <a href="${basePath}about/index.html#contact" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Contact</a>
                        <a href="${basePath}terms/index.html" class="text-on-primary-container/70 text-body-sm hover:text-on-primary hover:underline transition-all">Terms & Policy</a>
                    </nav>
                </div>
                <div class="space-y-xs col-span-2 md:col-span-1">
                    <h6 class="text-on-primary font-bold text-label-caps uppercase tracking-wider">Location</h6>
                    <p class="text-body-sm opacity-70">Alibuilding, Mau, 275101,<br>Uttar Pradesh</p>
                </div>
            </div>
        </div>
        <div class="w-full px-gutter max-w-max_width mx-auto border-t border-on-primary/10 mt-lg pt-md text-center md:text-left">
            <p class="text-label-caps opacity-60">© 2026 JR Printiq. Serving Uttar Pradesh with Smart Printing.</p>
        </div>
    </footer>`;
}

/**
 * Floating WhatsApp button
 */
function renderWhatsAppFAB() {
    return `
    <a href="https://wa.me/917376550040" target="_blank" class="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all" title="Chat on WhatsApp" id="whatsapp-fab">
        <svg fill="currentColor" height="32" viewBox="0 0 24 24" width="32" xmlns="http://www.w3.org/2000/svg"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.522.902 3.271 1.379 5.063 1.38h.005c5.448 0 9.882-4.433 9.885-9.88.001-2.641-1.03-5.123-2.903-6.997s-4.355-2.905-6.998-2.905c-5.443 0-9.876 4.433-9.879 9.879-.001 1.892.536 3.733 1.554 5.337l-1.023 3.73 3.826-1.004zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
    </a>`;
}

/**
 * Format date for display
 */
function formatDate(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}
function formatDateTime(dateStr) {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}
function formatCurrency(amount) {
    if (!amount && amount !== 0) return '—';
    return '₹' + Number(amount).toLocaleString('en-IN');
}
function timeAgo(dateStr) {
    const d = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Yesterday';
    return diff + ' days ago';
}
function daysUntil(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    const now = new Date();
    now.setHours(0,0,0,0);
    d.setHours(0,0,0,0);
    return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

/**
 * Convert any Google Drive sharing URL to a directly embeddable image URL.
 * Handles: /file/d/ID/view  |  /open?id=ID  |  /uc?id=ID  |  already direct URLs
 */
function convertGDriveUrl(url) {
    if (!url || !url.trim()) return '';
    url = url.trim();
    // Match /file/d/FILE_ID
    let m = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
    // Match ?id=FILE_ID or &id=FILE_ID
    m = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (m) return `https://drive.google.com/uc?export=view&id=${m[1]}`;
    // Already a direct or other URL — return as-is
    return url;
}

/**
 * Standard page head includes
 */
function getHeadIncludes() {
    return `
    <link href="https://fonts.googleapis.com" rel="preconnect">
    <link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Sans+Devanagari:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">`;
}
