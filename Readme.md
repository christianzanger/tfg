# Project structure
- **public**: JS, Images and CSS (minified or "classic")
    - **images**
        - **searches**: subdirectories and images created by generation.js
        - **static**: images that shouldn't change (landing bg)
    - **pages**: HTML files
    - **scripts**: client JS
    - **styles**: CSS
- **server.js**: main entry point...should probably subdivide this...probably :)
- **src**: server-side stuff. Really, here shouldn't be anything that gets requested from the client.
    - **app**: for example generation.js
    - **components**: React components





# Old Project structure
(this wasn't really scalable... :D I should've planned better ahead).
Leaving this here for broken links and refatoring
- **classic**: pure HTML files
- **images**:
    - landing: images for the landing page
    - searches: generating searches images
- **public**: "static" assets: CSS, images (?) and JS
- **src**:
    - app: All javascript files
    - components:
    - styles: compiled styles
    - app.js: app file for React