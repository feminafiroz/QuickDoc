import { DoctorInterface } from '../../../../types/doctorInterface';
import { doctorDbInterface } from '../../../interfaces/doctorDBRepository';

export const getDoctorProfile = async(doctorID :string,DoctorRepository:ReturnType<doctorDbInterface>)=>{
    const doctor = await DoctorRepository.getDoctorById(doctorID);
    return doctor ;
}

export const   updateDoctor = async (
    doctorID: string,
    updateData: DoctorInterface,
    doctorRepository: ReturnType<doctorDbInterface>
  ) => {
    return await doctorRepository.updateProfile(doctorID, updateData);
}

