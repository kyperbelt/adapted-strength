# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run start`

NOTE FROM CASEY: This command also works for the same purposes as above.
The app will run in development mode in both [http://localhost:3000](http://localhost:3000) 
and your own network `http://1XX.XX.XXX.XXX:XXXX`

The page will also reload when changes are saved in your code editor/IDE of choice.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

---

### Updating Text and Images in Landing Pages: Beginner's Guide

#### Introduction
Welcome to the beginner's guide for updating text and images in the landing pages of the Adapted Strength application. As a gym coach, you'll find this guide helpful in making changes to your application's content without any technical hassle.

#### Accessing the Source Files
1. **Locate the Source Files**: The source files for your application are stored on your computer. You can find them in the directory `/Users/davidcastrejon/Documents/Adapted_Strength/adapted-strength/frontend/adapted_strength-app/src`.
   - If you're unsure how to navigate to this directory, you can ask someone familiar with file management to assist you.

#### Updating Text Content
1. **Identify the Page**: Think about which page you want to update. These pages represent different sections of your application, such as the "About Us" page or the "Home" page.
2. **Open the Page File**: Each page has its own file. For example, if you want to update the "About Us" page, you'll find its file named `About.jsx`. Open this file using a text editor.
3. **Find the Text to Update**: Look for the text you want to change. It's usually written inside quotation marks (`"`) or between tags that look like `<p>...</p>` or `<h1>...</h1>`.
4. **Make Changes**: Simply edit the text directly within the quotation marks or between the tags. You can type in new information or modify existing text as needed.
5. **Save the Changes**: Once you're done editing, save the file by clicking on "File" in the menu bar and selecting "Save" or by pressing `Ctrl + S` on your keyboard.

#### Changing Images
1. **Identify the Image File**: Think about which image you want to replace. Images are stored in the `/assets` folder of your application.
2. **Locate the Image**: Navigate to the `/assets` folder and find the image file you wish to replace (e.g., `team_member_image.jpg`).
3. **Prepare the New Image**: Make sure your new image is saved on your computer and is in the correct format (e.g., `.jpg`, `.png`).
4. **Replace the Image**: To replace the existing image, simply delete it from the `/assets` folder and copy your new image into the same folder. Make sure the new image has the same name as the old one.
5. **Update Image References**: If the image is displayed on a specific page (e.g., the "About Us" page), you might need to update the reference to the image. If so, open the corresponding page file (e.g., `About.jsx`) and look for the `<img>` tag. Change the `src` attribute of the `<img>` tag to the filename of your new image.

#### Best Practices
- **Take Your Time**: There's no rush! Take your time to review your changes before saving them.
- **Experiment**: Feel free to experiment with different text and images to see what works best for your application.
- **Ask for Help**: If you're unsure about anything or need assistance, don't hesitate to reach out to someone who can help you.

#### Conclusion
Congratulations! You've successfully learned how to update text and images in the landing pages of your Adapted Strength application. With these newfound skills, you can keep your application's content fresh and engaging for your users.
