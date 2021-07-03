import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import("../../../js/bootstrap");
import { useForm } from "react-hook-form";

type Props = {
    setIs_authenticated: (param: boolean) => void;
    setUserID: (param: string) => void;
    getUser: () => Promise<void>;
};

type LoginData = {
    email: string;
    emailFormat: string;
    password: string;
};

const LoginContent: React.VFC<Props> = ({
    setIs_authenticated,
    setUserID,
    getUser,
}: Props) => {
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [isRevealPassword, setIsRevealPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<LoginData>();

    // console.log(watch());

    const history = useHistory();

    useEffect(() => {
        initCSRF();
    }, []);

    const initCSRF = async (): Promise<void> => {
        console.log("initCSRF");
        await axios
            .get("/sanctum/csrf-cookie")
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const onSubmit = async (loginData): Promise<void> => {
        console.log(loginData);
        await axios
            .post("/login", loginData)
            .then((res) => {
                console.log(res.data.result);
                history.push("/");
                setUserID(res.data.user.id);
                getUser();
                setIs_authenticated(true);
            })
            .catch((err) => {
                console.log("error");
                setErrorMessage("メールアドレスまたはパスワードが異なります");
                console.log(err);
            });
    };

    const togglePassword = (): void => {
        setIsRevealPassword((prevState) => !prevState);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
            <div className="xs:p-0 mx-auto md:w-full md:max-w-md">
                <form
                    action="/login"
                    method="post"
                    onSubmit={handleSubmit(onSubmit)}
                    className="bg-white shadow w-full rounded-xl divide-y divide-gray-200 px-12 py-8"
                >
                    <title className="block font-bold text-center text-2xl pb-5">
                        ログイン
                    </title>
                    <div className="px-5 py-7">
                        <div className="pb-5">
                            <h1 className="font-semibold text-sm text-gray-600 pb-1 block">
                                メールアドレス
                            </h1>
                            <input
                                {...register("email", {
                                    required: true,
                                    min: -2,
                                    pattern: /^\S+@\S+$/i,
                                })}
                                type="text"
                                placeholder="E-mail"
                                className="border rounded-lg px-3 py-2 mt-1 text-sm w-full"
                            />
                            {errors.email &&
                                errors.email.type === "required" && (
                                    <p className="pt-1 text-red-400 text-xs opacity-90">
                                        メールアドレスは必須です
                                    </p>
                                )}
                            {errors.email &&
                                errors.email.type === "pattern" && (
                                    <p className="pt-1 text-red-400 text-xs opacity-90">
                                        メールアドレスの形式が不正です
                                    </p>
                                )}
                        </div>
                        <div className="pb-5">
                            <h1 className="font-semibold text-sm text-gray-600 pb-1 block">
                                パスワード
                            </h1>
                            <div className="w-full">
                                <input
                                    {...register("password", {
                                        required: true,
                                    })}
                                    placeholder="Password"
                                    type={
                                        isRevealPassword ? "text" : "password"
                                    }
                                    className="border rounded-lg px-3 py-2 mt-1 text-sm w-11/12"
                                />
                                <span onClick={togglePassword}>
                                    {isRevealPassword ? (
                                        <i className="far fa-eye pl-2 text-gray-600" />
                                    ) : (
                                        <i className="far fa-eye-slash pl-2 text-gray-600" />
                                    )}
                                </span>
                                {errors.password && (
                                    <p className="pt-1 text-red-400 text-xs opacity-90">
                                        パスワードは必須です
                                    </p>
                                )}
                            </div>
                        </div>
                        <p className="pb-2 text-red-400 text-xs opacity-90">
                            {errorMessage}
                        </p>
                        <input
                            type="submit"
                            value="ログイン"
                            className="transition duration-200 bg-blue-400 hover:bg-blue-300 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                        />
                    </div>
                    <div className="pt-5">
                        <div className="grid grid-cols-2 gap-1">
                            <div className="text-center sm:text-left whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 pt-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block align-text-top"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Forgot Password
                                    </span>
                                </button>
                            </div>
                            <div className="text-center sm:text-right  whitespace-nowrap">
                                <button className="transition duration-200 mx-5 px-5 pt-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        className="w-4 h-4 inline-block align-text-bottom	"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    <span className="inline-block ml-1">
                                        Help
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <aside className="pt-5">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="text-center sm:text-left whitespace-nowrap">
                            <Link
                                to="/"
                                className="w-10 transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4 inline-block align-text-top"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                戻る
                            </Link>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default LoginContent;
