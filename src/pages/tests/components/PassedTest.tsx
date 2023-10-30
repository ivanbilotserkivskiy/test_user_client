import { PassedTest as PassedTestType } from "../../../types/PassedTest";
import { getDateFromTime } from "../../../utils/getDateFromTime";

type Props = {
  test: PassedTestType;
};

const PassedTest: React.FC<Props> = ({ test }) => {
  const date = getDateFromTime(test.dateCompeted);
  return (
    <div className="bg-blue-100 p-4 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold">{test.title}</h1>
      <p className="text-lg">
        Score: <span className="font-bold">{test.score}/100</span>
      </p>
      <p className="text-md">
        Passed Date: <span className="font-bold">{date}</span>
      </p>
    </div>
  );
};

export default PassedTest;
