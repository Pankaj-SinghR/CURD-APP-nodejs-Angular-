const getUser = (req, res) =>{

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
}

const getUserWithId = (req, res)=>{
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
}



