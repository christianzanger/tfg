import Cookie from './Cookie.js';

const imgs = document.querySelectorAll("img");
const query = window.location.search.substring(3);

const assignSrc = (img, index) => {
    fetch(`/images/searches/${query}/${index}.png`, {method: 'HEAD', credentials: "same-origin"}).then((response) => {
        if (response.status === 200) {
            const settings = new Cookie('settings');
            const cache =  (settings && settings.obj.settings.cache) ? '/cached' : '';
            img.src = `${cache}/images/searches/${query}/${index}.png`;
        } else {
            setTimeout(() => assignSrc(img, index), 200);
        }
    })
};

imgs.forEach((img, index) => assignSrc(img, index));

// Hide the progess bar
document.querySelector('.progress').style.display = 'none';

