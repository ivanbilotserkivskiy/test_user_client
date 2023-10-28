import { loginUser } from "../../../api/api";
import { LoginData } from "../../../types/LoginData";
import { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginData>({
    username: "",
    password: "",
  });

  const [isError, setIsError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changeFormData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const submitFormData = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      setIsError("");
      const loginStatus = await loginUser(formData);
      if (loginStatus.error) {
        setIsError(loginStatus.message || "");
        return;
      }
      if (loginStatus.access_token) {
        cookies.set("jwt_authorization", loginStatus.access_token, {
          path: "/",
          expires: new Date(Date.now() * 1000),
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-5/6 mx-auto mt-10 p-4 border rounded-lg bg-white">
      <form onSubmit={submitFormData} className="space-y-4">
        <div>
          <label className="block text-gray-700" htmlFor="username">
            Username
          </label>
          <input
            autoComplete="username"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            onChange={changeFormData}
            value={formData.username}
          />
        </div>
        <div>
          <label className="block text-gray-700" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="current-password"
            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50"
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={changeFormData}
            name="password"
          />
        </div>
        <div>
          {isError ? (
            <p className="block text-red-700">
              {`Something went wrong with user login: ${isError}`}
            </p>
          ) : null}
        </div>
        <div>
          <button
            disabled={isLoading}
            className="w-full bg-blue-500 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring"
            type="submit"
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
