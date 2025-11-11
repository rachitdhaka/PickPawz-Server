const { Router } = require('express');
const AdopterModel = require('../Database/db');
const JWT = require('jsonwebtoken')
const JWTKEY = process.env.JWTKEY;
const bcrypt = require('bcrypt');
const { authMiddleware } = require('../Middleware/Auth');
const AdopterRouter = Router();


AdopterRouter.post('/signup', async (req, res) => {

    const { firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 5);
        await AdopterModel.create({
            firstname, lastname, email, password: hashedPassword
        })
        res.json({
            messgae: "User Signed Up Successful . Login"
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Admin signup failed"
        });
    }


})


AdopterRouter.post('/login', async (req, res) => {

    const { email, password } = req.body;

    try {

        const findUser = await AdopterModel.findOne({ email });
        if (!findUser) {
            return res.status(404).json({
                message: "User does not exist"
            });
        }

        const checkPassword = await bcrypt.compare(password, findUser.password);


        if (checkPassword) {
            const token = JWT.sign({
                id: findUser._id
            }, JWTKEY)

            return res.json({ token ,  firstname: findUser.firstname});
        }
        else {
            return res.status(403).json({
                error: "Invalid credentials"
            });
        }


    } catch (error) {
        console.log(error);
        return res.status(400).json({
            error: "Login failed"
        });
    }
})


AdopterRouter.put('/editProfile', authMiddleware,  async (req, res) => {

    const Id = req.userId;
    const { Profession,Description, Phone,Email,HouseFamily, ReasonToAdopt} = req.body;


    try {
        await AdopterModel.findByIdAndUpdate({_id:Id} , {Profession,Description, Phone,Email,HouseFamily, ReasonToAdopt});
        res.json({
            message : "Profile Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            error: "Profile Updation failed"
        });
    }
})

module.exports = AdopterRouter
