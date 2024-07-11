const DoctorShimmer = () => {
    return (
        <>
      <div className="w-full min-h-[80vh] lg:ml-20 px-4 pl-8 py-8 bg-gray-100 flex flex-col items-center animate-pulse">
        <div className="container mx-auto px-4 py-8">
          <h1 className="h-10 bg-gray-300 rounded w-1/3 mb-8 mx-auto"></h1>
          <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl mx-auto">
            {/* Left Section */}
            <div className="w-full md:w-1/3 mb-4 md:mb-0 flex justify-center">
              <div className="h-96 w-full md:w-96 bg-gray-300 rounded-lg shadow-md"></div>
            </div>
            {/* Right Section */}
            <div className="w-full md:w-2/3 md:pl-8">
              <div className="bg-white p-6 rounded-lg mb-4 shadow-lg w-full">
                <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                <div className="h-10 bg-gray-300 rounded w-full mb-4"></div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg w-full">
                <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-gray-300 rounded w-full"></div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 px-10 pt-6 rounded-lg shadow-lg text-center mt-8 w-full max-w-4xl mx-auto">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-300 rounded w-full"></div>
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default DoctorShimmer;
  