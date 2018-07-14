setTimeout(() => {
    const imgs = document.querySelectorAll("img");
    const query = window.location.search.substring(3);

    imgs.forEach((img, index) => {
       img.src = `/images/${query}/${index}.png`
    });

    // Hide the progess bar
    document.querySelector('.progress').style.display = 'none';
}, 1500);