import Cookie from './Cookie.js';

const statsCookie = new Cookie('settings');
document.getElementById("compression").checked = statsCookie.obj.settings.compression;
console.log(statsCookie.obj.settings.compression);

document.getElementById("settings").addEventListener("submit", (e) => {
    const statsCookie = new Cookie('settings');
    statsCookie.obj.settings = {
        compression: document.getElementById("compression").checked
    };
    statsCookie.updateCookie();
});