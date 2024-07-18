/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik, FormikValues } from "formik"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

interface MyProductFiltersProps {
  handleSearch:(values:FormikValues)=>void
}

const MyProductFilters = ({handleSearch}:MyProductFiltersProps) => {
  const initialValues: FormikValues = {
    search: "",
  };
  return (
    <div className="pt-3 pb-1 px-3 w-[40vw]">
      <Formik initialValues={initialValues} onSubmit={handleSearch}>
        <Form className="flex gap-2">
          <Field name="search">
            {({ field }: { field: any }) => (
              <Input {...field} placeholder="Search" />
            )}
          </Field>
          <Button type="submit">Search</Button>
        </Form>
      </Formik>
    </div>
  );
};

export default MyProductFilters
