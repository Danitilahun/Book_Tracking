import React, { FC } from "react";
import { CardDemo } from "./CardDemo";

interface CustomComponentProps {
  title: string;
}

const CustomComponent: FC<CustomComponentProps> = ({ title }) => {
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-white-600 h-full">
      <div className="h-20 bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className="overflow-y-auto overflow-x-hidden max-h-96 mt-4 mb-0 p-2 flex flex-col items-center justify-center">
        <CardDemo book={{ id: 1, title: "da", status: "to-read" }} />
        <CardDemo book={{ id: 1, title: "da", status: "to-read" }} />
        <CardDemo book={{ id: 1, title: "da", status: "to-read" }} />
      </div>
    </div>
  );
};

export default CustomComponent;
