const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const { database } = require('pg/lib/defaults');
const pg = require('pg');
const app = express();
const mysql = require('mysql2');
const { query } = require('express');

// app.use(cors());
app.use(bodyparser.json());

// database connection

const db = mysql.createConnection({
    host:'localhost',
    user:'akitra',
    password:'password',
    database:'demodata',
    port:3306
})

//check database connection
db.connect((err)=>{
    if (err){
        console.log(err, 'dberr');
    }
    console.log("DB connected...");
})

//middleware for all static files
app.use(express.static('./public'));

//get all data 
app.get('/user', (req, res) =>{

    const qr =  `select * from user`;
    
    db.query(qr, (err, result)=>{
        if (err){
            console.log(err, 'error');
        }
        if (result.length > 0){
            res.send({
                message:"all user data",
                data: result
            });
        }
    });
});

//get single data
app.get('/user/:id', (req, res)=>{
    const id = req.params.id;
    const query = `select * from user where id=${id}`;
    db.query(query, (err, result)=>{
        if(err){
            console.log(err, 'err');
        }
        if(result.length > 0){
            res.send({
                message:"get single data",
                data:result
            });
        } else {
            res.send({
                message: 'data not found'
            });
        }
    });
});

//create data
app.post('/user', (req, res) =>{
    const fullname = req.body.fullname;
    const email = req.body.email;
    const mobile = req.body.mobile;
    const query = `INSERT INTO user(fullname, email, mobile) 
    VALUES ('${fullname}', '${email}', '${mobile}')`;
    db.query(query, (err, result)=>{
        if(err){
            console.log(err, 'err');
        }
        console.log(result, "result");
        res.send({
                message: "Data Inserted"
            });    
    });
});

//update single data
app.put('/user/:id', (req, res)=>{

    console.log(req.body, 'Update data');

    const id = req.params.id;
    const fullname = req.body.fullname;
    const email = req.body.email;
    const mobile = req.body.mobile;

    const query = `update user set fullname = '${fullname}' 
    , email = '${email}', mobile = '${mobile}' where id=${id}`;

    db.query(query, (err, result)=>{
        if(err) {console.log(err);}
        res.send({
            message:"data update"
        })
    });
})

// delete single data
app.delete('/user/:id', (req, res)=>{

    const id = req.params.id;
    const query = `delete from user where id=${id}`;
    db.query(query, (err, result) =>{
        if(err) {console.log(err);}
        res.send({
            message:"data deleted"
        });
    });
});


app.listen(3000, ()=>{
    console.log("server running... on port 3000");
})

