

const DoctorItemsShimmer = () => {
    return (
        <div className="flex justify-center mt-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                    <div key={index} className="animate-pulse flex flex-col items-center p-4 border rounded-lg shadow-md">
                        <div className="w-40 h-40 bg-gray-200 rounded-full mb-4"></div>
                        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-1/2 h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorItemsShimmer;