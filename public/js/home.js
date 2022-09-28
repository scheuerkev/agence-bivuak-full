window.addEventListener("DOMContentLoaded", (event) => {
  //Regexp
  const nameChecker = /^[A-zÀ-ú\s]*$/;
  const noNumbers = /^([^0-9]*)$/;
  const emailChecker = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const phoneChecker = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;

  //DOM Selectors
  const contactForm = document.querySelector("#contactForm");
  const submitButton = document.querySelector("#submitButton");
  const inputs = document.querySelectorAll(".form-control");
  const errorsPlaceholder = document.querySelectorAll(".form-errors-infos");

  //Check inputs value with regexp
  inputs[0].addEventListener("blur", () => {
    !inputs[0].value.match(nameChecker)
      ? (inputs[0].classList.add("not-valid"),
        (errorsPlaceholder[0].innerHTML =
          "Le nom ne peut pas comporter de chiffres"))
      : (inputs[0].classList.remove("not-valid"),
        (errorsPlaceholder[0].innerHTML = ""));
  });

  inputs[1].addEventListener("blur", () => {
    !emailChecker.test(inputs[1].value)
      ? (inputs[1].classList.add("not-valid"),
        (errorsPlaceholder[1].innerHTML =
          "Le format de l'adresse email n'est pas valide"))
      : (inputs[1].classList.remove("not-valid"),
        (errorsPlaceholder[1].innerHTML = ""));
  });

  inputs[2].addEventListener("blur", () => {
    !inputs[2].value.match(phoneChecker)
      ? (inputs[2].classList.add("not-valid"),
        (errorsPlaceholder[2].innerHTML =
          "Le format du numéro de téléphone n'est pas valide"))
      : (inputs[2].classList.remove("not-valid"),
        (errorsPlaceholder[2].innerHTML = ""));
  });

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
          inputs.forEach((element) => (element.value = ""));
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
