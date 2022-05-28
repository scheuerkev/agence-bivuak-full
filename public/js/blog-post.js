window.addEventListener("DOMContentLoaded", () => {
  const btnDelete = document.querySelector("#btnDelete");
  if (btnDelete) {
    btnDelete.addEventListener("click", ($e) => {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: "Attention !",
        text: "Voulez-vous vraiment supprimer cet article ?",
        showDenyButton: true,
        confirmButtonText: "Oui",
        confirmButtonColor: "#016b6e",
        denyButtonText: "Non",
        customClass: {
          actions: "my-actions",
          confirmButton: "order-2",
          denyButton: "order-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const postId = $e.target.getAttribute("postId");

          axios
            .delete(`/blog/${postId}`)
            .then((response) => {
              console.log(response);
              window.location.assign("/blog");
            })
            .catch((error) => {
              console.log(error);
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Oupsi ! Il y a un problème 😰",
                text: "Impossible de supprimer l'article",
                showConfirmButton: false,
                timer: 2000,
              });
            });
        }
      });
    });
  }
});
