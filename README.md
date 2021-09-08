npm install express cors morgan --save
npm install -g nodemon


kör npm start om du lagt till scriptet:    

"start": "nodemon app.js"
 
 Annars kör node app.js
 eller nodemon app.js

 Routes ligger under index.js, dessa används i app.js
 params som skickas med, ex get, post, put används i asynkrona funktioner som tar emot informationen och skickar tebx resultat