window.addEventListener("DOMContentLoaded", (event) => {
  //Form validation
  (function () {
    "use strict";
    window.addEventListener(
      "load",
      function () {
        let forms = document.getElementsByClassName("needs-validation");

        let validation = Array.prototype.filter.call(forms, function (form) {
          form.addEventListener(
            "submit",
            function (event) {
              if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
              }
              form.classList.add("was-validated");
            },
            false
          );
        });
      },
      false
    );
  })();

  const contactForm = document.querySelector("#contactForm");
  const submitButton = document.querySelector("#submitButton");

  const inputs = document.querySelectorAll(".form-control");

  if (contactForm && submitButton) {
    submitButton.addEventListener("click", ($e) => {
      $e.preventDefault();

      const handleSubmit = async () => {
        const name = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const message = inputs[3].value;

        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "/message/new",
            data: {
              name,
              email,
              phone,
              message,
            },
          });
          Swal.fire({
            icon: "success",
            title: "Merci pour votre message !",
            text: "Nous revenons vers vous très rapidement, voici un petit cookie pour patienter 🍪",
            confirmButtonColor: "#016b6e",
          });
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
        } catch (error) {
          const errors = error.response.data.errors;
          Swal.fire({
            icon: "error",
            title: "Oups...",
            text: errors.join(" et "),
            confirmButtonColor: "#016b6e",
          });
        }
      };
      handleSubmit();
    });
  }
});
