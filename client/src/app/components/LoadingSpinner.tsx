import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full bg-transparent">
      <Loader className="animate-spin min-h-[80vh]" />
    </div>
  );
};

export default LoadingSpinner;
