import { SellerUser } from "@/Types/Auth";
import { SellerRegistrationValidationSchema } from "@/Validation/SellerRegisteration";
import { sellerRegistration } from "@/api/User";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import { AiOutlineMessage } from "react-icons/ai";
import { BsCloudUploadFill } from "react-icons/bs";
import { FaStore, FaTools } from "react-icons/fa";
import { MdInventory, MdOutlineContactSupport } from "react-icons/md";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { useAuth } from "../components/Auth/ProtectedRoutes";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Seller = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const initialValue: SellerUser = {
    id: user?._id,
    businessName: "",
    address: "",
    phNumber: "",
  };
  useEffect(() => {
    if(!user){
      navigate('/login');
    }
    if (user && user.role === "SELLER") {
      navigate("/");
    } else {
      setLoading(false); // Update loading state
    }
  }, [user, navigate]);
  if (loading) {
    return null;
  }

  const handleSubmit = async (
    values: SellerUser,
    { resetForm }: FormikHelpers<SellerUser>
  ) => {
    console.log(values);
    try {
      await sellerRegistration(values);
      navigate("/EmailVerification", { state: { fromRedirect: true } });
      toast.success("Verification Otp code has been sent to your email.");
      resetForm();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="grid gap-5 grid-cols-12">
      <Card className="col-span-7 py-5 px-5 flex items-center flex-col">
        <h3 className="text-4xl font-bold mb-4 text-[#f85606]">
          Welcome to SELLER CENTER
        </h3>
        <p className="text-xl font-semibold mb-2">
          3 simple Steps to sell on GrandBazzar
        </p>
        <div className="grid gap-5 py-3 items-center mb-4 justify-items-center grid-cols-12">
          <div className="flex flex-col gap-2 items-center col-span-4">
            <AiOutlineMessage className="text-2xl text-[#f85606]" />
            <div className="flex gap-2">
              <p className="text-5xl">1</p>
              <p>Sign Up and store profile</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center col-span-4">
            <BsCloudUploadFill className="text-2xl text-[#f85606]" />
            <div className="flex gap-2">
              <p className="text-5xl">2</p>
              <p>Upload product to start selling</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 items-center col-span-4">
            <FaTools className="text-2xl text-[#f85606]" />
            <div className="flex gap-2">
              <p className="text-5xl">3</p>
              <p>Adopt tools to maximize sales</p>
            </div>
          </div>
        </div>
        <div className="mt-2 w-full">
          <p className="text-xl text-center font-semibold mb-2">
            Seller Center Features
          </p>
          <div className="mt-4 flex gap-2 items-center justify-between">
            <div className="flex gap-2 items-center">
              <FaStore className="text-[#f85606]" />
              <p> Easy Store Setup</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdInventory className="text-[#f85606]" />
              <p> Inventory Management</p>
            </div>
            <div className="flex gap-2 items-center">
              <MdOutlineContactSupport className="text-[#f85606] text-lg" />
              <p> Dedicated Support</p>
            </div>
          </div>
        </div>
      </Card>
      <Card className="col-span-5 py-4 px-3">
        <h3 className="text-center font-semibold text-sm mb-4">
          Welcome to Seller Center! Please fill out the form below to create
          your Seller account.
        </h3>
        <Formik
          initialValues={initialValue}
          onSubmit={handleSubmit}
          validationSchema={SellerRegistrationValidationSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-3">
                <Field
                  name="id"
                  value={user?._id}
                  disabled
                  hidden
                  type="text"
                  as={Input}
                />
              </div>
              <div className="mb-3">
                <label>Business Name</label>
                <Field name="businessName" type="text" as={Input} />
                <ErrorMessage
                  name="businessName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-3">
                <label>Address</label>
                <Field name="address" type="text" as={Input} />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="mb-3">
                <label>Phone Number</label>
                <Field name="phNumber" type="number" as={Input} />
                <ErrorMessage
                  name="phNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div className="flex justify-center mt-5">
                <Button disabled={isSubmitting} type="submit">
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Card>
    </div>
  );
};

export default Seller;
