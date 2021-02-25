# Ballistic Node.js scalable code using S.O.L.I.D principle including bable cli and ES6 javascript Rules
### Easy deployment and building stage and prod.

### Covered rules such as:
- [x] Routes Versioning
- [x] Controller contains function layer.
- [x] Main logic written in services
- [x] Query handling in collection index.js and db schema in db-schema.js
- [x] Static data files, temp uploaded files and Static Images placed in Plublic folder.
- [x] API Validation security implemented on first inputs and route based (JOI and Nodejs).
- [ ] Tests automation examples
- [ ] Including Frontend code build run
- [x] Sample user module ready to start project
---

### Development

This is a repository for Node/Swagger JuthorAPI Admin Application project

## Includes

- Node
- Express
- Swagger

## Run Server (Node)

```
npm install
npm start
```
### Production or stage

```
npm run build
NODE_ENV=production pm2 start app.js
```

## Dist folder such as:
- The /dist stands for distributable.
- The /dist folder contains the minimized version of the source code.
- The code present in the /dist folder is actually the code which is used on production web applications.
- Along with the minified code, the /dist folder also comprises of all the compiled modules that may or may not be used with other systems.
- It is easier to add files to the /dist folder as it is an automatic process. All the files are automatically copied to the dist folder on save.
- The /dist folder also contains all those files which are required to run/build a module for use with other platforms- either directly in the browser, or in an AMD system (eg. require.js).
- Ideally, it is considered a good practice to clean the /dist folder before each build.


#API Validation

By using celebrate the req.body schema becomes clary defined at route level, so even frontend devs can read what an API endpoint expects without need to writting a documentation that can get outdated quickly.


```route.post('/signup',
 celebrate({
   body: Joi.object({
     name: Joi.string().required(),
     email: Joi.string().required(),
     password: Joi.string().required(),
   }),
 }),
 controller.signup)```
### Example error

```{
 "errors": {
   "message": "child \"email\" fails because [\"email\" is required]"
 }
}```



```
- Application will run on http://localhost:3000
- Swagger doc will run on http://localhost:3000/api-docs
```
