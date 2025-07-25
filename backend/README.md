# Backend API

## How to Run the Backend

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the server:
   ```bash
   npm start
   ```
   The server will run at http://localhost:4000

## API Endpoints
- POST /login
- GET /items
- POST /items
- PUT /items/:id
- DELETE /items/:id

## How to Run API Tests (Postman/Newman)

1. Install [Newman](https://www.npmjs.com/package/newman) globally if you don't have it:
   ```bash
   npm install -g newman
   ```
2. Run the tests:
   ```bash
   newman run api-tests.postman_collection.json
   ```
   Or to generate an HTML report:
   ```bash
   newman run api-tests.postman_collection.json -r cli,html --reporter-html-export newman-report.html
   ```

This will execute all positive and negative test cases for the backend API.

## CI/CD Integration & Artifacts

- The GitHub Actions CI/CD pipeline will automatically run these API tests on every push or pull request.
- **A detailed HTML report of the API test results is attached as an artifact to each workflow run.**
- To access the report:
  1. Go to your repository on GitHub.
  2. Click the **Actions** tab.
  3. Select the latest workflow run.
  4. Download the `newman-report` artifact to view the HTML report.

## 🙏 Credits & Attribution

This project is **heavily enhanced** from the original open source project by [Harshit Bansal](https://github.com/HarsDev01/react-todo-app).

Original repository: [https://github.com/HarsDev01/react-todo-app](https://github.com/HarsDev01/react-todo-app)