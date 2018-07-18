import Cookie from './Cookie.js';

const statsCookie = new Cookie('settings');
document.getElementById("compression").checked = statsCookie.obj.settings.compression;

document.getElementById("settings").addEventListener("submit", (e) => {
    const statsCookie = new Cookie('settings');
    statsCookie.obj.settings = {
        compression: document.getElementById("compression").checked
    };

    statsCookie.updateCookie();

    fetch('/savehistory', {credentials: "same-origin", method: "POST"}).then((response) => {
        if (response.ok) {
            M.toast({html: 'Settings saved!'})
        } else {
            M.toast({html: 'Something went wrong...Look at the server console!'});
        }
    });

    e.preventDefault();
});