import express from 'express';
import _ from 'lodash';
import multer from 'multer';
import mongoose from 'mongoose';
// const _ = require('lodash');

const app = express();
const PORT = 8000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');

// Mongoose Database
mongoose.connect('mongodb://localhost:27017/BlogDB');

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', () => {
    console.log('-----> Database connected');
});

const blogSchema = new mongoose.Schema({
    title: String,
    desc: String
    // Imgfilename: String,
    // img: { data: Buffer, contentType: String }
})
const Blog = new mongoose.model('Blog', blogSchema);

// Node Notifier
notifier.notify(
    {
      title: 'My awesome title',
      message: 'Hello from node, Mr. User!',
      sound: true, // Only Notification Center or Windows Toasters
      wait: true // Wait with callback, until user action is taken against notification, does not apply to Windows Toasters as they always wait or notify-send as it does not support the wait option
    },
    function (error, response, metadata) {
        console.log(response, metadata);
    }
)

// Containers
const titles = [
    {
        title: "My First Day at School",
        desc: "My trip to the Himalayas was an unforgettable adventure. As we drove through winding roads, the majestic peaks loomed ahead, their snow-capped summits glistening in the sunlight. Each day was filled with breathtaking hikes, where I marveled at the lush valleys and crystal-clear rivers. The air was crisp and invigorating, and the serenity of the mountains provided a perfect escape from city life. I also had the chance to interact with local villagers, who shared their rich culture and traditions. This journey not only rejuvenated my spirit but also deepened my appreciation for nature's beauty."
    },
    {
        title: "Trip Himalaya",
        desc: "My first day at school was a whirlwind of emotions. I remember feeling a mix of excitement and nervousness as I walked through the gates. The colorful classrooms and cheerful faces of my classmates made me feel welcome. I was introduced to my teacher, who was kind and encouraging. We played games and shared stories, which helped break the ice. Lunchtime was a highlight, as I made new friends and shared snacks. \n\nBy the end of the day, my fears had vanished, and I couldn't wait to return the next day. It was the beginning of a wonderful journey!"
    }
];

// Disk Storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
}) 
const upload = multer({storage : storage}); // limits: { fileSize: 5 * 1024 * 1024 }
// const upload = multer({storage : multer.memoryStorage()}); // limits: { fileSize: 5 * 1024 * 1024 }
// const upload = multer();

// Routes
app.get('/', (req, res) => {
    // const postData = {
    //     post: titles
    // }
    const imgURL = ['bg.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about-us.jpg', '1.jpg'];
    let randImg = imgURL[Math.floor(Math.random() * imgURL.length)];

    Blog.find({})
    .then((blogs) => {
        if (blogs.length === 0) {
            Blog.insertMany(titles)
            .then(() => {console.log('-------> Empty! Items added successfully.'); res.redirect('/');})
            .catch(err => { console.log('--------> Error occured: ' + err);})
        } else {
            res.render('index', {array:blogs, bgImageURL: './images/' + randImg})
        }
    })
    .catch((err) => {console.log('Error: ' + err.message)})
})

app.get('/posts/:postName', (req, res) => {
    let postName = req.params.postName;
    
    Blog.findOne({title: postName})
    .then((blogData) => {
        if(blogData) { res.render('posts', {title: blogData.title, desc: blogData.desc, blogId: blogData.id});
        } else { console.log('Error!!!!'); res.redirect('/'); }
    })
    .catch(err => {console.log(`Error: ${err}`)})

})
app.get('/about', (req, res) => {
    const title = "Abou This Website";
    const imgURL = './images/about-us.jpg';
    const content = 'About Us';
    const inputGroup = `<p>I developed this blog website as a learning project to expand my programming knowledge in specific areas. To my pleasant surprise, the end result has turned out far better than I initially envisioned! I welcome your thoughts and suggestions on how to make this project even better. <br><br>Your feedback would be greatly appreciated!</p>`
    // const inputGroup = `<p>This blog website was merely made as a project to extend my knowledge on a particular topic in programming. Although I did not expect it would turn out to be so good!<br><br>Any opinion to improve this project will be valued!</p>`;
    
    res.render('about', { title: title, imgURL: imgURL, content, inputGroup});
})

app.route('/contact')
    .get((req, res) => {
        const pageData = {
            title: "Do Not Hesitate",
            imgURL: './images/contact.jpg',
            content: 'Contact Us',
            inputGroup: `   <form action="/contact" method="POST">
                                <div class="input-group mb-2">
                                    <span class="input-group-text">Name</span>
                                    <input type="text" name="name" class="form-control" placeholder="Your beautiful name...">
                                </div>
                                <textarea name="message_to_us" id="" rows="5" class="form-control" placeholder="Your message..."></textarea>
                                <div class="input-group mt-2">
                                    <span class="input-group-text">Email</span>
                                    <input type="email" name="name" class="form-control" placeholder="abc@gmail.com">
                                    <button class="btn btn-outline-secondary" type="submit">Submit</button>
                                </div>
                            </form>`
        }
        res.render('about', { title: pageData.title, imgURL: pageData.imgURL, content: pageData.content, inputGroup: pageData.inputGroup});
    })
    .post((req, res) => {
        const body = req.body;
        const userData = {
            name: body.name,
            messageToUs: body.message_to_us
        }
        console.log(userData);
        res.redirect('/');
    })

app.route('/compose')
    .get((req, res) => {
        res.render('compose');
    })
    .post(upload.single('backgroundImage'), (req, res) => {
        const body = req.body;
        const imageBG = req.body.backgroundImage;

        const newBlog = new Blog({
            title: body.compose_title,
            desc: body.compose_post
            // Imgfilename: req.file.filename,
            // img: { data: req.file.buffer, contentType: req.file.mimetype }
        })


        Blog.insertOne(newBlog)
        .then((blogData) => {
            console.log('Data uploaded! -> ' + blogData); 
            // newBlog.save(); mongoose.connection.close()
            res.redirect('/');
        })
        .catch(err => {console.log('Error: ' + err.message)})

        // newBlog.save()
        // .then((blogData) => {
        //     console.log('Data uploaded! -> ' + blogData);
        // }).catch(err => {
        //     console.log('Error: ' + err.message);
        // });
        
        // const userData = {
        //     title: body.compose_title,
        //     post: body.compose_post
        // }
        // if (userData.title === '' || userData.post === '') {
        //     res.redirect('/');
        // } else {
        //     titles.push(userData);
        //     res.redirect('/');
        // }

    })

app.post('/delete', (req, res) => {
    const blogID = req.body.blogID;

    Blog.findOneAndDelete({_id: blogID })
    .then((blog) => {console.log('Deleted!'); res.redirect('/');})
    .catch((err) => {console.log(`Error: ${err}`); })
})

    // Port
app.listen(PORT, () => {
    console.log(`Server running on: http:/localhost:${PORT}`);
})