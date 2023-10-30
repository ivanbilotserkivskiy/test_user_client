import { useNavigate, useSearchParams } from "react-router-dom";
import Question from "./components/Question";
import { createCompletedTest, getOneTest, getUserTests } from "../../api/api";
import { useState, useEffect } from "react";
import { Test } from "../../types/Test";
import { ScoreRecord } from "../../types/ScoreRecord";
import { useErrorBoundary } from "react-error-boundary";

const TestPage = () => {
  const [searchParams] = useSearchParams();
  const [test, setTest] = useState<Test | null>(null);
  const [record, setRecord] = useState<ScoreRecord>({});
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const getTestById = async () => {
    try {
      setError("");
      const testId = searchParams.get("testId");
      if (!testId) {
        setError("Can not find test");
        return;
      }
      const test = await getOneTest(testId);
      if (!test) {
        setError("Can not find test");
        throw new Error("Can not find test");
      }

      const userId = JSON.parse(localStorage.getItem("userId") || "");
      if (!userId) {
        setError("Can not find user");
        return;
      }
      const userCompletedTest = await getUserTests(userId);
      if (!userCompletedTest) {
        setError("You passed this test already");
        throw new Error("Can not find test");
      }
      const passedIds = userCompletedTest.completedTests.map(
        (test) => test.testId
      );
      if (passedIds.includes(testId)) {
        setError("Test already passed");
        return;
      }
      setRecord(
        test.questions.reduce((result, question) => {
          return {
            ...result,
            [question._id]: null,
          };
        }, {})
      );
      setTest(test);
    } catch (error) {
      showBoundary(error);
    }
  };

  const handleAnswerChange = (id: string, index: number) => {
    setRecord((prev) => ({
      ...prev,
      [id]: index,
    }));
  };

  const makeRedirect = () => {
    return navigate("/");
  };

  const submitData = async () => {
    try {
      if (Object.values(record).some((value) => value === null)) {
        setError("You need to complete all the questions");
        return;
      }
      const userId = JSON.parse(localStorage.getItem("userId") || "");
      if (!userId) {
        return;
      }
      const testId = searchParams.get("testId");
      if (!testId) {
        return;
      }
      const data = {
        userId,
        testId,
        record,
      };

      const updateStatus = await createCompletedTest({ data: data });
      if (!updateStatus) {
        throw new Error("Error ocured on update");
      }
      navigate("/");
    } catch (error) {
      showBoundary(error);
    }
  };

  useEffect(() => {
    getTestById();
  }, []);

  return (
    <>
      {error ? (
        <div className="flex flex-col items-center py-10">
          <h1 className="mb-10 text-center">{error}</h1>
          <button
            onClick={makeRedirect}
            className="mt-4 w-64 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Go to the test page
          </button>
        </div>
      ) : null}
      {!error ? (
        <div className="flex flex-col py-10">
          <h1 className="mb-10 text-center">{test?.title}</h1>
          {test
            ? test.questions.map((question) => (
                <Question
                  key={question._id}
                  question={question}
                  record={record}
                  handleAnswerChange={handleAnswerChange}
                />
              ))
            : null}
          <button
            type="submit"
            onClick={submitData}
            className="mt-4 w-64 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Submit Results
          </button>
        </div>
      ) : null}
    </>
  );
};

export default TestPage;
