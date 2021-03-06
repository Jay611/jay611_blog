import { Request, Response } from 'express'
import { IReqAuth } from '../config/interface'
import Blogs from '../models/blogModel'

const blogCtrl = {
  createBlog: async (req: IReqAuth, res: Response) => {
    if (!req.user)
      return res.status(400).json({ msg: 'Invalid Authentication.' })
    try {
      const { title, content, description, thumbnail, category } = req.body

      const newBlog = new Blogs({
        user: req.user,
        title: title.toLowerCase(),
        content,
        description,
        thumbnail,
        category,
      })
      await newBlog.save()
      res.json({ msg: 'Create blog success!', newBlog })
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getHomeBlogs: async (req: Request, res: Response) => {
    try {
      const blogs = await Blogs.aggregate([
        // User
        {
          $lookup: {
            from: 'users',
            let: { user_id: '$user' },
            pipeline: [
              { $match: { $expr: { $eq: ['$_id', '$$user_id'] } } },
              { $project: { password: 0 } },
            ],
            as: 'user',
          },
        },
        // Array -> object
        { $unwind: '$user' },

        // Category
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'category',
          },
        },
        // Array -> object
        { $unwind: '$category' },

        // Sorting
        { $sort: { createdAt: -1 } },

        // Group by category
        {
          $group: {
            _id: '$category._id',
            name: { $first: '$category.name' },
            blogs: { $push: '$$ROOT' },
            count: { $sum: 1 },
          },
        },

        // Pagination for blogs
        {
          $project: {
            blogs: {
              $slice: ['$blogs', 0, 4],
            },
            count: 1,
            name: 1,
          },
        },
      ])
      res.json(blogs)
    } catch (err: any) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

export default blogCtrl
