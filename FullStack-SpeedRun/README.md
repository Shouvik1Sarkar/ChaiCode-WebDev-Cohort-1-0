# Process step by step

1. initiate npm: - npm init
2. create index.js
3. package.json "type": "module", - to set import
4. import express - npm install express
5. import express from "express";
6. copy paste/ write express boilerplate code
7. install nodemon -> npm i -D nodemon (dev dependency) so that we don't need to restart

8. change the script to ->
   "scripts": {
   "start": "nodemon index.js"
   },
   Now you can start the project with -> npm run start

9. import dotenv = npm i dotenv
10. import dotenv from "dotenv/config"
    or
    import dotenv from "dotenv"
    dotenv.config()
11. const port = process.env.PORT || 4000;

12. npm i cors

# websites / books recomended

1.  https://semver.org/

# Common mistakes:

"/piyush" -> "piyush" don't forget the "/"
