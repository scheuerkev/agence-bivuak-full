window.addEventListener("DOMContentLoaded", (event) => {
  // Navbar shrink function
  const navbarShrink = () => {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
      navbarCollapsible.classList.add("navbar-no-box-shadow");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
      navbarCollapsible.classList.remove("navbar-no-box-shadow");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  // const mainNav = document.body.querySelector("#mainNav");
  // if (mainNav) {
  //   new bootstrap.ScrollSpy(document.body, {
  //     target: "#mainNav",
  //     offset: 74,
  //   });
  // }

  $("#mentions-tabList a").on("click", function (e) {
    e.preventDefault();
    $(this).tab("show");
  });

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });
});
