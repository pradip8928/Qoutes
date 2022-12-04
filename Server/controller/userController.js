const User = require("../models/userModels")
const Quotes = require("../models/quotesModels")
const requireLogin = require("../middlewares/requireLogin")
const asyncHandler = require("express-async-handler")
const generateToken = require("../utils/generateToken")
const jwt = require("jsonwebtoken")

// registeration of user
const registerUser = async(req, res) => {
    const { name, email, password, pic } = req.body;

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error(`User with this ${email} already exists`)
    }

    const user = await User.create({ name, email, password, pic })
    if (user) {
        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),

        })
    } else {
        res.status(400)
        throw new Error(`Error Occured`)

    }


}


// login or authenticated user
const authUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {


        // verify token
        // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generateToken(user._id),
            // token: jwt.sign({ _id: user._id }, process.env.JWT_SECRET),
        });

    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});



// post
const quotes = async(req, res) => {
        const { name, title, like } = req.body;

        console.log(req.user.id, name, title, like);
        // res.json({ name: name, title: title, like: like })


        const quotes = await Quotes.create({ name, title, like, user: req.user.id, })
        if (quotes) {
            res.status(201).json({
                user: req.user.id,
                id: quotes._id,
                name: quotes.name,
                title: quotes.title,
                like: quotes.like
            })
        } else {
            res.status(400)
            throw new Error(`Error Occured`)

        }
    }
    // post
    // const quotes = async(req, res) => {
    //     const { name, title, like } = req.body;

//     console.log(name, title, like);
//     // res.json({ name: name, title: title, like: like })


//     const quotes = new Quotes({ name, title, like, user: req.user.id, like: quotes.like })

//     const savedQuotes = await quotes.save()

//     if (savedQuotes) {
//         res.status(201).json({
//             user: req.user.id,
//             id: quotes._id,
//             name: quotes.name,
//             title: quotes.title,
//             like: quotes.like
//         })
//     } else {
//         res.status(400)
//         throw new Error(`Error Occured`)

//     }
// }




// like
// const like = async(req, res) => {
//     const { id, name, title, like } = req.body;
//     console.log(id, name, title, like);
//     res.json({ id, name, title, like })
//     Quotes.findByIdAndUpdate(id, {
//         $push: { like: req.user.id }
//     }, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         } else {
//             res.json(result)
//         }
//     })

// }


// like

// const like = async(req, res, next) => {
//     let quotes = await Quotes.findById(req.params.id);
//     console.log(quotes);
//     if (!quotes) {
//         // return next(new ErrorHandler("Product not found", 404));
//         return res.status(422).json({ error: "err" });
//     }

//     quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, {
//         $push: { like: req.user.id }
//     }, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//     });

//     res.status(200).json({
//         success: true,
//         quotes,
//     });
// };

// like
const like = asyncHandler(async(req, res) => {


        try {
            const id = req.params.id;
            // console.log("id  " + id);
            let quotes = await Quotes.findById(id);
            console.log(quotes);

            if (!quotes) {
                return res.status(404).json({ message: 'No quotes found' })
            }
            // console.log("hlw world");
            // let user = JSON.parse(localStorage.getItem('userInfo'));
            // console.log("user id " + req.user.id);
            console.log("quotes" + quotes._id);

            if (quotes.user.toString() !== req.user.id) {
                return res.status(404).json({ message: 'You are not allowed to access this quote' })
            }

            Quotes.findByIdAndUpdate(quotes._id, {

                    $push: { like: req.user.id }
                }, {
                    new: true,
                    runValidators: true,
                    useFindAndModify: false,
                })
                .exec((err, result) => {
                    if (err) {
                        return res.status(422).json({ Error: err })
                    } else {
                        res.json(result)
                    }
                });
            // console.log(quotes);
            // res.json(quotes);

            // const check = quotes.like.filter(like => {
            //     like.user.toString() === req.user.id
            // }).length > 0;
            // if (check) {
            //     return res.status(400).json({ message: 'Post already liked it ' })
            // }
            // quotes.like.unshift({ user: req.user.id })
            // const likQuotes = await quotes.save()
            // res.json(likQuotes)


        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "server error " + error })
        }



        // if (!quotes) {
        //     return next(new ErrorHandler("Product not found", 404));
        // }





        // quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, {
        //     $push: { like: req.users._id }
        // }, {
        //     new: true,
        //     runValidators: true,
        //     useFindAndModify: false,
        // });

        // res.status(200).json({
        //     success: true,
        //     quotes,
        // });
    })
    // unlike
const unlike = async(req, res, next) => {


    try {
        let quotes = await Quotes.findById(req.params.id);


        // if (!quotes) {
        //     return res.status(404).json({ message: 'No quotes found' })
        // }

        if (quotes.like.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ message: 'Post has not yet been liked ' })
        }

        // get removed index from
        const removeIndex = quotes.like.map(like => like.user.toString()).indexOf(req.user.id)
        quotes.like.splice(removeIndex, 1)

        await quotes.save()
        res.json(quotes.like)


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "server error " + error })
    }



    // if (!quotes) {
    //     return next(new ErrorHandler("Product not found", 404));
    // }





    // quotes = await Quotes.findByIdAndUpdate(req.params.id, req.body, {
    //     $push: { like: req.users._id }
    // }, {
    //     new: true,
    //     runValidators: true,
    //     useFindAndModify: false,
    // });

    // res.status(200).json({
    //     success: true,
    //     quotes,
    // });
};



// unlike
// const unlike = async(req, res) => {


//     Quotes.findByIdAndUpdate(req.body.postId, {
//         $pull: { like: req.users._id }
//     }, {
//         new: true
//     }).exec((err, result) => {
//         if (err) {
//             return res.status(422).json({ error: err })
//         } else {
//             res.json(result)
//         }
//     })

// }



// read
const quotesRead = async(req, res) => {
    Quotes.find({}, (err, result) => {
        if (err) {
            console.log("error: " + err);
            res.send(err)
        } else {
            // console.log(result);
            res.send(result)

        }
    })
}



// protected routes
const secure = (req, res) => {
    console.log("middleware");
    res.send("security region")
}


module.exports = { registerUser, authUser, quotes, like, unlike, quotesRead, secure }