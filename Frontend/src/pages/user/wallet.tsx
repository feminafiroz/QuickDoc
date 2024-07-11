import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/user/Navbar/navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from "../../redux/store/store";

import { USER_API } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import Footer from "../../components/user/Footer/Footer";

const WalletPage: React.FC = () => {
  const user = useAppSelector((state) => state.UserSlice);
  const [walletAmount, setWalletAmount] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWalletAmount = async () => {
      const response = await axiosJWT.get(`${USER_API}/fetchWallet/${user.id}`);
      setWalletAmount(response.data.getWallet.balance);
    };

    fetchWalletAmount();
  }, [user.id]);

  const goToWalletHistory = () => {
    navigate("/user/walletHistory");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center bg-gray-100  min-h-[80vh]">
  <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md md:w-1/2 lg:w-1/3 mt-32 mb-28">
  <div className="flex items-center justify-center mb-4">
  <FontAwesomeIcon icon={faWallet} className="text-green-600 pr-2" size="2x" />
    <h2 className="text-3xl font-bold text-center text-gray-900 ">
      Wallet
    </h2>
    </div>
    <div className="text-center text-2xl text-gray-700">
      Your wallet amount is:
      <span className="block text-4xl font-bold text-red-500 mt-2">
      ₹{walletAmount}
      </span>
    </div>
    <div className="flex justify-center">
      <button
        className="mt-8 px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        onClick={goToWalletHistory}
      >
        View Wallet History
      </button>
    </div>
  </div>
</div>
<Footer />  

    </>
  );
};

export default WalletPage;
