const baseURL = "/images/%s/%d.png";
setTimeout(() => {
   document.querySelectorAll("img").forEach((img, index) => {
       img.src = baseURL.replace("%s/%d", `${window.location.search.substring(3)}/${index}`);
   });
}, 1500);