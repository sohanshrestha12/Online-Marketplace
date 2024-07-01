import { LoginUser } from "@/Types/Auth";
import { loginValidation } from "@/Validation/LoginValidation";
import { login } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[user]);
  if(user){
    return null;
  }
  const initialValues: LoginUser = {
    email: "",
    password: "",
  };
  const handleLogin = async (values: LoginUser) => {
    try {
      console.log("Form values: ", values);
      const response = await login(values);
      console.log(response);
      toast.success(response.data.message, {
        action: { label: "Close", onClick: () => console.log("close") },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message, {
          action: { label: "Close", onClick: () => console.log("close") },
        });
      } else {
        toast.error("Something went wrong please try again later.", {
          action: { label: "Close", onClick: () => console.log("close") },
        });
        console.log(error);
      }
    }
  };
  return (
    <div className="flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <Card className="w-[450px] px-5 py-3">
              <div className="flex flex-col h-full">
                <div className="flex flex-col items-center">
                  <h2 className="text-lg font-semibold">GrandBazaar</h2>
                  <h3 className="text-sm">
                    Welcome to GrandBazaar! Please login.
                  </h3>
                </div>
                <div>
                  <Label className="text-sm mt-4">Email</Label>
                  <Field name="email" type="email" as={Input} />
                </div>
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="email" />
                </div>
                <div>
                  <Label className="text-sm mt-4">Password</Label>
                  <Field name="password" type="password" as={Input} />
                </div>
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="password" />
                </div>
                <div className="mt-5">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </Button>
                </div>
                <div className="h-[1px] bg-black opacity-25 my-3"></div>
                <Button variant={"secondary"} className="w-full flex gap-3">
                  <FcGoogle className="text-lg" />
                  Log in with Google
                </Button>

                <div className="flex flex-col gap-2 mt-5 items-center text-sm">
                  <p>
                    Don't have an account?
                    <Link to={"/signUp"} className="text-blue-500">
                      {" "}
                      Sign Up
                    </Link>
                  </p>
                  <p className="text-blue-500">Forgot your password?</p>
                </div>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
