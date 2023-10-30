import { useErrorBoundary } from "react-error-boundary";
import { getUserTests } from "../../../api/api";
import { UserTests } from "../../../types/UserTests";
import AvailedTest from "./AviabledTest";
import PassedTest from "./PassedTest";
import { useState, useEffect } from "react";

const TestList = () => {
  const [tests, setTests] = useState<UserTests | null>(null);
  const { showBoundary } = useErrorBoundary();
  const getTests = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("userId") || "");
      if (!userId) {
        throw new Error("Can not find user please try go to /login page");
      }
      const tests = await getUserTests(userId);
      if (!tests.assignedTests) {
        throw new Error("Can not get user tests please try again");
      }
      setTests(tests);
    } catch (err) {
      showBoundary(err);
    }
  };

  useEffect(() => {
    getTests();
  }, []);

  return (
    <div className="p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Available Tests</h2>
        {tests && tests.assignedTests
          ? tests.assignedTests.map((test) => (
              <AvailedTest key={test._id} test={test} />
            ))
          : null}
        {tests && !tests.assignedTests ? (
          <h3>You have no assigned tests</h3>
        ) : null}
      </div>
      <div>
        <h2 className="text-2xl font-bold">Passed Tests</h2>
        {tests && tests.completedTests
          ? tests.completedTests.map((test) => (
              <PassedTest key={test.testId} test={test} />
            ))
          : null}
        {tests && !tests.completedTests ? (
          <h3>You havent passed any test</h3>
        ) : null}
      </div>
    </div>
  );
};

export default TestList;
