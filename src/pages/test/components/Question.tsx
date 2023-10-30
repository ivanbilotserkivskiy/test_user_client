import { Question as QuestionType } from "../../../types/Question";
import { decode } from "html-entities";

type Props = {
  question: QuestionType;
  handleAnswerChange: (id: string, index: number) => void;
  record: {
    [key: string]: number;
  };
};

const Question: React.FC<Props> = ({
  question,
  handleAnswerChange,
  record,
}) => {
  return (
    <div className="bg-white p-4 shadow-md">
      <h3 className="text-lg font-bold">{decode(question.question)}</h3>
      <div className="mt-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`py-2 px-4 rounded-md mr-2 last:mr-0 ${
              index === record[question._id]
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-800"
            } hover:bg-blue-600 hover:text-white`}
            onClick={() => {
              handleAnswerChange(question._id, index);
            }}
          >
            {decode(option)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
