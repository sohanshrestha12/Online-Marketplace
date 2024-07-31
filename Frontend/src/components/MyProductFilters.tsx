/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, Form, Formik, FormikValues } from "formik";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Select from "react-select";

interface MyProductFiltersProps {
  handleSearch: (values: FormikValues) => void;
}

const MyProductFilters = ({ handleSearch }: MyProductFiltersProps) => {
  const initialValues: FormikValues = {
    search: "",
    filterType: { value: "title", label: "Title" },
  };
  const searchOptions = [
    { value: "title", label: "Title" },
    { value: "category", label: "Category" },
  ];
  return (
    <div className="pt-3 pb-1 px-3 w-[60vw]">
      <Formik initialValues={initialValues} onSubmit={handleSearch}>
        {({ setFieldValue }) => (
          <Form className="flex gap-2">
            <Field name="search">
              {({ field }: { field: any }) => (
                <Input {...field} placeholder="Search" />
              )}
            </Field>
            <Field name="filterType">
              {({ field }: { field: any }) => (
                <Select
                  {...field}
                  value={field.value}
                  onChange={(option: any) =>
                    setFieldValue("filterType", option)
                  }
                  options={searchOptions}
                  className="w-fit min-w-[200px]"
                />
              )}
            </Field>
            <Button type="submit">Search</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MyProductFilters;
