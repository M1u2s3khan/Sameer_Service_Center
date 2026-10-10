
/* ---------- WhatsApp Number ---------- */
const WA_NUMBER = '918882165226';

/* ---------- Mobile Menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const navLinks   = document.getElementById('navLinks');

function closeMenu() {
    navLinks.classList.remove('open');
    menuToggle.textContent = '☰';
    menuToggle.setAttribute('aria-expanded', 'false');
}

menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    menuToggle.textContent = isOpen ? '✕' : '☰';
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)) {
        closeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
});

/* ---------- Header Shadow on Scroll ---------- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ---------- Reveal on Scroll ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 70);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Counter Animation ---------- */
const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = +el.dataset.count;
            const duration = 1600;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target).toLocaleString('en-IN') + '+';
                if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

/* ---------- FAQ Accordion ---------- */
document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
    });
});

/* ============================================================
   WHATSAPP SENDER
   ============================================================ */
function openWhatsApp(message) {
    const url = 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

/* ---------- Quick Booking ---------- */
function quickBook(e) {
    e.preventDefault();

    const name    = document.getElementById('qName').value.trim();
    const phone   = document.getElementById('qPhone').value.trim();
    const service = document.getElementById('qService').value;

    if (!name || !phone || !service) {
        alert('Kripya saari details bharein.');
        return false;
    }
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        alert('Kripya sahi 10-digit mobile number daalein.');
        return false;
    }

    const msg =
`🔧 *New Quick Service Request*
━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📱 *Phone:* ${phone}
🛠️ *Service:* ${service}
━━━━━━━━━━━━━━━━━━
CoolZen Service Center – Book Service`;

    openWhatsApp(msg);
    e.target.reset();
    return false;
}

/* ---------- Full Booking Form ---------- */
function submitBooking(e) {
    e.preventDefault();

    const name        = document.getElementById('name').value.trim();
    const phone       = document.getElementById('phone').value.trim();
    const email       = document.getElementById('email').value.trim();
    const city        = document.getElementById('city').value.trim();
    const address     = document.getElementById('address').value.trim();
    const serviceType = document.getElementById('service-type').value;
    const appliance   = document.getElementById('appliance').value.trim();
    const date        = document.getElementById('date').value;
    const slot        = document.getElementById('slot').value;
    const notes       = document.getElementById('message').value.trim();

    if (!name || !phone || !city || !address || !serviceType) {
        alert('Kripya sabhi zaroori fields (*) bharein.');
        return false;
    }
    if (!/^[6-9][0-9]{9}$/.test(phone)) {
        alert('Kripya sahi 10-digit mobile number daalein.');
        return false;
    }

    let msg = `🔧 *New Service Booking – CoolZen*\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `👤 *Name:* ${name}\n`;
    msg += `📱 *Phone:* ${phone}\n`;
    if (email)      msg += `📧 *Email:* ${email}\n`;
    msg += `🏙️ *City:* ${city}\n`;
    msg += `📍 *Address:* ${address}\n`;
    msg += `🛠️ *Service:* ${serviceType}\n`;
    if (appliance)  msg += `🔖 *Brand/Model:* ${appliance}\n`;
    if (date)       msg += `📅 *Preferred Date:* ${date}\n`;
    if (slot)       msg += `🕒 *Time Slot:* ${slot}\n`;
    if (notes)      msg += `📝 *Problem:* ${notes}\n`;
    msg += `━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please confirm booking. Dhanyawad!`;

    openWhatsApp(msg);
    e.target.reset();
    return false;
}

/* ---------- Smooth Scroll with offset ---------- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId.length < 2) return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ---------- Set min date for booking ---------- */
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
}

