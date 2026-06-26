/**
 * LPCI - Coming Soon Core Logic
 */

// Syllabus Data for levels
const SYLLABUS_DATA = {
    foundation: {
        pretitle: "CA Foundation Track",
        title: "Establishing Core Competencies",
        highlights: ["Daily Practice Sheets", "Legal Case Briefings", "Formula Visualizers"],
        topics: [
            {
                name: "Principles & Practice of Accounting",
                meta: "Paper 1",
                desc: "Establish a flawless foundation in double-entry bookkeeping, trial balance reconciliations, ledger configurations, and final financial statements."
            },
            {
                name: "Mercantile Laws",
                meta: "Paper 2",
                desc: "Understand the Indian Contract Act, 1872, Sale of Goods Act, 1930, Partnership Act, 1932, and key business regulatory frameworks."
            },
            {
                name: "Quantitative Aptitude",
                meta: "Paper 3",
                desc: "Accelerate calculation speeds for ratios, compounding interest, statistics, logical reasoning, and equations."
            }
        ]
    },
    intermediate: {
        pretitle: "CA Intermediate Track",
        title: "Professional Core Competency",
        highlights: ["Dual-Group Track Separator", "Audit Mock Cases", "Direct & Indirect Tax Modules"],
        topics: [
            {
                name: "Advanced Accounting",
                meta: "Group 1",
                desc: "Corporate accounting standards, company restructuring, consolidation of financial statements, and asset-liability valuations."
            },
            {
                name: "Auditing & Assurance",
                meta: "Group 2",
                desc: "Engagement frameworks, audit documentation, risk assessment, fraud investigation protocols, and statutory audit reporting."
            },
            {
                name: "Taxation (Direct & Indirect)",
                meta: "Group 1",
                desc: "Analyze income tax computations, Deductions at Source (TDS), GST laws, input tax credits, and filing filings."
            }
        ]
    },
    final: {
        pretitle: "CA Final Track",
        title: "Specialized Mastery & Strategy",
        highlights: ["Boardroom Case Studies", "Strategic Portfolios", "Senior CA Mock Vetting"],
        topics: [
            {
                name: "Financial Reporting",
                meta: "Module A",
                desc: "Mastery of Indian Accounting Standards (Ind AS), global reporting conventions, corporate valuation rules, and restructuring schemas."
            },
            {
                name: "Strategic Financial Management",
                meta: "Module B",
                desc: "Portfolio analysis, options & futures pricing, merger & acquisition valuations, forex risks management, and capital allocation strategies."
            }
        ]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initCountdown();
    initSubtitleRotator();
    initModals();
    initNewsletter();
    initRegistrantDashboard();
});

/* Theme Toggler */
function initTheme() {
    const themeToggleBtn = document.getElementById("themeToggleBtn");
    
    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const currentTheme = document.body.classList.contains("light-theme") ? "light" : "dark";
        localStorage.setItem("theme", currentTheme);
        showToast(`Switched to ${currentTheme} mode`, "success");
    });
}

/* Dynamic Countdown Timer (45 Days from user's current session) */
function initCountdown() {
    // Check if we have a target date in localStorage, otherwise set a new one 45 days from now
    let targetTime = localStorage.getItem("countdownTarget");
    if (!targetTime) {
        const fortyFiveDaysMs = 45 * 24 * 60 * 60 * 1000;
        targetTime = new Date().getTime() + fortyFiveDaysMs;
        localStorage.setItem("countdownTarget", targetTime.toString());
    } else {
        // If target date has passed, reset it for demonstration purposes
        if (new Date().getTime() > parseInt(targetTime)) {
            const fortyFiveDaysMs = 45 * 24 * 60 * 60 * 1000;
            targetTime = new Date().getTime() + fortyFiveDaysMs;
            localStorage.setItem("countdownTarget", targetTime.toString());
        }
    }

    const targetDate = new Date(parseInt(targetTime));

    const daysVal = document.getElementById("days");
    const hoursVal = document.getElementById("hours");
    const minutesVal = document.getElementById("minutes");
    const secondsVal = document.getElementById("seconds");

    function updateTimer() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(timerInterval);
            daysVal.textContent = "00";
            hoursVal.textContent = "00";
            minutesVal.textContent = "00";
            secondsVal.textContent = "00";
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysVal.textContent = String(days).padStart(2, '0');
        hoursVal.textContent = String(hours).padStart(2, '0');
        minutesVal.textContent = String(minutes).padStart(2, '0');
        secondsVal.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

/* Subtitle Taglines Rotator */
function initSubtitleRotator() {
    const subtitleElement = document.getElementById("subtext-container");
    const phrases = [
        "CA Foundation: Establishing robust fundamentals in ledger entries, mercantile laws, and quantitative skills.",
        "CA Intermediate: Separated group-level tracking with advanced taxation, auditing standards, and accounts.",
        "CA Final: Specialized mastery modules in financial reporting and strategic corporate management."
    ];
    let currentIndex = 0;
    
    // Rotate subtext every 6 seconds with a quick fade animation
    setInterval(() => {
        subtitleElement.style.opacity = "0";
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % phrases.length;
            subtitleElement.textContent = phrases[currentIndex];
            subtitleElement.style.opacity = "1";
        }, 400);
    }, 6000);

    subtitleElement.style.transition = "opacity 0.4s ease";
}

/* Drawer Syllabus Modal Logic */
function initModals() {
    const modalOverlay = document.getElementById("modalOverlay");
    const modalCloseBtn = document.getElementById("modalCloseBtn");
    const modalBody = document.getElementById("modalBody");
    const exploreButtons = document.querySelectorAll(".explore-btn");

    function openModal(levelKey) {
        const data = SYLLABUS_DATA[levelKey];
        if (!data) return;

        // Render syllabus layout inside modal card
        let topicsHtml = data.topics.map(topic => `
            <div class="syllabus-topic">
                <div class="syllabus-topic-header">
                    <h5>${topic.name}</h5>
                    <span class="syllabus-topic-meta">${topic.meta}</span>
                </div>
                <p>${topic.desc}</p>
            </div>
        `).join('');

        let highlightsHtml = data.highlights.map(hl => `
            <div class="modal-highlight-item">
                <span class="modal-highlight-icon">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </span>
                <span>${hl}</span>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="modal-title-wrapper">
                <span class="modal-pretitle">${data.pretitle}</span>
                <h3 class="modal-title">${data.title}</h3>
            </div>
            <div class="modal-syllabus-section">
                ${topicsHtml}
            </div>
            <div class="modal-highlights">
                ${highlightsHtml}
            </div>
        `;

        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent body scroll
    }

    function closeModal() {
        modalOverlay.classList.remove("active");
        document.body.style.overflow = "";
    }

    exploreButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const target = btn.getAttribute("data-target");
            openModal(target);
        });
    });

    modalCloseBtn.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && modalOverlay.classList.contains("active")) {
            closeModal();
        }
    });
}

/* Newsletter Registration Handling */
function initNewsletter() {
    const form = document.getElementById("subscribeForm");
    const emailInput = document.getElementById("emailInput");
    const submitBtn = document.getElementById("submitBtn");
    const btnText = submitBtn.querySelector(".btn-text");
    const btnSpinner = submitBtn.querySelector(".btn-spinner");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value.trim().toLowerCase();

        if (!validateEmail(email)) {
            showToast("Please enter a valid email address", "error");
            return;
        }

        // Show spinner / loading state
        submitBtn.disabled = true;
        btnText.classList.add("hidden");
        btnSpinner.classList.remove("hidden");

        // Simulate network API request
        setTimeout(() => {
            // Save email to LocalStorage for review
            let vips = JSON.parse(localStorage.getItem("vipEmails") || "[]");
            if (vips.includes(email)) {
                showToast("You are already registered for early access!", "error");
            } else {
                vips.push(email);
                localStorage.setItem("vipEmails", JSON.stringify(vips));
                showToast("Pre-registration successful! Welcome to the elite tier.", "success");
                emailInput.value = "";
                
                // Refresh dynamic registrants dashboard if open
                updateRegistrantDashboard();
            }

            // Restore button state
            submitBtn.disabled = false;
            btnText.classList.remove("hidden");
            btnSpinner.classList.add("hidden");
        }, 1200);
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/* Toast Alerts Provider */
function showToast(message, type = "success") {
    const container = document.getElementById("toastContainer");
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
            <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
    `;

    if (type === "error") {
        icon = `
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
        `;
    }

    toast.innerHTML = `
        <span style="display:flex;align-items:center;">${icon}</span>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    // Fade and remove after 4 seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(50px)";
        toast.style.transition = "all 0.5s ease";
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

/* Local VIP Registrant Board Handler */
function initRegistrantDashboard() {
    const toggleBtn = document.getElementById("viewRegistrantsToggle");
    const panel = document.getElementById("vipRegistrantsSection");
    const clearBtn = document.getElementById("clearVipsBtn");

    // Click links to toggle display of dashboard panel
    toggleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        panel.classList.toggle("hidden");
        if (!panel.classList.contains("hidden")) {
            updateRegistrantDashboard();
            // Scroll to dashboard panel smoothly
            panel.scrollIntoView({ behavior: 'smooth' });
        }
    });

    clearBtn.addEventListener("click", () => {
        localStorage.removeItem("vipEmails");
        updateRegistrantDashboard();
        showToast("VIP registration list cleared", "success");
    });
}

function updateRegistrantDashboard() {
    const container = document.getElementById("vipEmailContainer");
    const panel = document.getElementById("vipRegistrantsSection");
    const vips = JSON.parse(localStorage.getItem("vipEmails") || "[]");

    if (vips.length === 0) {
        container.innerHTML = `<p style="font-style:italic;color:var(--text-muted);">No early access signups found in local database. Be the first!</p>`;
    } else {
        container.innerHTML = vips.map(email => `
            <div class="registrant-tag">
                <span>${email}</span>
            </div>
        `).join('');
    }
}
