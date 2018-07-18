# Project structure
- **assets**: JS, Images and CSS (minified or "classic")
    - **scripts**
    - **styles**
    - **images**
- **views**: pure HTML files
- **server.js**: main entry point...should probably subdivide this...probably :)
- **src**: server-side stuff. Really, here shouldn't be anything that gets requested from the client.
    - **app**:
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