/*   database: CIT301 --  Index.js page for Program6  */
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json())               // <-- angularjs sends json data 
app.use(bodyParser.urlencoded({ extended: true }));

var Student = require('./modules/Student.js');  // Student model

app.use(express.static('public'))       // serve static files


app.use('/showAll', function(req, res) {   // Retrieve all
                                             
    Student.find( function(err, students) {   
		 if (err) {
		     res.status(500).send(err);
		 }
		 else {
			 res.send(students);  
		 }
    });
})


app.post('/addStudent', function(req, res){    // Create a new student object
	var newStudent = new Student ({               
		sid: req.body.sid,     
		last_name: req.body.last_name,
		first_name: req.body.first_name,
		major: req.body.major,
		midterm: 0,  					 //Student has no scores yet.
		final: 0
	});

	newStudent.save( function(err) {  
		if (err) {
		    res.status(500).send(err);
		}
		else {
		    res.send("Student successfully added.");  
		}
   }); 
});


app.get('/getOne', function(req, res) {  //Retrieve one student for edit page
	sid = req.query.sid;
	Student.findOne( {sid: sid}, function(err, student) {
		if (err) {
			res.status(500).send(err);
		}
		else {
		    res.send(student);
	   }
	});
});


app.post('/updateStudent', function(req, res) {  //update students

    var updateSid = req.body.sid;   
    var updateMajor = req.body.major;
	var updateMidterm = req.body.midterm;
	var updateFinal = req.body.final;
    
    Student.findOne( {sid: updateSid}, function(err, student) {  
		if (err) {
		    res.status(500).send(err);
		}
		else {
			student.major = updateMajor;
			student.midterm = updateMidterm;
			student.final = updateFinal;
		
			student.save(function (err) {
                if(err) {
                    res.status(500).send(err);
                }
            });
		    res.send("Update successful");
	   }
    });        

});


app.listen(3000,  function() {
	console.log('Listening on port 3000, ctrl-c to quit');
});