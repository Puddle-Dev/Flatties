import Users from "./models/users"

const newUser = new Users({
    user_id:"1",
    user_first_name:"William",
    user_last_name:"Wang",
    user_email:"wsking233@gmail.com",
    user_phone:"0272372182",
    user_password:"123456",
    user_gender:"Male",
    user_dob:"1/1/2023",
});

//save user
newUser.save().then(savedUser =>{
    console.log(savedUser);
}).catch(err =>{
    console.log(err);
});

//get users
Users.find({}, (err, users) => {
    if(err){
        console.log(err);
    }else{
        console.log(users);
    }
});