// import Cookie from "./Cookie";
//
// async function syncStatsWithServer() {
//     return await (await fetch('/sync', {credentials: "same-origin"})).json();
// }

const imgs = document.querySelectorAll("img");
const query = window.location.search.substring(3);
let nimgs = imgs.length;
let loadedimgs = 0;
const assignSrc = (img, index) => {
    fetch(`/images/searches/${query}/${index}.png`, {method: 'HEAD', credentials: "same-origin"}).then((response) => {
        if (response.ok) {
            img.src = `/images/searches/${query}/${index}.png`;
            if (++loadedimgs === nimgs) {

            }
        } else {
            setTimeout(() => assignSrc(img, index), 100);
        }
    })
};

imgs.forEach((img, index) => assignSrc(img, index));

// Hide the progess bar
document.querySelector('.progress').style.display = 'none';

