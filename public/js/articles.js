window.addEventListener("DOMContentLoaded", () => {
  bindSuppression();
});

const bindSuppression = () => {
  const elements = document.querySelectorAll(".btn-danger");
  const articleContainer = document.querySelector("#art");

  elements.forEach((e) => {
    e.addEventListener("click", ($event) => {
      const articleId = $event.target.getAttribute("articleid");
      axios
        .delete("/blog/" + articleId)
        .then(function (res) {
          console.log({ res });
          //articleContainer.innerHTML = res.data;
          bindSuppression();
        })
        .catch((err) => console.log(err));
    });
  });
};
