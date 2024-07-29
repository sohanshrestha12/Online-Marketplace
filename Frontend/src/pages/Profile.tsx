import { profileUpdate, updateImage } from "@/api/User";
import { useAuth } from "@/components/Auth/ProtectedRoutes";
import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProfileTypes } from "@/Types/User";
import axios from "axios";
import { Field, FieldProps, Form, Formik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Select from "react-select";
import { toast } from "sonner";

const Profile = () => {
  const auth = useAuth();
  const [initialValues, setInitialValues] = useState<ProfileTypes>({
    email: "",
    username: "",
    birthday: "",
    gender: "",
    businessName: "",
    address: "",
    phNumber: "",
  });
  const [imagePreview, setImagePreview] = useState<string>(
    auth.user?.profileImage
      ? `http://localhost:5100/${auth.user.profileImage}`
      : ""
  );
  interface Option {
    value: string;
    label: string;
  }

  const genderOptions: Option[] = [
    {
      value: "male",
      label: "Male",
    },
    { value: "female", label: "Female" },
    { value: "others", label: "Others" },
  ];
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const toggleEditMode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditing((prev) => !prev);
  };
  useEffect(() => {
    setImagePreview(
      auth.user?.profileImage
        ? `http://localhost:5100/${auth.user.profileImage}`
        : ""
    );
  }, [auth.user]);
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profileImage", file);
    const response = await updateImage(formData);
    auth.updateUser(response.data.data);
  };

  useEffect(() => {
    if (auth.user) {
      setInitialValues({
        email: auth.user.email,
        username: auth.user.username,
        birthday: auth.user.birthday ?? "",
        gender: auth.user.gender || "",
        businessName: auth.user.businessName,
        address: auth.user.address,
        phNumber: auth.user.phNumber,
      });
    }
  }, [auth.user]);

  const handleProfileSubmit = async (values: ProfileTypes) => {
    console.log(values);
    try {
      const response = await profileUpdate(values);
      auth.updateUser(response.data.data);
      setIsEditing(false);
      toast.success("Profile Updated successfully");
      console.log(response);
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Card className="px-3 py-3">
      <div className="flex justify-between">
        <div>
          <h3 className="text-2xl font-semibold">My Profile</h3>
          <h4 className="text-md mt-2 font-semibold">Account Information</h4>
        </div>
        <div className="flex gap-2">
          <p className="capitalize">
            {auth.user?.role === "USER" ? "Buyer Account" : "Seller Account"}
          </p>
        </div>
      </div>
      <hr className="my-2" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleProfileSubmit}
        enableReinitialize
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form>
            <div className="mt-3 flex gap-5">
              <div className="relative w-fit group">
                <img
                  src={imagePreview}
                  alt="404 Profile"
                  className="rounded-sm object-cover"
                  width="200"
                />
                <label htmlFor="profileImage">
                  <FiEdit className="text-3xl py-1 hover:bg-indigo-400 px-2 text-white bg-indigo-300 rounded-full invisible group-hover:!visible absolute hover:cursor-pointer -top-2 -right-2" />
                </label>
              </div>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                className="hidden"
                onChange={handleImageChange}
              />

              <div className="mt-4 flex-1">
                <div className="col-span-4 mb-3">
                  <p className="text-xs">Full Name</p>
                  {isEditing ? (
                    <Field name="username" type="text" as={Input} />
                  ) : (
                    <p className="capitalize">{auth.user?.username}</p>
                  )}
                </div>
                <div className="col-span-4 mb-3">
                  <p className="text-xs">Email Address</p>
                  {isEditing ? (
                    <Field name="email" type="email" as={Input} />
                  ) : (
                    <p>{auth.user?.email}</p>
                  )}
                </div>
                {auth.user?.role === "SELLER" && (
                  <>
                    <div className="col-span-4 mb-3">
                      <p className="text-xs">Business Name</p>
                      {isEditing ? (
                        <Field name="businessName" type="text" as={Input} />
                      ) : (
                        <p>
                          {auth.user?.businessName
                            ? auth.user.businessName
                            : "Please enter your business name"}
                        </p>
                      )}
                    </div>
                    <div className="col-span-4 mb-3">
                      <p className="text-xs">Phone number</p>
                      {isEditing ? (
                        <Field name="phNumber" type="number" as={Input} />
                      ) : (
                        <p>
                          {auth.user?.phNumber
                            ? auth.user.phNumber
                            : "Please enter your phone number"}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
              <div className="mt-4 flex-1">
                <div className="col-span-4 mb-3">
                  <p className="text-xs">Birthday</p>
                  {isEditing ? (
                    <Field name="birthday">
                      {({ field }: FieldProps) => (
                        <DatePicker
                          selectedDate={field.value}
                          onChange={(date) =>
                            setFieldValue(
                              field.name,
                              date ? formatDate(date.toISOString()) : ""
                            )
                          }
                        />
                      )}
                    </Field>
                  ) : (
                    <p className="capitalize">
                      {auth.user?.birthday
                        ? auth.user.birthday
                        : "Please add your birthday"}
                    </p>
                  )}
                </div>
                <div className="col-span-4 mb-3">
                  <p className="text-xs">Gender</p>
                  {isEditing ? (
                    <Field name="gender">
                      {({ field }: FieldProps) => (
                        <Select
                          options={genderOptions}
                          name={field.name}
                          value={genderOptions.find(
                            (option) => option.value === field.value
                          )}
                          onChange={(option) =>
                            setFieldValue("gender", option ? option.value : "")
                          }
                        />
                      )}
                    </Field>
                  ) : (
                    <p className="capitalize">
                      {auth.user?.gender
                        ? auth.user.gender
                        : "Please Enter your gender"}
                    </p>
                  )}
                </div>
                {auth.user?.role === "SELLER" && (
                  <div className="col-span-4 mb-3">
                    <p className="text-xs">Address</p>
                    {isEditing ? (
                      <Field name="address" type="text" as={Input} />
                    ) : (
                      <p>
                        {auth.user?.address
                          ? auth.user.address
                          : "Please enter your address"}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-[60px] grid gap-2 grid-cols-12 mb-3">
              {isEditing ? (
                <>
                  <Button
                    type="submit"
                    className="col-span-4"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving Changes..." : "Save Changes"}
                  </Button>
                  <Button
                    type="button"
                    onClick={toggleEditMode}
                    className="col-span-4"
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    onClick={toggleEditMode}
                    className="col-span-4"
                  >
                    Edit Profile
                  </Button>
                  <Link className="col-span-4 w-full" to={"/profile/changePassword"}>
                    <Button className="w-full" type="button">Change Password</Button>
                  </Link>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Profile;
