const db = require("../db/db")
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Signup = async (req,res) => {

    try {
    const {name,email,password} = req.body
    const saltRounds = 10;

    const salt = await bcrypt.genSalt(saltRounds); // Generate salt asynchronously
    const hashedPassword = await bcrypt.hash(password, salt);
        

    if(!name, !email) {
        res.status(400).json({
            message:"field is missing"
        })
    }

    const user = await db.user.create({
        name:name,
        email:email,
        password:hashedPassword
    })

    res.status(200).json({
        data:{
            user:user,
            message:"user signup successfull"
        }
    })
} catch(error) {
    console.log(error)
    if(error instanceof db.Sequelize.UniqueConstraintError) {
        return res.status(409).json({message:"email already exist"})
    }
    return res.status(400).json({
        error:error
    })
}
}

const UserData = async(req,res) =>{

    const userId= req.userId

    const {id} = req.params
    // console.log(req)
    console.log("iddd>>>",userId)
    res.json({id:id})

}

const Login = async (req,res) => {
    const { user } = req.query;
    console.log( "adadfsdsf" ,user)
    try {
    const {email,password} = req.body
    if(!email) {
        return res.status(400).json({
            message:"email not found"
        })
    }

    const user = await db.user.findOne({
        where:{
            email:email
        }
    })

    if(!user) {
    return    res.status(400).json({message:"user not found"})
    }

    const passworddd = await bcrypt.compare(password, user.password)

    if(!passworddd) {
       return res.json({message:"password not mathced"})
    }

    const token = jwt.sign({ userId: user.id }, 'your-secret-key', {
        expiresIn: '1d',
        });

    return res.json({
        data:user,
        token:token
    })
}catch(error) {
    res.json({error:error})
}
}

const UpdateUser = async (req,res) => {
    console.log(req)
    try {
    const {name,email} = req.body

    const user = await db.user.findOne({
        where:{
            email:email
        }
    })

    if(!user) {
        return  res.json({
           message:"user not found"
        })
    }

     await user.update({
        name:name,
        email:email
    })

    user.save()

    res.json({
        message : "updated",
        user:user
    })
} catch(error) {
res.json({
    error:error
})
}
}

module.exports= {Signup, Login, UpdateUser, UserData}