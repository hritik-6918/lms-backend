import express, { Request, Response } from 'express';
import { auth, adminAuth } from '../middleware/auth';
import Course from '../models/Course';
import User from '../models/User';

const router = express.Router();

interface AuthRequest extends Request {
  user?: any;
}

// Get all courses
router.get('/courses', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
});

// Get a specific course
router.get('/courses/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching course' });
  }
});

// Add a new course (admin only)
router.post('/admin/courses', adminAuth, async (req: Request, res: Response) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error creating course' });
  }
});

// Update a course (admin only)
router.put('/admin/courses/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(400).json({ message: 'Error updating course' });
  }
});

// Delete a course (admin only)
router.delete('/admin/courses/:id', adminAuth, async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting course' });
  }
});

// Enroll in a course
router.post('/users/enroll/:courseId', auth, async (req: AuthRequest, res: Response) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.enrolledCourses.includes(course._id)) {
      return res.status(400).json({ message: 'Already enrolled in this course' });
    }
    
    user.enrolledCourses.push(course._id);
    await user.save();
    
    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error enrolling in course' });
  }
});

export default router;

