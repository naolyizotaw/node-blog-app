# Node Blog

A simple blog platform built with Node.js, Express, MongoDB, and EJS.

## Features

- Admin and user authentication (login/register)
- Role-based access control
- Create, edit, and delete blog posts
- Card-style UI for admin login/register
- Responsive design

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- EJS (Embedded JavaScript Templates)
- bcrypt (password hashing)
- JWT (JSON Web Token)
- Custom CSS

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/naolyizotaw/node-blog-app.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Node-blog
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up your MongoDB connection in `src/config/keys.js` or your environment variables.
5. Start the server:
   ```sh
   npm run dev
   ```

## Usage

- Visit `/admin` to log in as admin.
- Visit `/admin/register` to register a new admin/user.
- Use the dashboard to manage blog posts.

## Folder Structure

```
Node-blog/
├── package.json
├── server.js
├── public/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   └── routes/
│       └── main.js
├── views/
│   ├── admin/
│   ├── partials/
│   └── layouts/
```

## License

MIT

## Author

2025 Naol . Built In Node.js
