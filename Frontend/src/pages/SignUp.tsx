import { RegisterUser } from "@/Types/Auth";
import { registerValidation } from "@/Validation/RegisterValidation";
import { registerUser } from "@/api/Auth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignUp = () => {
  const navigate = useNavigate();
  const initialValues: RegisterUser = {
    username: "",
    password: "",
    email: "",
  };
  const handleRegister = async (values: RegisterUser) => {
    try {
      const trimedUsername = values.username.trim();
      const updatedValues: RegisterUser = {
        ...values,
        username: trimedUsername,
      };
      const response = await registerUser(updatedValues);

      toast.success(response.data.message, {
        action: { label: "Close", onClick: () => console.log("close") },
      });
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message, {
          action: { label: "Close", onClick: () => console.log("close") },
        });
      } else {
        toast.error("Something went wrong please try again later.", {
          action: { label: "Close", onClick: () => console.log("close") },
        });
      }
      console.log(error);
    }
  };
  return (
    <div className=" flex justify-center items-center">
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={registerValidation}
      >
        {({ isSubmitting }) => (
          <Form>
            <Card className="w-[450px] px-5 py-3">
              <div className="flex flex-col h-full">
                <div className="flex flex-col items-center">
                  <h2 className="text-lg font-semibold">GrandBazaar</h2>
                  <h3 className="text-sm">
                    Welcome to GrandBazaar! Please SignUp.
                  </h3>
                </div>
                <div>
                  <Label className="text-sm mt-4">Username</Label>
                  <Field name="username" type="text" as={Input} />
                </div>
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="username" />
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
                <div className="mt-4">
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting?"Signing Up..." : "Sign Up"}
                  </Button>
                </div>

                <div className="flex flex-col gap-2 mt-5 items-center text-sm">
                  <p>
                    Already have an account?
                    <Link to={"/login"} className="text-blue-500">
                      {" "}
                      Log in
                    </Link>
                  </p>
                </div>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;
