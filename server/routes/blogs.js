const express = require('express')
const router = express.Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            console.log('blogs: ', blogs)
            res.status(200).json(blogs)
        })
        .catch(err => {
            console.log('err here: ', err)
            res.status(400).send('something went wrong...')
        })
})

router.get('/featured', (req, res) => {
    Blog
        .find()
        .where('featured')
        .equals(true)
        .then(blogs => {
            console.log('blogs: ', blogs)
            res.status(200).json(blogs)
        })
        .catch(err => {
            console.log('err: ', err)
        })
})

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id)
        .then(idBlog => {
            !idBlog ? res.status(404).json(idBlog) : res.status(200).json(idBlog)
        })
        .catch(err => {
            console.log('err: ', err)
            res.status(400).send('something went wrong...')
        })
})

router.post('/', (req, res) => {
    // const blog = new Blog(req.body)
    // blog.save()
    //     .then(blogEntry => {
    //         User
    //             .findByIdAndUpdate(blogEntry.author, { $push: { blogs: blogEntry }}) // only the blog id is pushed into the blogs array
    //             .then(data => {
    //                 console.log('data: ', data)
    //             })
    //             .catch(err => {
    //                 console.log('err: ', err)
    //                 res.status(400).send('something went wrong...')
    //             })
    //         res.status(201).send(`blog saved successfully ${blogEntry}`)
    //     })
    //     .catch(err => {
    //         console.log('err: ', err)
    //         res.status(400).send('something went wrong...')
    //     })
    User.findById(req.body.author)
        .then(user => {
            // Create a blog
            const newBlog = new Blog(req.body);

            // Bind the user ot it
            newBlog.author = user._id;

            // Save it to the database
            return newBlog.save();
        })
    // New higher scope variable
    let dbUser = null;
                    
    // Fetch the user from the database
    User
        .findById(req.body.author)
        .then(user => {
            // Store the fetched user in higher scope variable
            dbUser = user;
    
            // Create a blog
            const newBlog = new Blog(req.body);
    
            // Bind the user to it
            newBlog.author = user._id;
    
            // Save it to the database
            return newBlog.save();
        })
        .then(blog => {
            // Push the saved blog to the array of blogs associated with the User
            dbUser.blogs.push(blog);
    
            // Save the user back to the database and respond to the original HTTP request with a copy of the newly created blog.
            dbUser.save().then(() => res.status(201).json(blog));
        })
})

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body)
        .then(data => {
            res.status(204).json(data)
        })
        .catch(err => {
            res.status(400).send('could not update')
            console.log('error msg: ', err)
        })
})

router.delete('/', (req, res) => {
    Blog
        .deleteMany({ featured: false }, (err, result) => {
            if(err) {
                res.status(400).send(err);
            } else {
                res.status(200).send(result);
            }
        })
})

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id)
        .then(deleted => {
            res.json(deleted)
        })
        .catch(err => {
            res.status(400).send('something went wrong')
            console.log('error msg: ', err)
        })
})

module.exports = router