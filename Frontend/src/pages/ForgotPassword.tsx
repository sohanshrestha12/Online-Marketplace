import { forgetPassword } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
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
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as Yup from "yup";

const ForgotPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      navigate("/");
    }
  }, [auth.user]);

  const initialValue = {
    email: "",
  };
  const forgetPasswordValidation = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = async (
    values: { email: string },
    { resetForm }: FormikHelpers<{ email: string }>
  ) => {
    try {
      await forgetPassword(values);
      resetForm();
      toast.success(
        "We have sent u verification mail. Please check your inbox."
      );
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      }
      console.log(error);
    }
  };

  return (
    <div className="container h-[60vh] flex justify-center items-center flex-col">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="capitalize text-3xl font-bold">
            forgot password
          </CardTitle>
          <CardDescription>
            Enter your email so we can validate and send your the reset link.
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={initialValue}
          validationSchema={forgetPasswordValidation}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <CardContent>
                <div>
                  <Field
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    type="text"
                    as={Input}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex w-full justify-end">
                <Button
                  type="submit"
                  variant={"orange"}
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </CardFooter>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default ForgotPassword;
