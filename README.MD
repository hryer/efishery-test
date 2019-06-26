# Task App Offline
    * Show existing task list
	* Create task
	* Completing/Done a task
	* Edit/Delete a task
	* Syncing/Get & Send Update
	* Could work offline / low bandwidth / flaky connection
    * Use Unit Testing
	* Docker to containerize your app
## Instructions

### To run the webapp locally

1. Make sure you have `node` and `npm` installed, if not refer to below.
    - Mac users: https://changelog.com/posts/install-node-js-with-homebrew-on-os-x
    - Windows users: http://blog.teamtreehouse.com/install-node-js-npm-windows
    
2. Alternatively, use [yarn](https://yarnpkg.com/en/) for faster dependency installation
    and more stable dependency management. You can use `yarn` in the place of `npm`.
    ```
    $ yarn install
    ```
    instead of
    ```
    $ npm install
    ```
    - Instructions for installation: https://yarnpkg.com/lang/en/docs/install/
    
3. Clone the repository.
    - Using SSH (recommended):
    ```
    $ git clone git@github.com:hryer/efishery-test.git
    ```
    - Using HTTPS:
    ```
    $ git clone https://github.com/hryer/efishery-test.git
    ```
    
4. Move into the cloned directory.
    ```
    $ cd efishery-test
    ```

5. Install dependencies.
    ```
    $ npm/yarn install
    ```
    
6. Run the app locally in a _development_ mode.
    ```
    $ npm/yarn run dev
    ```
    - The development mode comes with a "watch" functionality. Changes made either
    to the client side and the server side are immediately detected and the app is
    re-bundled / re-started automatically.
    
7. Run the app locally in a _production_ mode.
    ```
    $ npm/yarn start
    ```
    - The production mode bundles the app into a much smaller size.
    
8. Visit `http://localhost:3000/`: you should see a `Login Pages`.

9. Use the repo as a starting point of your app!


### To run the app in Docker

This project comes **Docker ready** out of the box. [Docker](https://www.docker.com/)
is a software container platform. A Docker image contains information on everything
required to make an app run. This self-contained system makes it extremely easy to
ensure that your app runs on any OS without worrying about the dependency compatibility.

Regardless of where it’s deployed, _your app will always run the same_ as long as
Docker is installed on the machine.

1. Install Docker: https://docs.docker.com/engine/installation/

2. Clone the repo and move into the directory (see above)

3. Run the app in Docker.
    ```
        docker-compose up -D --build
    ```
    
4. Yep, that's it. Visit `http://localhost:3000/` to checkout the app.
