# Frontend (React App)

## Quick Setup (1–2 mins)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the app:
   ```bash
   npm start
   ```
   The app will run at http://localhost:3000

## How to Run Playwright UI Tests

1. Make sure the backend and frontend are both running locally.
2. In a new terminal, go to the tests directory:
   ```bash
   cd ../tests
   npm install
   ```
3. Run the Playwright tests:
   ```bash
   npx playwright test
   ```
4. To generate an HTML report:
   ```bash
   npx playwright test --reporter=html
   ```
   The report will be saved in the `playwright-report` directory. Open `playwright-report/index.html` in your browser to view it.

## Code Coverage

- Playwright and backend coverage reports are generated and uploaded as artifacts in CI/CD.
- To view coverage:
  1. Go to your repository on GitHub.
  2. Click the **Actions** tab.
  3. Select the latest workflow run.
  4. Download the `backend-coverage` artifact for backend coverage.
  5. (If Playwright coverage is enabled, download the relevant artifact.)

## Visual Test Snapshots

- Playwright automatically captures screenshots and traces on test failure.
- These are uploaded as the `playwright-snapshots` artifact in CI/CD.
- To view:
  1. Go to your repository on GitHub.
  2. Click the **Actions** tab.
  3. Select the latest workflow run.
  4. Download the `playwright-snapshots` artifact to view screenshots and traces.

## CI/CD Integration & Artifacts

- The GitHub Actions CI/CD pipeline will automatically run Playwright UI tests on every push or pull request.
- **A detailed HTML report of the UI test results is attached as an artifact to each workflow run.**
- To access the report:
  1. Go to your repository on GitHub.
  2. Click the **Actions** tab.
  3. Select the latest workflow run.
  4. Download the `playwright-report` artifact to view the HTML report. 

## 🙏 Credits & Attribution

This project is **heavily enhanced** from the original open source project by [Harshit Bansal](https://github.com/HarsDev01/react-todo-app).

Original repository: [https://github.com/HarsDev01/react-todo-app](https://github.com/HarsDev01/react-todo-app) 