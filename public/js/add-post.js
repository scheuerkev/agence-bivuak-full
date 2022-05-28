window.addEventListener("DOMContentLoaded", (event) => {
  const createPostButton = document.querySelector("#createPost");
  const inputs = document.querySelectorAll(".form-control");
  const currentPage = new URL(window.location.href);

  if (currentPage.pathname === "/blog/new") {
    createPostButton.addEventListener("click", ($e) => {
      $e.preventDefault();

      const handleSubmit = async () => {
        const title = inputs[0].value;
        const content = inputs[1].value;
        const markdown = inputs[2].value;

        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "/blog",
            data: {
              title,
              content,
              markdown,
            },
          });
          Swal.fire({
            icon: "success",
            title: "Article bien envoyé !",
            text: "🚀 Prêt à conquérir le monde ?",
            confirmButtonColor: "#016b6e",
          });
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
          window.location.href = "/blog";
        } catch (error) {
          const e = error.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oups...",
            text: e,
            confirmButtonColor: "#016b6e",
          });
        }
      };
      handleSubmit();
    });
  } else {
    const pathnameElements = currentPage.pathname.split("/");

    createPostButton.addEventListener("click", ($e) => {
      $e.preventDefault();

      const handleSubmit = async () => {
        const title = inputs[0].value;
        const content = inputs[1].value;
        const markdown = inputs[2].value;

        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "/blog/update/" + pathnameElements[3],
            data: {
              title,
              content,
              markdown,
            },
          });
          Swal.fire({
            icon: "success",
            title: "Article modifié !",
            text: "🚀 Prêt à conquérir le monde ?",
            confirmButtonColor: "#016b6e",
          });
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = "";
          }
          window.location.href = "/blog";
        } catch (error) {
          const e = error.response.data.message;
          Swal.fire({
            icon: "error",
            title: "Oups...",
            text: e,
            confirmButtonColor: "#016b6e",
          });
        }
      };
      handleSubmit();
    });
  }

  const imageInput = document.querySelector("#hero-image");
  const imageContent = document.querySelector("#image-content");

  imageContent.addEventListener("click", () => {
    imageInput.click();
  });
  imageInput.addEventListener("change", ($e) => {
    imageContent.submit();
    $e.stopPropagation();
  });
});
