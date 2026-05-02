# Backend Challenge: POST & DELETE Methods
**Node.js HTTP Module — No Express.js**
`Date: 02/05/2026 | Level: Beginner–Intermediate`

---

## Overview

Build a REST API using only Node.js's built-in `http` module. The server manages an in-memory task list and handles four HTTP routes.

> ⚠️ Do **not** use Express.js or any third-party framework.

---

## Learning Objectives

- Understand how HTTP methods (GET, POST, DELETE) differ in purpose
- Parse query parameters from a URL manually
- Manipulate arrays in JavaScript (`push`, `filter`)
- Send appropriate HTTP responses with status codes
- Apply basic input validation

---

## Routes

| Route | Method | Description |
|---|---|---|
| `/` | GET | Returns a welcome message |
| `/tasks` | GET | Returns the full tasks array as JSON |
| `/add-task` | POST | Adds a new task via query parameter |
| `/delete-task` | DELETE | Removes a task by name |

---

## Setup

Create `server.js`:

```js
const http = require('http');

let tasks = ['Read', 'Code', 'Sleep'];

const server = http.createServer((req, res) => {
  // Your routes will go here
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

Run with:
```bash
node server.js
```

---

## Step 1 — GET `/`

```js
if (req.method === 'GET' && req.url === '/') {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Welcome to the Todo API');
}
```

> `req.method` gives the HTTP verb. `req.url` gives the path.

---

## Step 2 — GET `/tasks`

Returns the task list as JSON.

```js
if (req.method === 'GET' && req.url === '/tasks') {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(tasks));
}
```

**Expected response:**
```json
["Read", "Code", "Sleep"]
```

---

## Step 3 — POST `/add-task`

**Example request:**
```
POST http://localhost:3000/add-task?task=Exercise
```

Extract the task name from the query string:

```js
if (req.method === 'POST' && req.url.startsWith('/add-task')) {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const taskName = params.get('task');

  tasks.push(taskName);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Task added successfully');
}
```

> `URLSearchParams` is a built-in Node.js class that parses query strings.

---

## Step 4 — DELETE `/delete-task`

**Example request:**
```
DELETE http://localhost:3000/delete-task?task=Read
```

Use `.filter()` to remove the task:

```js
if (req.method === 'DELETE' && req.url.startsWith('/delete-task')) {
  const params = new URLSearchParams(req.url.split('?')[1]);
  const taskName = params.get('task');

  tasks = tasks.filter(t => t !== taskName);
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Task deleted successfully');
}
```

> `filter()` returns a new array — always reassign: `tasks = tasks.filter(...)`

---

## Example Flow

| # | Action | `tasks` after |
|---|---|---|
| 1 | Start server | `["Read", "Code", "Sleep"]` |
| 2 | POST `/add-task?task=Exercise` | `["Read", "Code", "Sleep", "Exercise"]` |
| 3 | DELETE `/delete-task?task=Read` | `["Code", "Sleep", "Exercise"]` |
| 4 | GET `/tasks` | `["Code", "Sleep", "Exercise"]` |

---

## Testing

**curl:**
```bash
curl http://localhost:3000/tasks
curl -X POST "http://localhost:3000/add-task?task=Exercise"
curl -X DELETE "http://localhost:3000/delete-task?task=Read"
```

**Postman / Insomnia:** Set the method, enter the full URL with query string, hit Send.

---

## Bonus Challenges

- Reject empty task names with a `400 Bad Request`
- Reject duplicate tasks with a `409 Conflict`
- Return all responses as JSON with a `success` field:

```js
res.end(JSON.stringify({ success: true, tasks }));
res.end(JSON.stringify({ success: false, error: 'Task not found' }));
```

**Status code reference:** `200` OK · `400` Bad Request · `404` Not Found · `409` Conflict

---

## Submission Checklist

- [ ] `tasks` initialised with `["Read", "Code", "Sleep"]`
- [ ] `GET /` returns welcome message
- [ ] `GET /tasks` returns full array as JSON
- [ ] `POST /add-task?task=X` appends X
- [ ] `DELETE /delete-task?task=X` removes X
- [ ] **Bonus:** Empty task names rejected with `400`
- [ ] **Bonus:** Duplicate tasks rejected with `409`
- [ ] **Bonus:** All responses use JSON with a `success` field