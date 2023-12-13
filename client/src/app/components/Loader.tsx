import { Loader } from "lucide-react";

const Load = () => {
  return (
    <div className="flex justify-center items-center h-full bg-transparent">
      <Loader className="animate-spin min-h-[80vh] bg-transparent" />
    </div>
  );
};

export default Load;
