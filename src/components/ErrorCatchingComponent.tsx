import { FallbackProps } from "react-error-boundary";

export const ErrorCatchingComponent = (props: FallbackProps) => {
  const { error, resetErrorBoundary } = props;
  return (
    <div className="flex justify-center items-center h-screen p-2">
      <div className="bg-red-500 p-4 rounded-lg shadow-md w-96 flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold text-red-600">Error</h1>
        <p className="text-lg text-red-600">{error.message}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          onClick={resetErrorBoundary}
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};
