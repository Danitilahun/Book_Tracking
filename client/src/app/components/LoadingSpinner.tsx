import { Loader } from "lucide-react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader
        className="animate-spin min-h-[80vh]"
        style={{
          width: "60px",
          height: "60px",
          backgroundColor: "transparent !important",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
