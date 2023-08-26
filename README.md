# Mathematical Operations Server

This is a simple Node.js server that responds to mathematical operations sent via URL and maintains a history of the last 20 operations performed on the server. The server is hosted at `localhost:3001`.

## Usage

### GET /
- **Description:** Lists all the available GET endpoint samples that you can test.

### GET /history
- **Description:** Lists the last 20 operations performed on the server, along with their answers.

### Example Requests

#### /5/plus/3
- **Response:** JSON
- **Response Body:**
  ```json
  {
    "question": "5+3",
    "answer": 8
  }
