# Test Plan / Strategy

## Objective
Demonstrate automated testing skills for a simple React + Node.js (Express) Todo application, covering both UI and API layers.

---

## What is Being Tested
- **Frontend (React):**
  - Login functionality (valid, invalid, missing credentials)
  - Todo CRUD: create, edit, delete, toggle complete
  - UI feedback/assertions after actions
- **Backend (Node.js/Express):**
  - Authentication (login endpoint)
  - Todo API: create, read, update, delete
  - Positive and negative API scenarios

---

## Test Coverage Areas
- **UI Automation (Playwright):**
  - Login (success, failure, empty fields)
  - Add new todo
  - Edit existing todo
  - Delete todo
  - Toggle complete
  - Assert UI reflects expected state after each action
- **API Automation (Postman/Newman):**
  - POST /login (success, failure)
  - GET /items (auth, no auth)
  - POST /items (success, missing data)
  - PUT /items/:id (success, not found)
  - DELETE /items/:id (success, not found)

---

## Tools Used & Why
- **Playwright:**
  - Modern, fast, and reliable UI automation for React apps
  - Supports robust selectors and assertions
- **Postman/Newman:**
  - Industry standard for API test automation and sharing
  - Newman enables CLI/CI execution
- **GitHub Actions:**
  - Automates test runs for CI/CD
- **Jest (React default):**
  - For unit/component tests (if needed)

---

## How to Run the Tests

### Backend API
1. `cd backend`
2. `npm install && npm start`
3. Run API tests:
   - `newman run api-tests.postman_collection.json`

### Frontend UI
1. `cd frontend`
2. `npm install && npm start` (ensure backend is running)
3. In a new terminal:
   - `cd tests`
   - `npm install`
   - `npx playwright test`

### CI
- GitHub Actions workflows will run all tests on push/PR.

---

## Assumptions & Limitations
- Backend uses in-memory storage (todos reset on server restart)
- Only one hardcoded user (test@task.com / task@123)
- No persistent database or user registration
- API and UI must be running locally for tests to pass
- Minimal error handling for demo purposes

---

## References
- See `backend/README.md` for backend/API details
- See `tests/tests/` for Playwright UI tests
- See `backend/api-tests.postman_collection.json` for API tests 