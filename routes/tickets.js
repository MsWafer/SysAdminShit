const express = require('express');
const router = express.Router();
const{check, validationResult} = require('express-validator');
const auth = require ('../middleware/auth');
const multer = require('multer'); 
  
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => { 
        cb(null, 'uploads') 
    }, 
    filename: (req, file, cb) => { 
        cb(null, file.fieldname + '-' + Date.now()) 
    } 
}); 
  
const upload = multer({ storage: storage }); 

const Ticket = require('../models/Ticket');
const User = require('../models/User');


//create ticket
router.post ('/', [auth, [
    check('problemname', 'Введите проблему').not().isEmpty(),
    check('text', 'Введите описание проблемы').not().isEmpty(),
    check('emergency', 'Укажите срочность').not().isEmpty()
]
], 
async(req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    try {
        const user = await User.findById(req.user.id).select('-password').populate('user');
        let currDate = new Date();
        // .toISOString().split('T')[0]
        upload.single('screenshot')
        const newTicket = new Ticket ({
            user: req.user.id,
            problemname: req.body.problemname,
            text: req.body.text,
            date: currDate,
            emergency: req.body.emergency,
            name: user.name,
            pcpass: req.body.pcpass,
            // screenshot: {
            //     data: blyad,
            //     contentType: 'image/png'
            // }
        });

        await newTicket.save();

        res.json({msg:'Ваша проблема будет обкашляна в ближайшее время'});
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('serve error');
    }
}
);

//get all tickets

router.get('/all', async(req,res) => {
    try {
        let arr = [];
        let tickets = await Ticket.find().sort({date:-1}).populate('user');
        // let currDate = ticket.date.toString().slice(4,24)
        tickets.map(ticket => arr.push(`${ticket.id}-${ticket.date.toString().slice(4,21)}-${ticket.user.name}-${ticket.problemname}-${ticket.emergency}-${ticket.status}`))
        res.json(arr);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('server error');
    }
});

//get ticket by id

router.get('/:id', async(req,res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('user');

        if(!ticket) {
            return res.status(404).json({msg: "ticket not found"});
        };

        res.json({
            id:`${ticket.id}`,
            date:`${ticket.date}`,
            user:`${ticket.user.name}`,
            problemname:`${ticket.problemname}`,
            text:`${ticket.text}`,
            pcpass:`${ticket.pcpass}`,
            emergency:`${ticket.emergency}`,
            status:`${ticket.status}`
        });
    } catch (err) {
        console.error(err.messsage);
        if(err.kind === 'ObjectId') {
            return res.status(404).json({msg: "ticket not found"});
        }
        res.status(500).send('server error');
    }
});

//get all user's tickets

router.get('/user/:id', async(req,res) => {
    try {
        let arr = [];
        let tickets = await Ticket.find({user: req.params.id}).sort({date: -1}).populate('user');
        tickets.map(ticket => arr.push(`${ticket.id}-${ticket.date.toString().slice(4,21)}-${ticket.problemname}-${ticket.emergency}-${ticket.status}`))
        res.json(arr);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('server error');
    }
});

//get all active tickets
router.get('/all/active', async(req,res) => {
    try {
        let arr = [];
        let tickets = await Ticket.find({status:true}).sort({date: -1}).populate('user');
        tickets.map(ticket => arr.push(`${ticket.id}-${ticket.date.toString().slice(4,21)}-${ticket.user.name}-${ticket.problemname}-${ticket.emergency}`))
        res.json(arr);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('server error');
    }
});

//get all tickets sorted by emergency
router.get('/all/emergency', async(req,res) => {
    try {
        let arr = [];
        let tickets = await Ticket.find().sort({emergency: -1}).populate('user');
        tickets.map(ticket => arr.push(`${ticket.id}-${ticket.date.toString().slice(4,21)}-${ticket.user.name}-${ticket.problemname}-${ticket.emergency}-${ticket.status}`))
        res.json(arr);
    } catch (err) {
        console.error(err.messsage);
        res.status(500).send('server error');
    }
});

//deactivate ticket by id
router.put("/:id", async (req, res) => {

    try {
        let ticket = await Ticket.findOneAndUpdate({id: req.params._id}, {$set: {status:false}})
        res.json({msg:`${ticket.id} пофикшен`});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error')
    }
});

module.exports = router;

