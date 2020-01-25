# BaseNodeReactProject
A template for making web pages using Node and React.

The base project contains:
 - An app router to sort out your paths
 - A basic storybook setup to see your components in isolation
   - `npm run storybook`
 - Some basic tests setup with Jest
   - `npm run test`
 - Encoded AWS credentials for putting code onto the server
 - A Travis config script
  - You still need to configure travis for the repo you're using this with, as well as setting up the secret to decode the AWS credentials.

# Setup
 - Run the following commands:
   - `git remote add NodeReactBase https://github.com/RyanMKrol/BaseNodeReactProject`
   - `git remote update`
   - `git merge NodeReactBase/master`
   - `npm install`
   - `npm run start`
 - You should now have a react server up and running
 - Change the properties in the package.json:
    - Author
    - Name
    - Description
    - Scripts
 - Update your project's README, it will be a copy of this one!
