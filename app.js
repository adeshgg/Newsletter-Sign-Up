    const express = require('express');
    const bodyParser = require('body-parser');
    const request = require('request');

    const app = express();
    app.use(bodyParser.urlencoded({ extended : true}));
    app.use(express.static('public'));

    app.get('/', function(req,res){
    res.sendFile(__dirname + '/signup.html');
    });

    app.post('/', function(req, res){
    
        var firstName = req.body.fName;
        var lastName = req.body.lName;
        var email = req.body.email;

       // data is defined in mailchimp to send info,
       // needs to be passed by an array of objects called members
       // email_address, status, merge_fields, FNAME .. defined in mailchimp docs

        var data = {
            members : [
                {
                    email_address : email, 
                    status : 'subscribed',
                    merge_fields : {
                        FNAME : firstName,
                        LNAME : lastName
                    }
                }
            ]
        }
       
        var jsonData = JSON.stringify(data); // converting js object into json format
        var options = {
            url : <writeURL>,
            method :'POST',
            headers : {
                "Authorization" : <authorization>
            },
            body : jsonData // body defined in express to post data via api's
        };

        request(options, function(error, response, body){
            if(error) 
                {
                    res.sendFile(__dirname + '/failure.html');
                }
            else if (response.statusCode === 200) 
                {
                    res.sendFile(__dirname + '/success.html');
                }
            else res.sendFile(__dirname + '/failure.html');
        });

    });

    app.post('/failure', function(req, res){
        res.redirect('/');
    })

    app.listen(process.env.PORT || 3000, function(){
    console.log('Server spinning at port 3000');
    });


   
   
