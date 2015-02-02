## Getting Started

To get you started you can simply clone the note-wrangler repo and install the dependencies:

### Install Dependencies

You will need node.js installed to run this sample app, I recommend [Node Version Manager][nvm]. 
Check out the repo for installation directions: [nvm github][nvm]

* Install the server side node libraries we depend upon via `npm`, the [node package manager][npm].

We have preconfigured the app using `npm` to automatically run `bower` so we can simply do:

```
npm install
```
This creates a `node_modules` folder which contains the npm packages installed in the previous step

### Run the Application

We have preconfigured the project with a simple development web server.  The simplest way to start
this server is:

```
npm start
```

Now pull up your application at `http://localhost:8000/`. The default user is `demo` with a password of `secret`

```
npm run debug
```
This starts the app in debug mode which allows you you to use [node-inspector](https://github.com/node-inspector/node-inspector)
You can open another browser tab at: `http://127.0.0.1:8080/debug?port=5858` to get to the web console.

## Additional Resources

For more information on AngularJS and other kick-butt languages check out [Code School](https://www.codeschool.com/)!

[angular]: http://angularjs.org/
[git]: http://git-scm.com/
[npm]: https://www.npmjs.org/
[node]: http://nodejs.org
[http-server]: https://github.com/nodeapps/http-server
[nvm]: https://github.com/creationix/nvm
