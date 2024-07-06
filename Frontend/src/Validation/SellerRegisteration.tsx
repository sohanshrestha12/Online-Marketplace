import * as Yup from "yup";
export const SellerRegistrationValidationSchema = Yup.object().shape({
  businessName: Yup.string()
    .min(3, "Business Name should be at least 3 characters long")
    .required("Business Name is required")
    .trim(),
  address: Yup.string().required("Address is required").trim(),
  phNumber: Yup.string()
    .matches(
      /^98\d{8}$/,
      "Phone number must start with 98 and be exactly 10 digits"
    )
    .required("Phone number is required"),
});
