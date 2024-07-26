import { changeUserPassword } from "@/api/User"
import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChangeUserPassword } from "@/Types/User"
import { PasswordChangeValidationSchema } from "@/Validation/PasswordChange"
import axios from "axios"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"
import { toast } from "sonner"

const ChangePassword = () => {
    const initialValues:ChangeUserPassword = {
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
    }
    const handleSubmit = async(values:ChangeUserPassword,{resetForm}:FormikHelpers<ChangeUserPassword>)=>{
        console.log(values);
        try {
            const response = await changeUserPassword(values);
            console.log(response);
            toast.success("Password Changed Successfully");
            resetForm();
        } catch (error) {
            if(axios.isAxiosError(error)){
                toast.error(error.response?.data.message);
            }
            console.log(error);
        }
    }
   
  return (
    <div>
      <Card>
        <CardTitle className="bg-gray-100 border-b-[1px] px-2 py-3">
          Change Password
        </CardTitle>
        <div className="mt-3 px-2">
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={PasswordChangeValidationSchema}
          >
            <Form className="flex flex-col p-2 gap-3">
              <div>
                <label>Current Password</label>
                <Field
                  name="currentPassword"
                  placeholder="Enter your current password"
                  type="password"
                  as={Input}
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="currentPassword" />
                </div>
              </div>
              <div>
                <label>New Password</label>
                <Field
                  name="newPassword"
                  placeholder="Enter your new password"
                  type="password"
                  as={Input}
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="newPassword" />
                </div>
              </div>
              <div>
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  placeholder="Re-enter your new password"
                  type="password"
                  as={Input}
                />
                <div className="text-red-500 text-sm">
                  <ErrorMessage name="confirmPassword" />
                </div>
              </div>
              <div className="mb-3 self-end">
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          </Formik>
        </div>
      </Card>
    </div>
  );
}

export default ChangePassword
