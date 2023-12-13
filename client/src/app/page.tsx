import CustomComponent from "./components/CustomComponent";

export default function Home() {
  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="h-full w-full max-w-screen-lg mx-auto flex flex-col">
        <div className="bg-white h-1/6 sm:h-1/4 md:h-1/6 shadow-md border-b-4 border-white-600 mt-2"></div>{" "}
        <div className="flex flex-col h-5/6 sm:h-3/4 md:h-5/6 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
            <CustomComponent title="To-Read" />
            <CustomComponent title="In-Progress" />
            <CustomComponent title="Completed" />
          </div>
        </div>
      </div>
    </main>
  );
}
