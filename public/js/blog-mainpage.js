window.addEventListener("DOMContentLoaded", () => {
    bindPosts();
});

const bindPosts = () => {
    const elements = document.querySelectorAll('.fa-minus-circle');
    const postsContainer = document.querySelector('#posts-container');
    elements.forEach(e => {
        e.addEventListener("click", ($event) => {
            const postId = $event.target.getAttribute('postId');
            axios
                .delete('/blog/' + postId)
                .then(response => {
                    console.log(response.data);
                    //postsContainer.innerHTML = response.data;
                    bindPosts();
                })
                .catch(err => {
                    console.log(err);
                })
        });
    })
}