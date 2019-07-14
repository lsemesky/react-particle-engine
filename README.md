This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the Application

Once you have installed Node.js (version 10.16.0 recommended), in the project directory, you should run:

### `npm install`

To install the packages that the application relies on.

The following commands can then be run in the project directory:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
To run all tests, make sure to press `a` when prompted.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run storybook`

Launches storybook which allows you to view the app components in isolation and allows you to manipulate component props. <br>
Open [http://localhost:9009](http://localhost:9009) to view it in the browser.<br>
This was used heavily in development to visually test particles and animations.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Adding a New Particle

The steps to add a new particle are pretty straight forward:
- Add svgs for the particles you wish into a folder in the `src/svg` directory
- Import them as react elements (see one index.js files in the `src/svg` subfolders for an example)
- Create a new Particle Factory that extends `ParticleFactory` 
- Customize the parameters in the `particleRangeSettings` to use your new particle
- Optionally change the animation by overriding any default parent functions or `particleRangeSettings`
- Add the new Particle Factory to the `ParticleFactoryFactory`
- Add the new Particle type to the drop down

## Technologies Used
- [Create React App ](https://facebook.github.io/create-react-app/docs/getting-started) framework for [React](https://reactjs.org/)
- [Material-UI](https://material-ui.com/)
- [Popmotion Pure](https://popmotion.io/pure/)
- [Storybook](https://storybook.js.org/)

## SVG Credits
Insect Vectors downloaded with attributable license from http://www.Vecteezy.com

Leaf Vectors downloaded for free, formerly available at http://www.sherykdesigns-blog.com/