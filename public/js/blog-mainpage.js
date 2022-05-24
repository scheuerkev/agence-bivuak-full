window.addEventListener("DOMContentLoaded", () => {
  bindPosts();
});

const bindPosts = () => {
  const elements = document.querySelectorAll(".fa-minus-circle");
  elements.forEach((e) => {
    e.addEventListener("click", ($event) => {
      const postId = $event.target.getAttribute("postId");
      axios
        .delete("/blog/" + postId)
        .then((res) => {
          location.reload();
          bindPosts();
        })
        .catch((err) => {
          console.log(err);
        });
    });
  });
};
