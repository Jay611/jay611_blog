import express from 'express'
import auth from '../middleware/auth'
import blogCtrl from '../controllers/blogCtrl'

const router = express.Router()

router.post('/blog', auth, blogCtrl.createBlog)

router.get('/home/blogs', blogCtrl.getHomeBlogs)


export default router;