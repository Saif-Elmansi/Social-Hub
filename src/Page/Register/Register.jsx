import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Import } from "iconsax-react";
import { EyeOff } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import Error from "../../Componants/Error/Error";
import Hero from "./../../Componants/hero/Hero";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Register() {
  const [formError, setFormError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // 1. حالة التحميل
  const [isSuccess, setIsSuccess] = useState(false); // 2. حالة النجاح
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  const schema = z
    .object({
      name: z
        .string()
        .regex(/^[^0-9]*$/, "zod : name cannot contain numbers!")
        .min(3, "zod : name must be at least 3 characters")
        .max(10),
      email: z.string().email("zod : email is not valid"),
      password: z
        .string()
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/,
          "zod : password must be 8-10 characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        ),
      rePassword: z.string(),
      dateOfBirth: z.string(),
      gender: z.enum(["male", "female", "other"]),
    })
    .refine((values) => values.password === values.rePassword, {
      message: "zod : the confirm not correct",
      path: ["rePassword"],
    });

  const { handleSubmit, register, formState } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "male",
    },
    mode: "all",
  });

  async function sendDataToRegister(values) {
    setIsLoading(true);
    setFormError(null);
    setIsSuccess(false);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/signup`,
        values,
      );

      setIsSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        nav("/login");
      }, 1500);
    } catch (error) {
      setIsLoading(false); // إيقاف الاسبينر
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      setFormError(errorMessage);
    }
  }

  function handlePassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      <Helmet>
        <title>Social Hup | Register </title>
      </Helmet>
      <div className="lg:flex ">
        <div className="h-full w-full lg:w-1/2">
          <Hero />
        </div>

        <div className="bg-[#F3F4F6] w-full lg:w-1/2">
          <div className="min-h-screen flex justify-center items-center p-4">
            <div className="card bg-white w-full max-w-xl p-8 shadow-xl rounded-xl">
              <h2 className="text-4xl font-bold text-center text-blue-600">
                Create Account
              </h2>

              {/* رسالة النجاح */}
              {isSuccess && (
                <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center my-4 animate-pulse font-bold">
                  Account created successfully! Redirecting to login... 🚀
                </div>
              )}

              <form
                onSubmit={handleSubmit(sendDataToRegister)}
                autoComplete="off"
                className="my-4"
              >
                {/* Username */}
                <div className="mb-3">
                  <label className="text-lg font-semibold" htmlFor="name">
                    Username
                  </label>
                  <input
                    {...register("name")}
                    type="text"
                    className="input w-full p-2 border rounded"
                    placeholder="username"
                    id="name"
                  />
                  {formState?.errors?.name && (
                    <Error message={formState.errors.name.message} />
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
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
                  {formState?.errors?.email && (
                    <Error message={formState.errors.email.message} />
                  )}
                </div>

                {/* Password */}
                <div className="mb-3">
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
                        <Eye onClick={handlePassword} size={20} />
                      ) : (
                        <EyeOff onClick={handlePassword} size={20} />
                      )}
                    </div>
                  </div>
                  {formState?.errors?.password && (
                    <Error message={formState.errors.password.message} />
                  )}
                </div>

                {/* rePassword */}
                <div className="mb-3">
                  <label className="text-lg font-semibold" htmlFor="rePassword">
                    Re-enter Password
                  </label>
                  <input
                    {...register("rePassword")}
                    type="password"
                    className="input w-full p-2 border rounded"
                    placeholder="re-enter password"
                    id="rePassword"
                  />
                  {formState?.errors?.rePassword && (
                    <Error message={formState.errors.rePassword.message} />
                  )}
                </div>

                {/* dateOfBirth */}
                <div className="mb-3">
                  <label
                    className="text-lg font-semibold"
                    htmlFor="dateOfBirth"
                  >
                    Date of Birth
                  </label>
                  <input
                    {...register("dateOfBirth")}
                    type="date"
                    className="input w-full p-2 border rounded"
                    id="dateOfBirth"
                  />
                  {formState?.errors?.dateOfBirth && (
                    <Error message={formState.errors.dateOfBirth.message} />
                  )}
                </div>

                {/* Gender */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Gender</h3>
                  <div className="flex gap-4 items-center">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        {...register("gender")}
                        type="radio"
                        value="male"
                      />{" "}
                      Male
                    </label>
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        {...register("gender")}
                        type="radio"
                        value="female"
                      />{" "}
                      Female
                    </label>
                  </div>
                </div>

                {formError && <Error message={formError} />}

                {/* الزر مع الاسبينر */}
                <button
                  disabled={isLoading}
                  className={`btn w-full flex justify-center items-center py-3 rounded-lg text-white font-bold bg-blue-600 transition-all ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 shadow-lg"}`}
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
                      Creating account...
                    </span>
                  ) : (
                    "Create an account"
                  )}
                </button>

                <p className="text-center mt-4">
                  Already have an account?
                  <Link to={"/login"} className="text-blue-500 font-bold ms-2">
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
