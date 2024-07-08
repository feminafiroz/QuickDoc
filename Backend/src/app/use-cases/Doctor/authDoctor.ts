import DoctorEntity, { doctorEntityType, googleSignInUserEntity, googleSignInUserEntityType, } from "../../../entities/doctorEntity";
import { GoogleResponseDoctorType } from "../../../types/GoogleResponseType";
import { CreateDoctorInterfface } from "../../../types/doctorInterface";
import { HttpStatus } from "../../../types/httpStatus";
import CustomError from "../../../utils/customError";
import { doctorVerifyEmailPage } from "../../../utils/doctorVerifyEmailPage";
import sentMail from "../../../utils/sendMail";
import { doctorDbInterface } from "../../interfaces/doctorDBRepository";
import { AuthServiceInterfaceType } from "../../service-interface/authServiceInterface";


//register new doctor       

export const addNewDoctor = async(
    doctorData: CreateDoctorInterfface,
    doctorRepository:ReturnType<doctorDbInterface>,
    authService:ReturnType<AuthServiceInterfaceType>
)=>{
    const { doctorName, email,phoneNumber,password } = doctorData;
  const isEmailExist = await doctorRepository.getDoctorByEmail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptPassword(password);
  const verificationToken = authService.getRandomString(); // generates a random string using uuid 
  const doctor: doctorEntityType = DoctorEntity(
    doctorName,
    email,
    phoneNumber,
    hashedPassword,
    verificationToken,
  );
  const createdDoctor = await doctorRepository.addDoctor(
    doctor
  );
  //   sent verification mail to advertisement email address
  if (createdDoctor) {
    const emailSubject = "Doctor verification ";
    sentMail(
      email,
      emailSubject,
      doctorVerifyEmailPage(doctorName, verificationToken)
    );
  }
  return createdDoctor;
};

// verify doctor 

export const verifyAccount = async (
    token: string,
    doctorRepository: ReturnType<doctorDbInterface>
  ) => {
    const updateVerification = await doctorRepository.verifyDoctor(token);
    if (!updateVerification)
      throw new CustomError("Invalid token", HttpStatus.BAD_REQUEST);
    return updateVerification;
  };
  
  export const doctorLogin = async (
    email: string,
    password: string,
    doctorRepository: ReturnType<doctorDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const isEmailExist = await doctorRepository.getDoctorByEmail(email);
    if (!isEmailExist)
      throw new CustomError("Email is not existed, go nd register", HttpStatus.UNAUTHORIZED);
  
    if (!isEmailExist.isVerified)
      throw new CustomError("Please verify your email", HttpStatus.UNAUTHORIZED);

    if(isEmailExist.isBlocked)
      throw new CustomError("Your account is Blocked by Admin", HttpStatus.UNAUTHORIZED);
  
    const message =
      "Your account has not been approved by the admin yet. Please wait for approval.";
  
    const isPasswordMatch = await authService.comparePassword(
      password,
      isEmailExist.password
    );
    if (!isPasswordMatch)
      throw new CustomError("Wrong Password", HttpStatus.BAD_REQUEST);
    const  { accessToken, refreshToken }   = authService.doctorCreateTokens(
      isEmailExist.id,
      isEmailExist.doctorName,
      isEmailExist.role
    );
    return { accessToken, isEmailExist , refreshToken };
  };


  export const authenticateGoogleSignInDoctor = async (
    doctorData: GoogleResponseDoctorType,
    doctorDbRepository: ReturnType<doctorDbInterface>,
    authService: ReturnType<AuthServiceInterfaceType>
  ) => {
    const { name, email, picture, email_verified } = doctorData;

    const isEmailExist = await doctorDbRepository.getDoctorByEmail(email);
    if (isEmailExist?.isBlocked)
      throw new CustomError(
        "Your account is blocked by admin",
        HttpStatus.FORBIDDEN
      );

    if (isEmailExist) {
      const { accessToken, refreshToken } = authService.doctorCreateTokens(
        isEmailExist.id,
        isEmailExist.doctorName,
        isEmailExist.role
      );
  
      return { accessToken,isEmailExist , refreshToken };
    } else {
      const googleSignInUser: googleSignInUserEntityType = googleSignInUserEntity(
        name,
        email,
        picture,
        email_verified,
      );
  
      const createdUser = await doctorDbRepository.registerGoogleSignedDoctor(
        googleSignInUser
      );
      const userId = createdUser._id as unknown  as string ;
      const doctorName = createdUser.doctorName as unknown  as string ;
      const role = createdUser.role as unknown  as string ;
  
      const  { accessToken, refreshToken } = authService.doctorCreateTokens(
        userId,
        doctorName,
        role
      );
      return { accessToken, createdUser ,refreshToken};
    }
  };



  export const getDoctorProfile = async(
    doctorId : string,
    doctorRepository:ReturnType<doctorDbInterface>
  )=>{
    const doctor = await doctorRepository.getDoctorById(doctorId);
    return doctor;
  }

  export const getDoctorById = async (
    id: string,
    doctorRepository: ReturnType<doctorDbInterface>
  ) => await doctorRepository.getDoctorById(id);
