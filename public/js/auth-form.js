window.addEventListener("DOMContentLoaded", (event) => {
  const sendAuthBtn = document.querySelector("#sendAuthBtn");

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
  const inputs = document.querySelectorAll(".form-control");
  const email = inputs[0].value;
  const password = inputs[1].value;

  // make axios post request
  try {
    const response = await axios({
      method: "post",
      url: "/auth/signin",
      data: {
        email,
        password,
      },
    });

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Yipeeee 🥳",
      text: `Content de vous revoir ${response.data.username}`,
      showConfirmButton: false,
      timer: 2000,
    }).then((result) => {
      if (result) {
        window.location.assign("/blog");
      }
    });
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
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
