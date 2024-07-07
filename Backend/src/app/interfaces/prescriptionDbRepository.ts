import { PrescriptionRepositoryMongodbType } from "../../frameworks/database/repositories/prescriptionRepositoryMongodb";
import { PrescriptionEntityType } from "../../entities/prescriptionEntity";

export const prescriptionDbRepository = (
  repository: ReturnType<PrescriptionRepositoryMongodbType>
) => {

const addPrescription = async (data:any) =>
    await repository.addPrescriptions(data);

const fetchPrescription = async (data:any)=>
  await repository.fetPrescriptions(data);


const fetchPrescriptionDoctor = async (data:any)=>
    await repository.fetchPrescriptionlist(data);
  
  const deletePrescriptionDetails = async (prescriptionId:any)=>
    await repository.deletePrescriptionDetail(prescriptionId);
  

  
  return {
      addPrescription,
      fetchPrescription,
      fetchPrescriptionDoctor,
      deletePrescriptionDetails,
  }
  
  };
  export type PrescriptionDbInterface = typeof prescriptionDbRepository;    