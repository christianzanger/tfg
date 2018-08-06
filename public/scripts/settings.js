import Cookie from './Cookie.js';

const statsCookie = new Cookie('settings');
document.getElementById("compression").checked = statsCookie.obj.settings ? statsCookie.obj.settings.compression : false;

document.getElementById("settings").addEventListener("submit", (e) => {
    const statsCookie = new Cookie('settings');
    statsCookie.obj.settings = {
        compression: document.getElementById("compression").checked
    };

    statsCookie.updateCookie();

    M.toast({html: 'Settings saved!'});
    e.preventDefault();
});