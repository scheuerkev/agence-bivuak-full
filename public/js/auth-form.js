window.addEventListener("DOMContentLoaded", (event) => {
  const authForm = document.querySelector("#authForm");
  const submitButton = document.querySelector("#sendAuthBtn");

  const inputs = document.querySelectorAll(".form-control");

  if (authForm && submitButton) {
    submitButton.addEventListener("click", ($e) => {
      $e.preventDefault();

      const handleSubmit = async () => {
        const email = inputs[0].value;
        const password = inputs[1].value;

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
