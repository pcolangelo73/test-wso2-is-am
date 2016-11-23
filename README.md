# test-wso2-is-am
Little POC app for testing SSO functionality in WSO2 AM and IS

To run the app:
- `npm install`
- `npm start`

Note: If you see error `(node:2404) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: Exited with code 1` 
in the console when running the app you can safely ignore. Its a bug when webpack/create-react-app tries to launch a webbrowser at url http://localhost:3001
