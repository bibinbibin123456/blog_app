const UserDb = require("../models/userModel");
const { createToken } = require("../Utilities/generateToken");
const { hashPassword, comparePassword } = require("../Utilities/passwordUtilities");

const register = async (req, res) => {
    try {
        const { name, email, phone, password, confirmpassword } = req.body;

        if (!name || !email  || !password ) {
            return res.status(400).json({
                error: "All fields are required"
            });
        }

        if (password !== confirmpassword) {
            return res.status(400).json({
                error: "Passwords do not match"
            });
        }

        const userExist = await UserDb.findOne({ email });

        if (userExist) {
            return res.status(409).json({
                error: "Email already exists"
            });
        }

        const hashedPassword= await hashPassword(password)
        const newUser = new UserDb({
            name,
            email,
            phone,
            password:hashedPassword
        });

       const saved= await newUser.save();
       if(saved){
        const token= createToken(saved._id)
       
        res.cookie('token',token)

        return res.status(201).json({
            message: "User created successfully"
        });
        
       }


        

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            error: error.message || "Internal server error"
        });
    }
};

const login = async(req,res)=>{
    try {
        const {email,password}= req.body
        if(!email ||!password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userExit= await UserDb.findOne({email})
        if(!userExit){
            return res.status(400).json({error:"User not found"})
        }

        const passwordMatch= await comparePassword(password,userExit.password)
        if(!passwordMatch){
            return res.status(400).json({error:"Password does not match"})
        }
         const token= createToken(userExit._id)
       
        res.cookie('token',token)
        return res.status(200).json({message:"User login succesfully"})

    } catch (error) {
                console.log(error);

        return res.status(500).json({
            error: error.message || "Internal server error"
        });
    }
}

module.exports = {
    register,
    login
};