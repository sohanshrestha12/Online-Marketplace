import { Button } from "@/components/ui/button"
import { Card, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ChangeUserPassword } from "@/Types/User"
import { PasswordChangeValidationSchema } from "@/Validation/PasswordChange"
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik"

const ChangePassword = () => {
    const initialValues:ChangeUserPassword = {
        currentPassword:"",
        newPassword:"",
        confirmPassword:"",
    }
    const handleSubmit = (values:ChangeUserPassword,{resetForm}:FormikHelpers<ChangeUserPassword>)=>{
        console.log(values);
        resetForm();
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
