/* ==========================================================================
   IQRA BEAUTY PARLOUR - CORE APPLICATION LOGIC
   ========================================================================== */

// Services Data Store
const SERVICES = [
    // Hair Styling
    {
        id: 'hair-1',
        title: 'Precision Couture Cut & Blowdry',
        price: 100,
        duration: '60 mins',
        category: 'hair',
        image: 'assets/hair.png',
        desc: 'Advanced precision dry-cutting designed for your hair structure, finished with a luxury signature blowdry.'
    },
    {
        id: 'hair-2',
        title: 'Royal Gold Keratin Infusion',
        price: 4500,
        duration: '120 mins',
        category: 'hair',
        image: 'assets/hair_keratin.png',
        desc: 'Deep smoothing organic keratin treatment to eliminate frizz, restore shine, and strengthen hair follicles.'
    },
    {
        id: 'hair-3',
        title: 'Signature Hand-Painted Balayage',
        price: 6500,
        duration: '180 mins',
        category: 'hair',
        image: 'assets/hair_balayage.png',
        desc: 'Bespoke hand-painted highlights tailored to your natural skin undertone. Includes toner and glossy treatment.'
    },
    
    // Makeup
    {
        id: 'makeup-1',
        title: 'HD Celebrities Glam Makeup',
        price: 4500,
        duration: '90 mins',
        category: 'makeup',
        image: 'assets/makeup_party.png',
        desc: 'High-Definition camera-ready makeup using top-tier international brands. Perfect for premium events.'
    },
    {
        id: 'makeup-2',
        title: 'Airbrush Luxury Makeover',
        price: 6000,
        duration: '90 mins',
        category: 'makeup',
        image: 'assets/makeup.png',
        desc: 'Ultra-lightweight, long-lasting premium airbrush formulation for an absolute flawless, poreless satin skin finish.'
    },
    
    // Skincare
    {
        id: 'skin-1',
        title: '24K Gold Dust Radiance Facial',
        price: 3500,
        duration: '75 mins',
        category: 'skincare',
        image: 'assets/skincare.png',
        desc: 'Exquisite cellular regeneration facial using pure gold dust particles, collagen serums, and massage rituals.'
    },
    {
        id: 'skin-2',
        title: 'Luxury Hydra-Infusion Skin Therapy',
        price: 5000,
        duration: '90 mins',
        category: 'skincare',
        image: 'assets/skincare_hydra.png',
        desc: 'Advanced multi-step vortex extraction, deep exfoliation, and custom serum micro-channeling for glowing hydration.'
    },
    
    // Bridal Special
    {
        id: 'bridal-1',
        title: 'The Royal Imperial Bridal Makeup',
        price: 18000,
        duration: '240 mins',
        category: 'bridal',
        image: 'assets/makeup.png',
        desc: 'Complete premium bridal transformation: Ultra HD/Airbrush makeup, designer hair styling, jewelry settings, and outfit draping.'
    },
    {
        id: 'bridal-2',
        title: 'Bridal Mehndi & Styling Ritual',
        price: 8000,
        duration: '180 mins',
        category: 'bridal',
        image: 'assets/bridal_mehndi.png',
        desc: 'Exquisite organic dark bridal henna application combined with floral hairstyling prep and prep-facials.'
    },
    
    // Nails
    {
        id: 'nails-1',
        title: 'Luxury Artisan Gel Extensions',
        price: 2500,
        duration: '90 mins',
        category: 'nails',
        image: 'assets/nails.png',
        desc: 'Custom nail sculpting with gel tips, premium non-toxic colors, and intricate nail art design elements.'
    },
    {
        id: 'nails-2',
        title: 'Caviar Spa Manicure & Pedicure',
        price: 1800,
        duration: '60 mins',
        category: 'nails',
        image: 'assets/nails_pedi.png',
        desc: 'Decadent botanical scrub, therapeutic massage, essential oils bath, and nail contouring with luxury polish.'
    }
];

// Time Slots Data List
const AVAILABLE_SLOTS = [
    "10:00 AM",
    "11:30 AM",
    "01:00 PM",
    "02:30 PM",
    "04:00 PM",
    "05:30 PM",
    "07:00 PM"
];

// Application State
let bookingWizardState = {
    currentStep: 1,
    selectedServices: [],
    selectedDate: null,
    selectedTime: null,
    customerDetails: {
        name: '',
        phone: '',
        email: '',
        notes: ''
    }
};

let calendarState = {
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth()
};

let bookings = [];

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
    // Load Bookings from LocalStorage
    initBookings();
    
    // Render initial services menu
    renderServicesMenu('all');
    
    // Scroll event for sticky navigation
    window.addEventListener("scroll", handleHeaderScroll);
    
    // Auto Testimonials slider
    startTestimonialSlider();
    
    // Initialize Scroll Reveal Animations
    initScrollReveal();
    
    // Initialize Scroll Progress Bar
    initScrollProgressBar();
});

/* ==========================================================================
   NAVIGATION & UI FUNCTIONALITY
   ========================================================================== */

function handleHeaderScroll() {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

function toggleSideDrawer() {
    const drawer = document.getElementById("side-drawer");
    const overlay = document.getElementById("drawer-overlay");
    const toggleBtn = document.querySelector(".menu-toggle-btn");
    
    drawer.classList.toggle("open");
    overlay.classList.toggle("open");
    if (toggleBtn) {
        toggleBtn.classList.toggle("open");
    }
    
    // Disable background scroll when drawer is open
    document.body.style.overflow = drawer.classList.contains("open") ? "hidden" : "auto";
}

/* ==========================================================================
   SERVICES MENU FILTER
   ========================================================================== */

function renderServicesMenu(category) {
    const grid = document.getElementById("services-grid");
    grid.innerHTML = "";
    
    const filteredServices = category === 'all' 
        ? SERVICES 
        : SERVICES.filter(s => s.category === category);
        
    filteredServices.forEach(service => {
        const card = document.createElement("div");
        card.className = "service-card";
        card.innerHTML = `
            <div class="service-img-container">
                <img src="${service.image}" alt="${service.title}" loading="lazy">
            </div>
            <div class="service-card-body">
                <div>
                    <div class="service-meta">
                        <h4 class="service-title">${service.title}</h4>
                        <span class="service-price">₹${service.price}</span>
                    </div>
                    <p class="service-desc">${service.desc}</p>
                </div>
                <div class="service-footer">
                    <span class="service-duration">
                        <i class="fa-regular fa-clock"></i> ${service.duration}
                    </span>
                    <span class="service-select-btn" onclick="openBookingWizard('${service.title}')">
                        Book Now <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterServices(category, button) {
    // Remove active class from all tabs
    const tabs = document.querySelectorAll(".services-tabs .tab-btn");
    tabs.forEach(tab => tab.classList.remove("active"));
    
    // Add active class to clicked tab
    button.classList.add("active");
    
    renderServicesMenu(category);
}

/* ==========================================================================
   INTERACTIVE BOOKING WIZARD
   ========================================================================== */

function openBookingWizard(preselectedServiceTitle = null) {
    const modal = document.getElementById("booking-modal");
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // Prevent background scroll
    
    // Reset state
    bookingWizardState = {
        currentStep: 1,
        selectedServices: [],
        selectedDate: null,
        selectedTime: null,
        customerDetails: { name: '', phone: '', email: '', notes: '' }
    };
    
    // Pre-select service if passed
    if (preselectedServiceTitle) {
        const found = SERVICES.find(s => s.title === preselectedServiceTitle);
        if (found) {
            bookingWizardState.selectedServices.push(found.id);
        }
    }
    
    // Render Step 1
    goToStep(1);
}

function closeBookingWizard() {
    const modal = document.getElementById("booking-modal");
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
}

function goToStep(step) {
    bookingWizardState.currentStep = step;
    
    // Update Indicators
    for (let i = 1; i <= 4; i++) {
        const node = document.getElementById(`node-step${i}`);
        if (i === step) {
            node.className = "wizard-step-wrapper active";
        } else if (i < step) {
            node.className = "wizard-step-wrapper completed";
        } else {
            node.className = "wizard-step-wrapper";
        }
    }
    
    // Show Screen
    document.querySelectorAll(".wizard-screen").forEach(screen => {
        screen.classList.remove("active");
    });
    document.getElementById(`screen-step${step}`).classList.add("active");
    
    // Render step-specific content
    if (step === 1) {
        renderWizardServices();
    } else if (step === 2) {
        renderCalendar();
        renderTimeSlots();
    } else if (step === 3) {
        // Inputs will keep whatever values are in the form DOM
    } else if (step === 4) {
        renderReceipt();
    }
    
    // Update Control Buttons
    const prevBtn = document.getElementById("btn-wizard-prev");
    const nextBtn = document.getElementById("btn-wizard-next");
    const summaryInfo = document.getElementById("wizard-summary-info");
    
    // Back Button visibility
    if (step === 1 || step === 4) {
        prevBtn.style.display = "none";
    } else {
        prevBtn.style.display = "block";
    }
    
    // Next Button text
    if (step === 3) {
        nextBtn.innerText = "Review Summary";
    } else if (step === 4) {
        nextBtn.innerText = "Confirm Booking";
    } else {
        nextBtn.innerText = "Continue";
    }
    
    // Summary info visibility
    if (step === 4) {
        summaryInfo.style.visibility = "hidden";
    } else {
        summaryInfo.style.visibility = "visible";
        updateWizardFooterInfo();
    }
}

function prevWizardStep() {
    if (bookingWizardState.currentStep > 1) {
        goToStep(bookingWizardState.currentStep - 1);
    }
}

function nextWizardStep() {
    const current = bookingWizardState.currentStep;
    
    // Validation
    if (current === 1) {
        if (bookingWizardState.selectedServices.length === 0) {
            showToast("Please select at least one beauty treatment to continue.", "error");
            return;
        }
        goToStep(2);
    } else if (current === 2) {
        if (!bookingWizardState.selectedDate) {
            showToast("Please choose an appointment date from the calendar.", "error");
            return;
        }
        if (!bookingWizardState.selectedTime) {
            showToast("Please choose a time slot for your appointment.", "error");
            return;
        }
        goToStep(3);
    } else if (current === 3) {
        const name = document.getElementById("cust-name").value.trim();
        const phone = document.getElementById("cust-phone").value.trim();
        const email = document.getElementById("cust-email").value.trim();
        const notes = document.getElementById("cust-notes").value.trim();
        
        if (!name || !phone || !email) {
            showToast("Please fill out all required fields marked with *.", "error");
            return;
        }
        
        // Simple regex verification
        if (!validateEmail(email)) {
            showToast("Please enter a valid email address.", "error");
            return;
        }
        if (phone.length < 10) {
            showToast("Please enter a valid phone number.", "error");
            return;
        }
        
        bookingWizardState.customerDetails = { name, phone, email, notes };
        goToStep(4);
    } else if (current === 4) {
        // Complete the booking process
        saveNewBooking();
    }
}

// Step 1: Render Services List in Wizard
function renderWizardServices() {
    const listContainer = document.getElementById("wizard-services-list");
    listContainer.innerHTML = "";
    
    SERVICES.forEach(service => {
        const isSelected = bookingWizardState.selectedServices.includes(service.id);
        const item = document.createElement("div");
        item.className = `select-service-item ${isSelected ? 'selected' : ''}`;
        item.onclick = () => toggleWizardService(service.id);
        item.innerHTML = `
            <div class="service-item-left">
                <span class="service-item-title">${service.title}</span>
                <span class="service-item-duration"><i class="fa-regular fa-clock"></i> ${service.duration}</span>
            </div>
            <div class="service-item-right">
                <span class="service-item-price">₹${service.price}</span>
                <div class="service-checkbox">
                    ${isSelected ? '<i class="fa-solid fa-check"></i>' : ''}
                </div>
            </div>
        `;
        listContainer.appendChild(item);
    });
    updateWizardFooterInfo();
}

function toggleWizardService(serviceId) {
    const index = bookingWizardState.selectedServices.indexOf(serviceId);
    if (index === -1) {
        bookingWizardState.selectedServices.push(serviceId);
    } else {
        bookingWizardState.selectedServices.splice(index, 1);
    }
    renderWizardServices();
}

function updateWizardFooterInfo() {
    const totalElement = document.getElementById("wizard-temp-total");
    const countElement = document.getElementById("wizard-temp-count");
    
    let total = 0;
    bookingWizardState.selectedServices.forEach(id => {
        const service = SERVICES.find(s => s.id === id);
        if (service) total += service.price;
    });
    
    totalElement.innerText = `₹${total}`;
    const count = bookingWizardState.selectedServices.length;
    countElement.innerText = `${count} service${count !== 1 ? 's' : ''}`;
}

// Step 2: Render Calendar Widget
function renderCalendar() {
    const monthYear = document.getElementById("calendar-month-year");
    const daysGrid = document.getElementById("calendar-days");
    
    daysGrid.innerHTML = "";
    
    const year = calendarState.currentYear;
    const month = calendarState.currentMonth;
    
    const dateObj = new Date(year, month, 1);
    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    
    monthYear.innerText = `${monthNames[month]} ${year}`;
    
    // Weekday Labels
    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    weekdays.forEach(day => {
        const label = document.createElement("div");
        label.className = "calendar-day-label";
        label.innerText = day;
        daysGrid.appendChild(label);
    });
    
    // Padding days (empty slots before 1st of month)
    const firstDayIndex = dateObj.getDay();
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyCell = document.createElement("div");
        daysGrid.appendChild(emptyCell);
    }
    
    // Total days in current month
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    today.setHours(0,0,0,0);
    
    for (let day = 1; day <= totalDays; day++) {
        const cellDate = new Date(year, month, day);
        cellDate.setHours(0,0,0,0);
        
        const cell = document.createElement("div");
        cell.className = "calendar-day";
        cell.innerText = day;
        
        // Highlight if matches selectedDate
        const formattedCellDate = formatDateString(cellDate);
        if (bookingWizardState.selectedDate === formattedCellDate) {
            cell.classList.add("selected");
        }
        
        // Check if date is in the past or is Monday (Closed)
        const isPast = cellDate < today;
        const isMonday = cellDate.getDay() === 1; // 1 is Monday
        
        if (isPast || isMonday) {
            cell.classList.add("disabled");
        } else {
            cell.onclick = () => {
                bookingWizardState.selectedDate = formattedCellDate;
                bookingWizardState.selectedTime = null; // Reset time when date changes
                renderCalendar();
                renderTimeSlots();
            };
        }
        
        daysGrid.appendChild(cell);
    }
}

function prevMonth() {
    const today = new Date();
    if (calendarState.currentYear === today.getFullYear() && calendarState.currentMonth === today.getMonth()) {
        showToast("Cannot navigate to past months.", "error");
        return;
    }
    
    calendarState.currentMonth--;
    if (calendarState.currentMonth < 0) {
        calendarState.currentMonth = 11;
        calendarState.currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    calendarState.currentMonth++;
    if (calendarState.currentMonth > 11) {
        calendarState.currentMonth = 0;
        calendarState.currentYear++;
    }
    renderCalendar();
}

// Step 2: Render Time Slots
function renderTimeSlots() {
    const slotsGrid = document.getElementById("slots-grid");
    slotsGrid.innerHTML = "";
    
    if (!bookingWizardState.selectedDate) {
        slotsGrid.innerHTML = `<div style="grid-column: span 2; text-align: center; color: var(--clr-text-muted); font-size: 0.8rem; padding: 2rem 0;">Please select a date first.</div>`;
        return;
    }
    
    // Find already booked slots on this specific date
    const bookedTimeSlots = bookings
        .filter(b => b.date === bookingWizardState.selectedDate && b.status !== 'Cancelled')
        .map(b => b.time);
        
    AVAILABLE_SLOTS.forEach(time => {
        const isBooked = bookedTimeSlots.includes(time);
        const isSelected = bookingWizardState.selectedTime === time;
        
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = `slot-btn ${isBooked ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`;
        btn.innerText = time;
        
        if (isBooked) {
            btn.classList.add("disabled");
            btn.title = "This slot is fully booked";
        } else {
            btn.onclick = () => {
                bookingWizardState.selectedTime = time;
                renderTimeSlots();
            };
        }
        
        slotsGrid.appendChild(btn);
    });
}

// Step 4: Render Receipt Summary
function renderReceipt() {
    const receiptContainer = document.getElementById("booking-summary-receipt");
    
    let total = 0;
    let servicesHtml = "";
    bookingWizardState.selectedServices.forEach(id => {
        const s = SERVICES.find(srv => srv.id === id);
        if (s) {
            total += s.price;
            servicesHtml += `
                <div class="receipt-service-item">
                    <span>${s.title}</span>
                    <span>₹${s.price}</span>
                </div>
            `;
        }
    });
    
    const formattedDate = formatDatePretty(bookingWizardState.selectedDate);
    
    receiptContainer.innerHTML = `
        <div class="receipt-header">
            <div class="receipt-icon"><i class="fa-solid fa-calendar-check"></i></div>
            <h4>Review Booking Details</h4>
            <p>Iqra Beauty Parlour Premium Receipt</p>
        </div>
        <div class="receipt-details">
            <div class="receipt-row">
                <span class="receipt-label">Client Name:</span>
                <span class="receipt-value">${escapeHtml(bookingWizardState.customerDetails.name)}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Phone Number:</span>
                <span class="receipt-value">${escapeHtml(bookingWizardState.customerDetails.phone)}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Date:</span>
                <span class="receipt-value">${formattedDate}</span>
            </div>
            <div class="receipt-row">
                <span class="receipt-label">Scheduled Time:</span>
                <span class="receipt-value">${bookingWizardState.selectedTime}</span>
            </div>
            
            <div class="receipt-services">
                <div class="receipt-service-title">Requested Treatments</div>
                ${servicesHtml}
            </div>
            
            <div class="receipt-total">
                <span>Grand Total:</span>
                <span>₹${total}</span>
            </div>
        </div>
    `;
}

// Save New Booking to localStorage
function saveNewBooking() {
    const refId = "IQRA-" + Math.floor(1000 + Math.random() * 9000);
    const servicesList = bookingWizardState.selectedServices.map(id => SERVICES.find(s => s.id === id));
    const totalCost = servicesList.reduce((acc, curr) => acc + curr.price, 0);
    
    const newBooking = {
        id: refId,
        clientName: bookingWizardState.customerDetails.name,
        phone: bookingWizardState.customerDetails.phone,
        email: bookingWizardState.customerDetails.email,
        notes: bookingWizardState.customerDetails.notes,
        date: bookingWizardState.selectedDate,
        time: bookingWizardState.selectedTime,
        services: servicesList.map(s => s.title),
        total: totalCost,
        status: 'Pending', // Pending, Completed, Cancelled
        createdAt: new Date().toISOString()
    };
    
    bookings.unshift(newBooking);
    localStorage.setItem("iqra_parlour_bookings", JSON.stringify(bookings));
    
    // Clear and close
    closeBookingWizard();
    showToast(`Success! Your booking slot ${refId} has been reserved.`, "success");
    
    // Auto fill and scroll to tracker
    document.getElementById("booking-search-input").value = newBooking.phone;
    searchClientBookings();
    
    // Smooth scroll to tracker
    setTimeout(() => {
        document.getElementById("bookings-tracker").scrollIntoView({ behavior: 'smooth' });
    }, 500);
}

/* ==========================================================================
   CLIENT BOOKING TRACKER (DASHBOARD)
   ========================================================================== */

function searchClientBookings() {
    const phoneInput = document.getElementById("booking-search-input").value.trim();
    const listContainer = document.getElementById("client-bookings-list");
    
    if (!phoneInput) {
        showToast("Please enter your registered phone number.", "error");
        return;
    }
    
    // Filter bookings matching this phone
    const clientBookings = bookings.filter(b => b.phone.includes(phoneInput) || phoneInput.includes(b.phone));
    
    listContainer.innerHTML = "";
    
    if (clientBookings.length === 0) {
        listContainer.innerHTML = `
            <div class="booking-empty-notice">
                No active bookings found for phone number: <strong>${escapeHtml(phoneInput)}</strong>. Try checking another number.
            </div>
        `;
        return;
    }
    
    // Render client bookings
    clientBookings.forEach(booking => {
        const dateStr = formatDatePretty(booking.date);
        const card = document.createElement("div");
        card.className = "booking-card-item";
        card.innerHTML = `
            <div class="booking-card-info">
                <span class="booking-card-id">${booking.id}</span>
                <h4 class="booking-card-title">${booking.services.join(", ")}</h4>
                <div class="booking-card-time">
                    <i class="fa-solid fa-calendar-days"></i> ${dateStr} at ${booking.time}
                </div>
                <div style="font-size: 0.75rem; color: var(--clr-text-muted); margin-top: 0.2rem;">
                    Cost: <strong style="color: var(--clr-gold-primary);">₹${booking.total}</strong>
                </div>
            </div>
            <div class="booking-card-actions">
                <span class="booking-card-status ${booking.status.toLowerCase()}">${booking.status}</span>
                ${booking.status === 'Pending' ? `
                    <button class="btn-cancel-booking" onclick="cancelClientBooking('${booking.id}')">Cancel Slot</button>
                ` : ''}
            </div>
        `;
        listContainer.appendChild(card);
    });
}

function cancelClientBooking(bookingId) {
    if (confirm(`Are you sure you want to cancel your appointment ${bookingId}?`)) {
        const booking = bookings.find(b => b.id === bookingId);
        if (booking) {
            booking.status = 'Cancelled';
            localStorage.setItem("iqra_parlour_bookings", JSON.stringify(bookings));
            showToast(`Appointment ${bookingId} has been cancelled.`, "success");
            searchClientBookings();
            
            // Re-render admin dashboard if visible
            if (document.getElementById("admin-portal").classList.contains("active")) {
                renderAdminDashboard();
            }
        }
    }
}

/* ==========================================================================
   OWNER ADMIN PORTAL MANAGEMENT
   ========================================================================== */

function promptAdminLogin() {
    const password = prompt("Enter Owner Admin Passcode to view all slots:");
    if (password === null) return; // User cancelled
    
    // Simple verification passcode: 'iqra123'
    if (password === "iqra123" || password === "admin") {
        document.getElementById("admin-portal").classList.add("active");
        renderAdminDashboard();
        showToast("Welcome back, Iqra! Admin panel loaded successfully.", "success");
        
        // Scroll to admin portal
        setTimeout(() => {
            document.getElementById("admin-portal").scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        showToast("Incorrect passcode. Access Denied.", "error");
    }
}

function logoutAdmin() {
    document.getElementById("admin-portal").classList.remove("active");
    showToast("Logged out of Owner Panel.", "success");
}

function renderAdminDashboard() {
    const tableBody = document.getElementById("admin-bookings-table-body");
    const emptyNotice = document.getElementById("admin-empty-notice");
    
    tableBody.innerHTML = "";
    
    if (bookings.length === 0) {
        emptyNotice.style.display = "block";
        return;
    }
    emptyNotice.style.display = "none";
    
    bookings.forEach(booking => {
        const dateStr = formatDatePretty(booking.date);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td style="font-weight: 600; color: var(--clr-gold-primary);">${booking.id}</td>
            <td>
                <div class="admin-client-info">
                    <span class="admin-client-name">${escapeHtml(booking.clientName)}</span>
                    <span class="admin-client-contact">${escapeHtml(booking.phone)} | ${escapeHtml(booking.email)}</span>
                </div>
            </td>
            <td><span style="font-size: 0.8rem;">${booking.services.join(", ")}</span></td>
            <td>
                <div style="font-weight: 500;">${dateStr}</div>
                <div style="font-size: 0.75rem; color: var(--clr-text-muted);"><i class="fa-regular fa-clock"></i> ${booking.time}</div>
            </td>
            <td style="font-weight: 600; color: var(--clr-gold-primary);">₹${booking.total}</td>
            <td>
                <span class="booking-card-status ${booking.status.toLowerCase()}">${booking.status}</span>
            </td>
            <td>
                <div class="admin-actions">
                    ${booking.status === 'Pending' ? `
                        <button class="admin-action-btn complete" onclick="updateBookingStatus('${booking.id}', 'Completed')" title="Mark as Completed">
                            <i class="fa-solid fa-check"></i>
                        </button>
                        <button class="admin-action-btn cancel" onclick="updateBookingStatus('${booking.id}', 'Cancelled')" title="Cancel Slot">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    ` : ''}
                    <button class="admin-action-btn" onclick="deleteBookingPermanently('${booking.id}')" title="Delete Booking Permanently" style="background-color: rgba(255,255,255,0.03); color: var(--clr-text-muted); border: 1px solid rgba(255,255,255,0.08);">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateBookingStatus(bookingId, newStatus) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking) {
        booking.status = newStatus;
        localStorage.setItem("iqra_parlour_bookings", JSON.stringify(bookings));
        showToast(`Booking ${bookingId} has been marked as ${newStatus}.`, "success");
        renderAdminDashboard();
        
        // Refresh customer view if they are viewing
        searchClientBookings();
    }
}

function deleteBookingPermanently(bookingId) {
    if (confirm(`CRITICAL: Are you sure you want to permanently delete booking ${bookingId}? This action cannot be undone.`)) {
        bookings = bookings.filter(b => b.id !== bookingId);
        localStorage.setItem("iqra_parlour_bookings", JSON.stringify(bookings));
        showToast(`Booking ${bookingId} has been permanently deleted.`, "success");
        renderAdminDashboard();
        searchClientBookings();
    }
}

/* ==========================================================================
   TESTIMONIALS SLIDER
   ========================================================================== */

let currentSlideIndex = 0;
let testimonialTimer;

function startTestimonialSlider() {
    testimonialTimer = setInterval(() => {
        let nextIndex = currentSlideIndex + 1;
        const slides = document.querySelectorAll(".testimonial-slide");
        if (nextIndex >= slides.length) nextIndex = 0;
        setSlide(nextIndex);
    }, 5000);
}

function setSlide(index) {
    currentSlideIndex = index;
    
    // Reset timer
    clearInterval(testimonialTimer);
    startTestimonialSlider();
    
    const slides = document.querySelectorAll(".testimonial-slide");
    const dots = document.querySelectorAll("#slider-dots .slider-dot");
    
    slides.forEach((slide, idx) => {
        if (idx === index) {
            slide.classList.add("active");
        } else {
            slide.classList.remove("active");
        }
    });
    
    dots.forEach((dot, idx) => {
        if (idx === index) {
            dot.classList.add("active");
        } else {
            dot.classList.remove("active");
        }
    });
}

/* ==========================================================================
   DATA HELPER SERVICES
   ========================================================================== */

function initBookings() {
    const stored = localStorage.getItem("iqra_parlour_bookings");
    if (stored) {
        bookings = JSON.parse(stored);
    } else {
        // Pre-load two realistic bookings for demonstration / owner dashboard value
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const dayAfter = new Date();
        dayAfter.setDate(dayAfter.getDate() + 2);
        
        bookings = [
            {
                id: "IQRA-4982",
                clientName: "Anjali Deshmukh",
                phone: "9876543210",
                email: "anjali@gmail.com",
                notes: "Requesting light foundation for party makeup, sensitive skin.",
                date: formatDateString(tomorrow),
                time: "11:30 AM",
                services: ["Airbrush Luxury Makeover", "Precision Couture Cut & Blowdry"],
                total: 6100,
                status: "Pending",
                createdAt: new Date().toISOString()
            },
            {
                id: "IQRA-2983",
                clientName: "Priyanka Sen",
                phone: "9988776655",
                email: "priyanka@yahoo.com",
                notes: "Bridal booking. Draping style: Bengali style.",
                date: formatDateString(dayAfter),
                time: "02:30 PM",
                services: ["The Royal Imperial Bridal Makeup"],
                total: 18000,
                status: "Pending",
                createdAt: new Date().toISOString()
            }
        ];
        localStorage.setItem("iqra_parlour_bookings", JSON.stringify(bookings));
    }
}

function formatDateString(dateObj) {
    const yyyy = dateObj.getFullYear();
    let mm = dateObj.getMonth() + 1;
    let dd = dateObj.getDate();
    
    if (mm < 10) mm = '0' + mm;
    if (dd < 10) dd = '0' + dd;
    
    return `${yyyy}-${mm}-${dd}`;
}

function formatDatePretty(dateString) {
    if (!dateString) return "";
    const parts = dateString.split("-");
    const dateObj = new Date(parts[0], parts[1] - 1, parts[2]);
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    return `${days[dateObj.getDay()]}, ${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function escapeHtml(text) {
    if (!text) return "";
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.toString().replace(/[&<>"']/g, function(m) { return map[m]; });
}

/* ==========================================================================
   TOAST NOTIFICATION ENGINE
   ========================================================================== */

function showToast(message, type = "success") {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    
    let icon = '<i class="fa-solid fa-circle-check" style="color: var(--clr-success);"></i>';
    if (type === "error") {
        icon = '<i class="fa-solid fa-circle-xmark" style="color: var(--clr-error);"></i>';
    }
    
    toast.innerHTML = `
        ${icon}
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    // Slide out and remove after 4 seconds
    setTimeout(() => {
        toast.style.transform = "translateX(120%)";
        toast.style.transition = "transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)";
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, 4000);
}

/* ==========================================================================
   SCROLL REVEAL OBSERVER
   ========================================================================== */

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observerOptions = {
        root: null,
        threshold: 0.05, // Trigger when 5% of element is visible
        rootMargin: "0px 0px -40px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);
    
    reveals.forEach(el => revealObserver.observe(el));
}

/* ==========================================================================
   SCROLL PROGRESS BAR
   ========================================================================== */

function initScrollProgressBar() {
    window.addEventListener("scroll", () => {
        const progress = document.getElementById("scroll-progress");
        if (progress) {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            if (totalHeight > 0) {
                const percentage = (window.scrollY / totalHeight) * 100;
                progress.style.width = `${percentage}%`;
            }
        }
    });
}
