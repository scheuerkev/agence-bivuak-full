window.addEventListener("DOMContentLoaded", (event) => {
  const sendAuthBtn = document.querySelector("#sendAuthBtn");
  const inputs = document.querySelectorAll(".form-control");

  surveyForm();

  sendAuthBtn.addEventListener("click", ($e) => {
    $e.preventDefault();

    handleSubmit();
  });
});

const surveyForm = () => {
  window.addEventListener(
    "load",
    () => {
      let inputs = document.querySelectorAll(".needs-validation");
      Array.prototype.slice.call(inputs).forEach((input) => {
        input.addEventListener(
          "change",
          ($e) => {
            if (!input.checkValidity()) {
              input.classList.add("invalid");
              $e.preventDefault();
              $e.stopPropagation();
            } else {
              input.classList.remove("invalid");
            }
          },
          false
        );
      });
    },
    false
  );
};

const handleSubmit = async () => {
  const email = inputs[0].value;
  const password = inputs[1].value;

  try {
    // make axios post request
    axios
      .post("/auth/signin", { email, password })
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Yipeeee 🥳",
          text: `Content de vous revoir ${res.data.username}`,
          showConfirmButton: false,
          timer: 3000,
        }).then((result) => {
          if (result) {
            window.location.href = "/blog";
          }
        });
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].value = "";
        }
      })
      .catch((error) => {
        console.log(error);

        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Il y'a eu un probleme 😰",
          text: `${error.response.data.errors}`,
          showConfirmButton: false,
          timer: 3000,
        });
      });
  } catch (error) {
    console.log(error);
    const e = error.response.data.errors;
    Swal.fire({
      icon: "error",
      title: "Oups...",
      text: e,
      confirmButtonColor: "#016b6e",
    });
  }
};
