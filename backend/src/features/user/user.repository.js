import  mongoose  from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";



const UserModel = mongoose.model('user',userSchema)


export default class UserRepository{

    async signUp(user) {
        try {
            // Check if user already exists
            const existingUser = await UserModel.findOne({ email: user.email });
            if (existingUser) {
                throw new ApplicationError("Duplicate entry: User already exists", 400);
            }
            
            // Create a new user instance based on the provided user data
            const newUser = new UserModel(user);
            
            // Save the new user to the database
            await newUser.save();
            
            // Return the newly created user
            return newUser;
        } catch (err) {
            // If an error occurs during the process, log it
            console.log(err);
            
            // Re-throw the error
            throw err;
        }
    }
    

    async signIn(email,password){
        try {
            return await UserModel.findOne({email,password})
        } catch (err) {
            console.log(err);
            throw new ApplicationError("Something went wrong in db",500);
        }
    }

    async findByEmail(email){

        try{
            return await UserModel.findOne({email});
        }catch(err){
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }

    async resetPassword(userID, hashedPassword){
        try {
            let user = await UserModel.findById(userID);
            user.password = hashedPassword;
            user.save();
        } catch (err) {
            throw new ApplicationError('Something went wrong with database', 500);
        }
    }
}

