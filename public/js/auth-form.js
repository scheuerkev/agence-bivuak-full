window.addEventListener("DOMContentLoaded", (event) => {
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
            url: "/auth/signin",
            data: {
              email,
              password,
            },
          });

          let timerInterval;
          Swal.fire({
            icon: "success",
            title: "Content de vous revoir !",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const b = Swal.getHtmlContainer().querySelector("b");
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            },
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
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
