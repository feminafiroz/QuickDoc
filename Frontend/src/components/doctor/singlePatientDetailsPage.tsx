import { useState, useEffect } from "react";
import axiosJWT from "../../utils/axiosService";
import { useNavigate, useParams } from "react-router-dom";
import { CHAT_API, DOCTOR_API, USER_API } from "../../constants";
import { RiFileAddLine } from "react-icons/ri";
import showToast from "../../utils/toaster";
import { AiOutlineFileText, AiOutlineVideoCamera } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useAppSelector } from "../../redux/store/store";
import axios from "axios";

const PatientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const doctor = useAppSelector((state) => state.DoctorSlice);
  const navigate = useNavigate();
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [prescriptionDate, setPrescriptionDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [doctorName, setDoctorName] = useState("");
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [medicines, setMedicines] = useState<
    { name: string; dosage: string; instructions: string }[]
  >([{ name: "", dosage: "", instructions: "" }]);
  const [prescription, setPrescription] = useState<any | null>(null);
  const [isVideoCallDisabled, setIsVideoCallDisabled] = useState(false);
  const [isCallJoined, setIsCallJoined] = useState(false);

  const userID = doctor.id;
  const userName = doctor.name;
  const appID = 1874253558;
  const serverSecret = "b20915d03efd29962f6e3dc9c4e02ac0";
  //@ts-ignore
  const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,null,userID,userName);

  const zp = ZegoUIKitPrebuilt.create(TOKEN);
  zp.addPlugins({ ZIM });

  function invite() {
    if (!zp) {
      console.error("ZegoUIKitPrebuilt instance is not initialized.");
      return;
    }
    
    const targetUser = {
      userID: patient.userId,
      userName: patient.patientName,
    };
    zp.sendCallInvitation({
      callees: [targetUser],
      callType: ZegoUIKitPrebuilt.InvitationTypeVideoCall,
      timeout: 60, // Timeout duration (second). 60s by default, range from [1-600s].
    })
      .then((res) => {
        console.warn(res);
        setIsCallJoined(true); 
      })
      .catch((err) => {
        console.warn(err);
      });
  }

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/bookingdetails/${id}`);
        const bookingData = response.data.data.bookingDetails;
        setPatient(bookingData);
        if (bookingData?.appoinmentStatus === "Consulted" || bookingData?.appoinmentStatus === "unConsulted") {
          setIsVideoCallDisabled(true);
        }
      } catch (err) {
        console.error("Error fetching patient details:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchPrescriptionDetails = async () => {
      try {
        const response = await axiosJWT.get(`${DOCTOR_API}/prescription/${id}`);
        // Assuming the prescription is returned as an array
        if (response.data.response && response.data.response.length > 0) {
          setPrescription(response.data.response[0]);
        }
      } catch (err) {
        console.error("Error fetching prescription details:", err);
      }
    };

    fetchPatientDetails();
    fetchPrescriptionDetails();
  }, [id]);

  const handleAddPrescription = () => {
    setModalOpen(true);
  };

  const handleViewPrescription = () => {
    setViewModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSave = async () => {
    const data = {
      appointmentId: id,
      prescriptionDate: prescriptionDate,
      medicines: medicines,
    };
    const response = await axiosJWT.post(`${DOCTOR_API}/addPrescription`, data);
    if (response) {
      showToast("Prescription added successfully", "success");
    }

    setModalOpen(false);
  };

  const updateConsultationStatus = async (status: string) => {
    if (!isCallJoined) {
      showToast("Please join the video call with the patient first.", "error");
      return;
    }
    try {
      const response = await axiosJWT.put(
        `${DOCTOR_API}/bookingdetails/${id}`,
        {
          appoinmentStatus: status,
        }
      );

      if (response.status === 200) {
        setPatient((prevState: any) => ({
          ...prevState,
          appoinmentStatus: status,
        }));
        setIsVideoCallDisabled(true); 
        showToast(
          `Appointment consultation ${
            status === "Consulted" ? "Successful" : "unConsulted"
          }`,
          "success"
        );
      } else {
        showToast("Failed to update consultation status", "error");
      }
    } catch (error) {
      console.error("Error updating appointment consultation status:", error);
      showToast("Error updating appointment consultation status", "error");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  const handleChat = () => {
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: patient.userId,
        recieverId: doctor.id,
      })
      .then(({ data }) => {
        console.log(data, "dataaaaaaaa");
        navigate("/doctor/chat");
      })
      .catch(() => {
        console.log("error in sending chat");
      });
  };

  
  return (
    <div className="flex justify-center items-center py-10 bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Patient Details</h1>
        {patient ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Name</h2>
              <p className="text-gray-900">{patient.patientName}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Age</h2>
              <p className="text-gray-900">{patient.patientAge}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Gender</h2>
              <p className="text-gray-900">{patient.patientGender}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Problem</h2>
              <p className="text-gray-900">{patient.patientProblem}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Date</h2>
              <p className="text-gray-900">
                {new Date(patient.date).toLocaleDateString()}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Time</h2>
              <p className="text-gray-900">{patient.timeSlot}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
              <h2 className="font-bold text-gray-700">Payment Status</h2>
              <p className="text-gray-900">{patient.paymentStatus}</p>
            </div>
            {patient.appoinmentStatus === "Booked" || patient?.appoinmentStatus == "Consulted" || patient?.appoinmentStatus == "unConsulted"  ? (
              <>
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <h2 className="font-bold text-gray-700">Chat with Patient</h2>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-800 flex items-center mt-3"
                    onClick={handleChat}
                  >
                    <FiMessageSquare className="mr-2" /> Chat
                  </button>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <h2 className="font-bold text-gray-700">Join Video call</h2>
                  <button className={`bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-700 flex items-center mt-3 ${isVideoCallDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={invite}
                        disabled={isVideoCallDisabled}>
                       <AiOutlineVideoCamera className="mr-2" /> Join
                  </button>
                </div>

                {patient?.appoinmentStatus == "unConsulted" || patient?.appoinmentStatus == "Consulted" ? ( 
                  <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <h2 className="font-bold text-gray-700">Consultation Status</h2>
                  <p className="text-gray-900 font-semibold">{patient?.appoinmentStatus}</p>
                </div>
                ) : (
                  <>
                <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
                  <h2 className="font-bold text-gray-700">
                    Consultation Status :
                  </h2>
                  {patient && patient.appoinmentStatus === "Booked" && (
                    <div className="mt-6 flex justify-center space-x-4">
                      <button
                        className="bg-green-500 text-white py-2 px-6 rounded-md shadow hover:bg-green-700"
                        onClick={() => updateConsultationStatus("Consulted")}
                        // disabled={!isCallJoined || patient.appoinmentStatus === "Consulted"}
                      >
                        Success
                      </button>
                      <button
                        className="bg-red-500 text-white py-2 px-6 rounded-md shadow hover:bg-red-700"
                        onClick={() => updateConsultationStatus("unConsulted")}
                        // disabled={!isCallJoined || patient.appoinmentStatus === "unConsulted"}
                      >
                        Failure
                      </button>
                    </div>
                  )}
                </div>
                </>
                )}




                <div className="flex justify-center items-center mt-4 md:col-span-2">
                  {prescription ? (
                    <button
                      className="bg-blue-900 text-white py-2 px-4 rounded-md shadow hover:bg-blue-800 flex items-center"
                      onClick={handleViewPrescription}
                    >
                      <AiOutlineFileText className="mr-2" /> View Prescription
                    </button>
                  ) : (
                    <button
                      className="bg-blue-900 text-white py-2 px-4 rounded-md shadow hover:bg-blue-800 flex items-center"
                      onClick={handleAddPrescription}
                    >
                      <RiFileAddLine className="mr-2" /> Add Prescription
                    </button>
                  )}
                </div>
              </>
            ) : (
              <>
                <p className="text-red-500 text-md font-bold ">
                  Appointment cancelled
                  <br />
                  Reason: {patient.appoinmentCancelReason}
                </p>
              </>
            )}
          </div>
        ) : (
          <p className="text-center text-gray-700 ">
            No patient details available.
          </p>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Add Prescription
            </h2>
            <div className="mt-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prescription Date
                </label>
                <input
                  type="date"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-800"
                  value={prescriptionDate}
                  onChange={(e) => setPrescriptionDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Doctor's Name
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-800"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                />
              </div>
              {medicines.map((med, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"
                >
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Medicine Name"
                    value={med.name}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].name = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].dosage = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  <input
                    type="text"
                    className="border rounded-lg px-3 py-2 w-full"
                    placeholder="Instructions"
                    value={med.instructions}
                    onChange={(e) => {
                      const newMedicines = [...medicines];
                      newMedicines[index].instructions = e.target.value;
                      setMedicines(newMedicines);
                    }}
                  />
                  {index > 0 && (
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => {
                        const newMedicines = medicines.filter(
                          (_, i) => i !== index
                        );
                        setMedicines(newMedicines);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                className="text-blue-800 hover:text-blue-600 font-semibold"
                onClick={() =>
                  setMedicines([
                    ...medicines,
                    { name: "", dosage: "", instructions: "" },
                  ])
                }
              >
                Add More Medicines
              </button>
            </div>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Prescription Details
            </h2>
            {prescription ? (
              <div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Prescription Date
                  </h3>
                  <p className="text-gray-900">
                    {new Date(
                      prescription.prescriptionDate
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Medicines
                  </h3>
                  <ul className="list-disc list-inside">
                    {prescription?.medicines?.map(
                      (medicine: any, index: number) => (
                        <li key={index} className="text-gray-900">
                          {medicine.name} - {medicine.dosage} -{" "}
                          {medicine.instructions}
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    onClick={() => setViewModalOpen(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Close
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await axiosJWT.delete(
                          `${DOCTOR_API}/prescription/${prescription._id}`
                        );
                        showToast(
                          "Prescription deleted successfully",
                          "success"
                        );
                        setPrescription(null); // Clear the prescription after deletion
                        setViewModalOpen(false);
                      } catch (err) {
                        console.error("Error deleting prescription:", err);
                        showToast("Error deleting prescription", "error");
                      }
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete Prescription
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-700">
                No prescription details available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetailPage;
