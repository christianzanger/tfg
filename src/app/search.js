// import Cookie from "./Cookie";
//
// async function syncStatsWithServer() {
//     return await (await fetch('/sync', {credentials: "same-origin"})).json();
// }

const imgs = document.querySelectorAll("img");
const query = window.location.search.substring(3);
const assignSrc = (img, index) => {
    fetch(`/images/${query}/${index}.png`, {method: 'HEAD', credentials: "same-origin"}).then((response) => {
        if (response.ok) {
            img.src = `/images/${query}/${index}.png`;
        } else {
            setTimeout(assignSrc(img, index), 200);
        }
    })
};

imgs.forEach((img, index) => assignSrc(img, index));

// Hide the progess bar
document.querySelector('.progress').style.display = 'none';
    //
    // // TODO: This WONT WORK!! here the SRC get changed, but the images aren't LOADED YET!!!
    // syncStatsWithServer().then((data) => {
    //     const statsCookie = new Cookie("stats");
    //     statsCookie.obj.images.downloadedBytes = data.images.downloadedBytes;
    //     statsCookie.obj.images.numberOfImages = data.images.numberOfImages;
    //     statsCookie.updateCookie();
    //
    //
    // });
    //
    // fetch('/savehistory', {credentials: "same-origin", method: "POST"});