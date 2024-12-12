# Learning Management System (LMS)

This is a comprehensive Learning Management System (LMS) built with Next.js, Express.js, and MongoDB. It provides separate views for administrators and users, allowing course management and enrollment.

## Features

- Admin dashboard for managing courses
- User view for browsing and enrolling in courses
- Authentication and role-based access control
- RESTful API for course management and user enrollment

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Project Structure

```bash
lms-project/
├── src/
│ ├── app/
│ │ ├── admin/
│ │ │ ├── add-course/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── courses/
│ │ │ ├── [id]/
│ │ │ │ └── page.tsx
│ │ │ └── page.tsx
│ │ ├── globals.css
│ │ ├── layout.tsx
│ │ └── page.tsx
│ └── server/
│ ├── middleware/
│ │ └── auth.ts
│ ├── models/
│ │ ├── Course.ts
│ │ └── User.ts
│ ├── routes/
│ │ ├── auth.ts
│ │ └── courses.ts
│ └── server.ts
├── .env
├── package.json
├── README.md
└── tsconfig.json
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/lms-project.git
   cd lms-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a \`.env\` file in the root directory with the following content:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. In a separate terminal, start the backend server:
   ```bash
   npm run server
   ```

6. Open your browser and navigate to \`http://localhost:3000\`

## API Routes

- \`POST /api/register\` - Register a new user
- \`POST /api/login\` - Login a user
- \`GET /api/courses\` - Get all courses
- \`GET /api/courses/:id\` - Get a specific course
- \`POST /api/admin/courses\` - Add a new course (admin only)
- \`PUT /api/admin/courses/:id\` - Update a course (admin only)
- \`DELETE /api/admin/courses/:id\` - Delete a course (admin only)
- \`POST /api/users/enroll/:courseId\` - Enroll in a course

## Authentication and Authorization

This LMS uses JSON Web Tokens (JWT) for authentication. The \`auth\` middleware checks for a valid token, and the \`adminAuth\` middleware ensures that only admin users can access certain routes.

## Database Schema

### User Schema

```typescript
{
username: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ['admin', 'user'], default: 'user' },
enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
}
```

### Course Schema

```typescript
{
title: { type: String, required: true },
description: { type: String, required: true },
duration: { type: String, required: true },
instructor: { type: String, required: true }
}
```

## Predefined Credentials

### Admin User

- Username: admin
- Password: admin123

### Regular User

- Username: user
- Password: user123

## Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add some AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a pull request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JSON Web Tokens](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)
