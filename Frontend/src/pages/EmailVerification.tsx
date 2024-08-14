import { verifyUser } from "@/api/Auth";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EmailVerification = () => {
  const { user,updateUser } = useAuth();
  const maskedEmail = `${user?.email.slice(0, 3)}`;
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState("");

    useEffect(() => {
      if (!location.state || !location.state.fromRedirect) {
        navigate("/");
      }
    }, [location, navigate]);

  const handleSubmit = async () => {
    try {
      if (user) {
        const response = await verifyUser(user._id, value);
        updateUser(response.data.data);
        toast.success("Verification completed");
        navigate("/sellerDashboard");
      }
    } catch (error) {
      setValue("");
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full flex justify-center">
      <Card className="w-[430px] py-5 px-5 dark:!bg-slate-700 dark:!text-white">
        <h3 className="font-semibold text-lg text-center mb-2">
          Seller Account Verification
        </h3>
        <p className="text-2xl font-bold text-center">
          Enter 6 digit PIN sent to you
        </p>
        <div className="flex items-center text-sm justify-center">
          <p className="flex items-center">
            PIN sent to your email {maskedEmail}
          </p>
          <span>********.com</span>
        </div>
        <Formik initialValues={{}} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className="flex justify-center my-16">
                <InputOTP
                  maxLength={6}
                  value={value}
                  onChange={(value) => setValue(value)}
                >
                  <InputOTPGroup className="dark:!text-white">
                    <InputOTPSlot
                      index={0}
                      className="border-[0.1px] h-[45px] w-[45px] border-gray-400 dark:!border-white dark:!text-white"
                    />
                    <InputOTPSlot
                      index={1}
                      className="border-[0.1px]  h-[45px] w-[45px]  border-l-0 border-gray-400 dark:!border-white dark:!text-white"
                    />
                    <InputOTPSlot
                      index={2}
                      className="border-[0.1px] h-[45px] w-[45px] border-l-0 border-gray-400 dark:!border-white dark:!text-white"
                    />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot
                      index={3}
                      className="border-[0.1px] h-[45px] w-[45px] border-gray-400 dark:!border-white dark:!text-white"
                    />
                    <InputOTPSlot
                      index={4}
                      className="border-[0.1px]  h-[45px] w-[45px] border-l-0 border-gray-400 dark:!border-white dark:!text-white"
                    />
                    <InputOTPSlot
                      index={5}
                      className="border-[0.1px] h-[45px] w-[45px] border-l-0 border-gray-400 dark:!border-white dark:!text-white"
                    />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex justify-center mt-5">
                <Button
                  type="submit"
                  disabled={value.length < 6 || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="flex justify-center mt-3">
          <p>Didn't receive pin? Send again</p>
        </div>
      </Card>
    </div>
  );
};

export default EmailVerification;
