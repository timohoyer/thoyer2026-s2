/* ==========================================================================
   APPLICATION ENGINE — TIMO HOYER PORTFOLIO (thoyer2026-s2)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initLiquidHeader();
    initInteractiveCards();
});

/**
 * 1. LIQUID GLASS HEADER CONTROLLER
 * Adds visual weight and frosted saturation to the sticky navigation bar on scroll.
 */
function initLiquidHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Invoke once in case page loads scrolled
}

/**
 * 2. PREMIUM 3D PARALLAX CARD TILT EFFECT
 * Implements a dynamic 3D perspective tilt on project cards and gallery cards on mouse move,
 * creating a state-of-the-art interactive response.
 */
function initInteractiveCards() {
    const cards = document.querySelectorAll('.card-hover, .project-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // Mouse position x inside card
            const y = e.clientY - rect.top;  // Mouse position y inside card

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Calculate degree rotation (Max 8 degrees)
            const rotateX = ((centerY - y) / centerY) * 8;
            const rotateY = ((x - centerX) / centerX) * 8;

            // Apply 3D rotation matrix securely via styles
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.01)`;
            card.style.transition = 'transform 0.1s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            // Reset to default base state smoothly
            card.style.transform = '';
            card.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });
}
