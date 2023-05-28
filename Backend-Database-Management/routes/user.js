const express = require('express');
const router = express.Router();
const User = require('../models/UserData');
const multer = require('multer');
const { body, validationResult } = require('express-validator');





//here, we did not add any authentication for any of the CRUD operation
//Rout 1: create a new user and post all data using POST method at '/api/user/createuser' 


// Configure multer storage and destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Uploads'); // Specify the destination folder here
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    },
});

const upload = multer({ storage });

router.post(
    '/createuser',
    [
        body('fullName', 'The name should be more than 2 characters.').isLength({ min: 3 }),
        body('description', 'The Description should be less than 100 characters.').isLength({ max: 1000 }),
    ],
    upload.single('photo'), // Use upload.single() middleware to handle file upload
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            // File upload succeeded, create the user
            const { fullName, gender, DOB, phone, description } = req.body;
            const photoName = req.file ? req.file.filename : null;
            console.log(photoName, req.file);

            // Create user document with photo details
            const user = new User({
                fullName,
                gender,
                DOB,
                phone,
                description,
                photo: photoName,
            });

            try {
                await user.save({ maxTimeMS: 120000 });
                console.log('Data has been saved');
                return res.status(201).json(user);
            } catch (err) {
                console.error('Failed to save the data.', err);
                return res.status(500).json({ error: 'Failed to save the data.' });
            }
        } catch (err) {
            console.error('An unexpected error occurred.', err);
            return res.status(500).json({ error: 'An unexpected error occurred.' });
        }
    }
);



//Rout 2: to get all users data without any of query data using GET method At: 'api/user/getalluser' . 

// router.get('/getallusers', async (req, res) => {
//     try {
//         const notes = await User.find({}).maxTimeMS(120000);
//         res.json(notes);
//     }

//     catch (error) {
//         console.log({ error: 'Some error occured during retrival of users from user collection : ' }, error);
//         res.status(400).send({ error: 'Some error occured during retrival of notes from notes collection.' })
//     }
// })

//Rout 3: Update the existing user data by it's id using: PUT method 'api/user/updateuser/:id', 

router.put('/updateuser/:id', async (req, res) => {
    try {
        const note = await User.findById(req.params.id).maxTimeMS(120000);

        console.log(note);
        if (!note) {
            return res.status(404).send('Could not found');
        }

        const { fullName, gender, photo, DOB, description } = req.body;
        console.log(req.body);
        const updatedUser = {};
        const date = new Date()
        if (fullName) {
            updatedUser.fullName = fullName;
        }
        if (gender) {
            updatedUser.gender = gender;
        }
        if (photo) {
            updatedUser.photo = photo;
        }
        if (DOB) {
            updatedUser.DOB = DOB;
        }
        if (description) {
            updatedUser.description = description;
        }
        if (description) {
            updatedUser.date = date;
        }

        await User.findByIdAndUpdate(req.params.id, { $set: updatedUser }, { new: true }).maxTimeMS(120000);
        res.json({ Success: "Data has been updated successfully." });
    }
    catch (error) {
        console.log("Some error has occured during updation of the user data: ", error);
        res.json({ error: "Some error has occured during updation of the user data: " })
    }
})

//Rout 3: Update the existing user data by it's id using: PUT method 'api/user/updateuser/:id', 
router.get('/getdatabyid/:id', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.id).maxTimeMS(120000);
        if (!currentUser) {
            return res.status(404).send('Could not found');
        }
        res.json(currentUser);
    }
    catch (error) {
        console.log("Some error has occured during retrival of the user data by id: ", error);
        res.json({ error: "Some error has occured during retrival of the user data by id: " })
    }
})


//Rout 4: Delete the existing note using it's id by using DELETE method : 'api/user/deleteuser/:id', 
router.delete('/deleteuser/:id', async (req, res) => {
    try {
        const note = await User.findOne({ _id: req.params.id }).maxTimeMS(120000);
        console.log(note);
        if (!note) {
            return res.status(404).send('Could not found');
        }

        await User.findByIdAndDelete(req.params.id).maxTimeMS(120000);
        res.json({ Success: "The User Data has been deleted." });
    }

    catch (error) {
        console.log("Some error has occured during delete process : ", error);
        return res.status(401).json({ error: "Some error has occured during delete process." })
    }
});


// Route 5: Search data from a user name
router.get('/search', async (req, res) => {
    const { fullName, gender } = req.query;
    const regexforName = fullName.trim() === "" ? /.*/ : new RegExp('^' + fullName, 'i');
    const regexforGender = new RegExp('^' + gender);
    // const limit = 6; // Number of items per page
    // const currentPage = parseInt(page) || 1; // Current page number

    try {
        const users = await User.find({ fullName: regexforName, gender: regexforGender })

        const response = {
            totalResults: users.length,
            results: users,
        };

        res.json(response);
    } catch (error) {
        console.error('Error searching user:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
});


//Rout 6: To get the user photo by using userID:
router.get('/photo/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user || !user.photo) {
            return res.status(404).json({ error: 'User or photo not found.' });
        }

        const photoPath = path.join('Uploads', user.photo);
        res.sendFile(photoPath);
    } catch (err) {
        console.error('An unexpected error occurred.', err);
        return res.status(500).json({ error: 'An unexpected error occurred.' });
    }
});





//This is to export the router to the router logic to any where by importing the user.js, or by requiring the user.js route.
//to use this route we need to call a "use" method in express 
//? i.e app.use('/route', require('file path'))
//? i.e app.use('/api/user', require('./routes/user'))


module.exports = router;
