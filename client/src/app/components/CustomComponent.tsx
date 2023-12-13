import React, { FC } from "react";

interface CustomComponentProps {
  title: string;
}

const CustomComponent: FC<CustomComponentProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-white-600 h-full">
      <div className="h-20 bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="overflow-y-auto max-h-96 mt-4 mb-0 p-2 flex flex-col items-center justify-center">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...</p>
        {/* Add more content here to enable scrolling */}
      </div>
    </div>
  );
};

export default CustomComponent;
