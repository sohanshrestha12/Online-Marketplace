import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().trim().required("Product name is required"),
  category: Yup.object().shape({
    value: Yup.string().trim().required("Category is required"),
  }),
  brand: Yup.object().shape({
    value: Yup.string().trim().required("Brand is required"),
  }),
  colorFamily: Yup.array()
    .min(1, "Select at least one color")
    .of(
      Yup.object().shape({
        value: Yup.string(),
      })
    ),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Must be a positive number"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be a positive number"),
  description: Yup.string().trim().required("Description is required").matches(/^(?!\s*$).+/, "Description cannot be just whitespace"),
  video: Yup.string().url("Must be a valid URL"),
});

export default validationSchema;
