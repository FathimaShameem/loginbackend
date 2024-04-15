const express = require("express")
const path = require("path")
const app = express()
const hbs = require("hbs")
const LogInCollection1 = require("./mongodb")
const tempelatePath = path.join(__dirname, '../tempelates')

app.use(express.json())
app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.urlencoded({extended:false}))

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})



app.post('/signup', async (req, res) => {
    

    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    
        await LogInCollection1.insertMany([data])
    

    res.render("home")
})

app.post('/login', async (req, res) => {
    try {
        const check = await LogInCollection1.findOne({ name: req.body.name });

        if (!check) {
            res.send("User not found");
            return;
        }

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` });
        } else {
            res.send('<script>alert("Incorrect password"); window.history.back();</script>');
        }
    } catch (e) {
        res.send("An error occurred while logging in");
    }
});



app.listen(3000, () => {
    console.log('port connected');
})
