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

  //jQuery function to tab content on privacy page
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

  //add logout asynchronous query if link exists
  const logoutLink = document.querySelector(".logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", ($e) => {
      $e.preventDefault();
      handleLogout();
    });
  }
});

const handleLogout = async () => {
  try {
    const response = await axios({
      method: "get",
      url: "/auth/signout",
    });
    if (response) {
      console.log("clicked");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Au revoir 👋",
        text: `${response.data.message}`,
        showConfirmButton: false,
        timer: 2000,
      }).then((result) => {
        if (result) {
          window.location.assign("/");
        }
      });
    }
  } catch (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Il y'a un probleme 😰",
      text: `${error.response.data.errors}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};
