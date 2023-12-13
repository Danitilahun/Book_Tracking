import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

// {/* Set height for the bottom items to be automatic */}
// <div className="bg-green-300 flex flex-col justify-center items-center h-full">
//   {/* Make sure the height fills the available space */}
//   <h2 className="text-lg font-semibold">Title</h2>
//   <div className="w-full h-full bg-white shadow overflow-y-auto mt-2">
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
//     </p>
//   </div>
// </div>
// <div className="bg-yellow-300 flex flex-col justify-center items-center h-full">
//   {/* Make sure the height fills the available space */}
//   <h2 className="text-lg font-semibold">Title</h2>
//   <div className="w-full h-full bg-white shadow overflow-y-auto mt-2">
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
//     </p>
//   </div>
// </div>
// <div className="bg-red-300 flex flex-col justify-center items-center h-full">
//   {/* Make sure the height fills the available space */}
//   <h2 className="text-lg font-semibold">Title</h2>
//   <div className="w-full h-full bg-white shadow overflow-y-auto mt-2">
//     <p>
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. ...
//     </p>
//   </div>
// </div>
