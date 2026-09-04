function initMenu() {
    const toggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('menuOverlay');
    const closeBtn = document.getElementById('sideMenuClose');

    if (!toggle || !sideMenu || !overlay) return;

    function openMenu() {
        sideMenu.classList.add('open');
        overlay.classList.add('open');
        toggle.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('menu-open');
    }

    function closeMenu() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    }

    toggle.addEventListener('click', () => {
        sideMenu.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);
    closeBtn.addEventListener('click', closeMenu);

    sideMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeMenu();
    });

    window.matchMedia('(min-width: 1025px)').addEventListener('change', (event) => {
        if (event.matches) closeMenu();
    });
}

document.addEventListener('DOMContentLoaded', initMenu);
