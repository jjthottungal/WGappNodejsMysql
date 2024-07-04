const express = require('express');
const router = express.Router();

const dboperations = require('./dboperations');
const { encryptData, decryptData } = require('./aes_encryption.js');
const { access_token } = require('./config.js');
const jwt = require('jsonwebtoken');


//Authentication routine for JWT
function authenticationToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, access_token, (err, payload) => {
        if (err) return res.sendStatus(403);
        //req.payload = payload;
        next();

    })
}

//----Routers to call WebApi

//Cheetukali Summary
router.get('/CheetukaliSummary', authenticationToken, (req, res) => {
    dboperations.cheetukaliSummary().then(result => {
        const data = JSON.stringify(result[0]);
        const encryptedData = encryptData(data);

        //res.json(result[0]);
        res.json({ encryptedData });
    })
});


//Cheetukali Family Summary
router.get('/CheetukaliFamilySummary', (req, res) => {
    dboperations.cheetukaliFamilySummary().then(result => {
        const data = JSON.stringify(result[0]);
        const encryptedData = encryptData(data);
        res.json({ encryptedData });
        //res.json(result[0]);
    })
});


//Cheetukali List
router.get('/CheetukaliList', (req, res) => {
    dboperations.cheetukaliList().then(result => {
        res.json(result[0]);
    })
});


//Cheetukali Deatils All
router.get('/CheetukaliDetailsAll', (req, res) => {
    dboperations.cheetukaliDetailsAll().then(result => {
        res.json(result[0]);
    })

});

//CheetukaliListGroupByMont
router.get('/CheetukaliListGroupByMonth', (req, res) => {
    dboperations.cheetukaliListGroupByMonth().then(result => {
        res.json(JSON.parse(JSON.stringify(result[0].v_json)));

    })

});

//Cheetukali Deatils by ID
router.get('/CheetukaliDetails', (req, res) => {
    dboperations.cheetukaliDetails(req.query.wgId).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`Play event with Id = ${req.query.wgId} not found`);
    })
});

//User List
router.get('/UserList', (req, res) => {
    dboperations.userList(req.query.type).then(result => {
        if (result)
            res.json(result[0]);
        else
            res.status(404).json(`User type with type=${req.query.type}  not found`);
    })
});


//Login
router.post('/Login', (req, res) => {
    dboperations.WgLogin(req.body.UserID, req.body.Password).then(result => {

        if (result) {
            //User is authenticated and create JWT
            const user = { name: req.body.UserID };
            const accessToken = jwt.sign(user, access_token);
            let resultObj = result[0][0];
            //Replace 1,0 with true or false
            resultObj['IsAdmin'] = resultObj['IsAdmin'] == 1 ? true : false;
            resultObj = { ...resultObj, jwt_token: 'bearer ' + accessToken };
            res.json([resultObj]);
            //res.json(result[0]);
        }
        else {
            res.status(404).json('Invalid User');
        }
    })
});


//AddEvent
router.post('/AddEvent', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.addEvent(bodyjsonstring).then(result => {

        if (result) {
            res.status(201).json('Event Created');
        }
        else {
            res.status(400).json('Insert Error');
        }
    })

});


//AddWinner
router.post('/AddWinner', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.addWinner(bodyjsonstring).then(result => {

        if (result) {
            res.status(201).json('Winner Created');
        }
        else {
            res.status(400).json('Insert Error');
        }
    })

});

//DelWinner
router.post('/DelWinner', (req, res) => {
    const bodyjsonstring = JSON.stringify(req.body);
    dboperations.delWinner(bodyjsonstring).then(result => {

        if (result) {
            res.status(200).json('Winner Deleted');
        }
        else {
            res.status(404).json('Delete Error');
        }
    })

});

//DelEvent
router.post('/DelEvent', (req, res) => {
    dboperations.delEvent(req.query.wgId).then(result => {

        if (result) {
            res.status(200).json('Event Deleted');
        }
        else {
            res.status(404).json('Delete Error');
        }
    })

});

module.exports = router;