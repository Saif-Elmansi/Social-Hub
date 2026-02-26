import { zodResolver } from "@hookform/resolvers/zod";
import { Eye } from "iconsax-react";
import { EyeOff } from "lucide-react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Error from "../../Componants/Error/Error";
import Hero from "../../Componants/hero/Hero";
import axios from "axios";
import { authContext } from "../../Componants/Context/AuthContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const nav = useNavigate();

  const { token, setToken } = useContext(authContext);

  const schema = z.object({
    email: z.string().email("zod : email is not valid"),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
        "Enter a valid password",
      ),
  });

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function submitData(values) {
    setFormError(null);
    setIsLoading(true);
    setIsSuccess(false);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signin`,
        values,
      );

      setIsSuccess(true);
      setIsLoading(false);

      localStorage.setItem("token", data.data.token);
      setToken(data.data.token);

      setTimeout(() => {
        nav("/home");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setFormError(errorMessage);
    }
  }

  function handlePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="lg:flex ">
      <div className="bg-red-600 w-full lg:w-1/2">
        <Hero />
      </div>

      <div className="bg-[#F3F4F6] w-full lg:w-1/2">
        <div className="h-full flex justify-center items-center">
          <div className="card bg-white w-xl p-8 shadow-xl rounded-xl">
            <h2 className="text-4xl font-bold text-center text-blue-600">
              Welcome Back
            </h2>
            <p className="font-semibold text-center text-blue-400">
              Join the community and start sharing 🚀
            </p>

            {/* رسالة النجاح */}
            {isSuccess && (
              <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center my-4 animate-bounce">
                Success! Redirecting to home... 🚀
              </div>
            )}

            <form
              onSubmit={handleSubmit(submitData)}
              autoComplete="off"
              className="my-4"
            >
              {/* email */}
              <div className="mb-4">
                <label className="text-lg font-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  className="input w-full p-2 border rounded"
                  placeholder="email"
                  id="email"
                />
                {formState.errors.email && (
                  <Error message={formState.errors.email.message} />
                )}
              </div>

              {/* password */}
              <div className="mb-4">
                <label className="text-lg font-semibold" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    className="input w-full p-2 border rounded"
                    placeholder="password"
                    id="password"
                  />
                  <div className="absolute top-[50%] end-3 translate-y-[-50%] cursor-pointer text-gray-500">
                    {showPassword ? (
                      <Eye onClick={handlePassword} />
                    ) : (
                      <EyeOff onClick={handlePassword} />
                    )}
                  </div>
                </div>
                {formState.errors.password && (
                  <Error message={formState.errors.password.message} />
                )}
              </div>

              {/* عرض خطأ الـ API باستخدام المكون الخاص بك */}
              {formError && <Error message={formError} />}

              {/* زر الدخول مع الاسبينر */}
              <button
                type="submit"
                disabled={isLoading}
                className={`btn w-full mt-4 flex justify-center items-center bg-blue-600 text-white py-2 rounded font-bold transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Login"
                )}
              </button>

              <p className="text-center mt-4">
                Don't have an account?
                <Link to={"/register"} className="text-blue-500 font-bold ms-2">
                  Register
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
