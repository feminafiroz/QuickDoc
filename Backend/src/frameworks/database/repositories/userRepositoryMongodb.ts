import { googleSignInUserEntityType, userEntityType } from "../../../entities/userEntity";
import { UserInterface } from "../../../types/userInterface";
import OTPModel from "../models/otp";
import User from "../models/user";
import wallet from "../models/wallet";
import Transaction from "../models/transaction";



export const userRepositoryMongodb = () =>{
    const getUserbyEmail = async (email: string)=>{
        const user: UserInterface | null = await User.findOne({email});
        return user;
    }

    const getUserbyId = async (id: string) => await User.findById(id);

    const addUser = async (user:userEntityType)=>{
        const newUser:any = new User({
            name:user.name(),
            email:user.getEmail(),
            password:user.getPassword(),
            phoneNumber:user.getphoneNumber(),
            authenticationMethod:user.getAuthenticationMethod(),
        });
        await newUser.save();
        return newUser;
    };

    const AddOTP = async (OTP: string, userId: string)=>{
        await OTPModel.create({OTP, userId});
    };

    const findOtpUser = async (userId:string)=>await OTPModel.findOne({userId: userId});

    const deleteOtpUser = async (userId: string) =>await OTPModel.deleteOne({ userId });

    const updateUserInfo = async (id: string, updateData:Record<string,any>)=>await User.findByIdAndUpdate(id,updateData,{new:true});

    const updateVerificationCode = async (email: string, code: string) => await User.findOneAndUpdate({ email }, { verificationCode: code });

    const findVerificationCodeAndUpdate = async (
        code: string,
        newPassword: string
      ) =>
        await User.findOneAndUpdate(
          { verificationCode: code },
          { password: newPassword, verificationCode: null },
          { upsert: true }
     );

    const getAllUsers = async () => await User.find({ isVerified: true });

    const updateUserBlock = async(id:string,status:boolean) => await User.findByIdAndUpdate(id,{isBlocked:status});

    const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>
        await User.create({
          name: user.name(),
          email: user.email(),
          profilePicture: user.picture(),
          isVerified: user.email_verified(),
          authenticationMethod:user.authenticationMethod(),
        });

        const addWallet = async (userId: string) => await wallet.create({ userId });

        const getWalletUser = async (userId:string) => {
            const response = await wallet.findOne({userId:userId}); 
             return response;
     
         }

         const getAllTransaction = async (userId:any) =>{
            const transactions = await Transaction.find({userId:userId});
            return transactions;
        }  



    return {
        getUserbyEmail,
        getUserbyId,
        addUser,
        AddOTP,
        findOtpUser,
        updateUserInfo,
        deleteOtpUser,
        updateVerificationCode,
        findVerificationCodeAndUpdate,
        getAllUsers,
        updateUserBlock,
        registerGoogleSignedUser,
        addWallet,
        getWalletUser,
        getAllTransaction
    };

};

export type userRepositoryMongodbType = typeof userRepositoryMongodb;
