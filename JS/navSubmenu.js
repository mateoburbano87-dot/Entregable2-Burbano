// Controla el comportamiento de los submenús del navbar, incluyendo apertura, cierre y navegación anidada.
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector("header");
    const submenuToggles = document.querySelectorAll(
        ".dropdown-submenu > .dropdown-item.dropdown-toggle"
    );
    const submenus = document.querySelectorAll(".dropdown-submenu > .dropdown-menu");
    const submenuItems = document.querySelectorAll(".dropdown-submenu");

    const resetParentMenu = (submenu) => {
        if (!submenu) {
            return;
        }
        const parentMenu = submenu.closest(".dropdown-submenu")?.closest(".dropdown-menu");
        if (parentMenu) {
            parentMenu.classList.remove("submenu-parent-hidden");
        }
    };

    const closeAllSubmenus = (exceptMenu = null) => {
        submenus.forEach((menu) => {
            if (menu !== exceptMenu) {
                menu.classList.remove("show");
                resetParentMenu(menu);
            }
        });
        submenuItems.forEach((item) => item.classList.remove("dropdown-submenu-open"));
    };

    submenuToggles.forEach((toggle) => {
        toggle.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            const submenu = toggle.nextElementSibling;
            if (!submenu) {
                return;
            }
            const isOpen = submenu.classList.contains("show");
            closeAllSubmenus(submenu);
            const submenuItem = toggle.closest(".dropdown-submenu");
            const parentMenu = toggle.closest(".dropdown-menu");
            submenu.classList.toggle("show", !isOpen);
            if (submenuItem) {
                submenuItem.classList.toggle("dropdown-submenu-open", !isOpen);
            }
            if (parentMenu) {
                parentMenu.classList.toggle("submenu-parent-hidden", !isOpen);
            }
        });
    });

    document.querySelectorAll(".dropdown-submenu .submenu-back").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            event.stopPropagation();
            const submenu = btn.closest(".dropdown-menu");
            if (submenu) {
                submenu.classList.remove("show");
                const submenuItem = submenu.closest(".dropdown-submenu");
                if (submenuItem) {
                    submenuItem.classList.remove("dropdown-submenu-open");
                }
                resetParentMenu(submenu);
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".dropdown-submenu")) {
            closeAllSubmenus();
        }
    });

    const mainDropdown = document.querySelector(".nav-item.dropdown");
    if (mainDropdown) {
        mainDropdown.addEventListener("shown.bs.dropdown", () => {
            if (header) {
                header.classList.add("nav-submenu-open");
            }
        });
        mainDropdown.addEventListener("hidden.bs.dropdown", () => {
            closeAllSubmenus();
            if (header) {
                header.classList.remove("nav-submenu-open");
            }
        });
    }
});
