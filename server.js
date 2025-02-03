import express from 'express';

const app = express();
const PORT = 8000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false}));
app.set('view engine', 'ejs');

// Containers
const titles = [
    {
        title: "Neymar",
        post: "Ney the great."
    }
];

// Routes
app.get('/', (req, res) => {
    const postData = {
        post: titles
    }
    console.log(postData.post)
    res.render('index', {array:titles});
    
    // res.render('index', {intro: data.intro.substring(0, 150)+'...', title: data.title});
})
app.get('/posts/:id', (req, res) => {
    const postData = {
        post: titles
    }
    let id = req.params.id;
    let findingPostTitle = post;
    let post = postData.post[0].post;

    // res.render('posts', { title:  postData.post[0].title});
    res.render('posts', { title: id, post: post});
})
app.get('/about', (req, res) => {
    const title = "Abou This Website";
    const imgURL = './images/about-us.jpg';
    const content = 'About Us';
    const inputGroup = `<p>I developed this blog website as a learning project to expand my programming knowledge in specific areas. To my pleasant surprise, the end result has turned out far better than I initially envisioned! I welcome your thoughts and suggestions on how to make this project even better. <br><br>Your feedback would be greatly appreciated!"</p>`
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
                                <textarea name="message_to_us" id="" rows="5" class="form-control" placeholder="Your message..."></textarea>
                                <div class="input-group mt-2">
                                    <span class="input-group-text">Name</span>
                                    <input type="text" name="name" class="form-control" placeholder="Your beautiful name...">
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
    .post((req, res) => {
        const body = req.body;
        const userData = {
            title: body.compose_title,
            post: body.compose_post
        }
        // titles.push(createObject(userData.title, userData.intro));
        if (userData.title === '') {
            res.redirect('/');
        } else {
            titles.push(userData);
            res.redirect('/');
        }

    })


// Port
app.listen(PORT, () => {
    console.log(`Server running on: http:/localhost:${PORT}`);
})