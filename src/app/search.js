setTimeout(() => {
    const baseURL = "/images/%s/%d.png";
    const imgs = document.querySelectorAll("img");
    const query = window.location.search.substring(3);

    imgs.forEach((img, index) => {
       img.src = baseURL.replace("%s/%d", `${query}/${index}`);
    });

    document.querySelector('.progress').style.display = 'none';
}, 1500);