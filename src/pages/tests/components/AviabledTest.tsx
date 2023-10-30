import { Test } from "../../../types/Test";
import { Link, useSearchParams } from "react-router-dom";

type Props = {
  test: Test;
};
const AviabledTest: React.FC<Props> = ({ test }) => {
  const [, setSearchParams] = useSearchParams();

  const handleLink = () => {
    setSearchParams({ testId: test._id });
  };
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col ">
      <h1 className="text-2xl font-bold">{test.title}</h1>
      <Link to={`${test.title}?testId=${test._id}`} onClick={handleLink}>
        <button className="bg-blue-500 text-white rounded-full py-2 px-4 mt-4 hover:bg-blue-600">
          Start Test
        </button>
      </Link>
    </div>
  );
};

export default AviabledTest;
