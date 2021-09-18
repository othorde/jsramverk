[![Build Status](https://app.travis-ci.com/othorde/jsramverk.svg?branch=backend)](https://app.travis-ci.com/othorde/jsramverk)

    - npm install
    -------------------------------
        - express --save
        - --save-dev nodemon
        - express cors morgan --save
        - mongodb --save
        - --save-dev mocha
        - --save-dev nyc
        - chai chai-http --save-dev
    --------------------------------


kör npm start om du lagt till scriptet:    

"start": "nodemon app.js"
 
 Annars kör node app.js
 eller nodemon app.js

 Routes ligger under index.js, dessa används i app.js
 params som skickas med, ex get, post, put används i asynkrona funktioner som tar emot informationen och skickar tebx resultat