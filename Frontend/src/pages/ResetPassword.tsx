import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { resetPassword } from "@/api/Auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { toast } from "sonner";

const ResetPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user]);

  const initialValue = {
    password: "",
    confirmPassword: "",
  };
  const resetPasswordValidation = Yup.object().shape({
    password: Yup.string().min(5).required("Please enter your password"),
    //   .matches(/\d/, "Password must contain at least one digit")
    //   .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    //   .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    //   .matches(
    //     /[@$!%*?&]/,
    //     "Password must contain at least one special character"
    //   ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), undefined], "Password mush match.")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values: {
    password: string;
    confirmPassword: string;
  }) => {
    const token = window.location.pathname.split("/").pop();
    if (!token) {
      toast.error("no token available");
      return;
    }

    try {
      await resetPassword(values, token);
      toast.success("Your password has been reset successfully.");
      window.history.replaceState(null, "", window.location.pathname); //so user cannot navigate back
      navigate("/returnBack");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="container flex justify-center items-center min-h-[60vh]">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle>ResetPassword</CardTitle>
          <CardDescription>Enter your new password.</CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValue}
          validationSchema={resetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-3">
              <CardContent className="flex flex-col gap-3">
                <Field
                  type="password"
                  name="password"
                  placeholder="New password"
                  label="Password"
                  as={Input}
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="password" />
                </div>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  label="Confirm Password"
                  as={Input}
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </CardContent>
              <CardFooter className="flex w-full justify-end">
                <Button
                  type="submit"
                  variant={"orange"}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ResetPassword;
