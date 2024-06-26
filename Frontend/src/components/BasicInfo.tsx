import AddImages from "@/components/AddImages";
import { Card, CardTitle } from "@/components/ui/card";
import Select from "react-select";
import { Input } from "./ui/input";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "./ui/button";

import { createProduct } from "@/api/Product";
import { Field, Form, Formik, FormikHelpers } from "formik";

const BasicInfo = () => {
  const [value, setValue] = useState("");

  const [images, setImages] = useState<File[]>([]);
  const [imageShow, setImageShow] = useState<{ url: string }[]>([]);

  const insertImage = (files:File[])=>{
      setImages([...images, ...files]);
  }
  const changeImage = (tempImages: File[]) => {
    setImages([...tempImages]);
  };
  const insertImageUrl = (imgUrl:{url:string}[])=>{
    setImageShow([...imageShow, ...imgUrl]);
  }
  const changeImageUrl = (imgUrl:{url:string}[])=>{
    setImageShow([ ...imgUrl]);
  }

  interface Option {
    value: string;
    label: string;
  }

  const categoryOptions: Option[] = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  interface FormValues {
    name: string;
    category: Option | null;
    brand: Option | null;
    colorFamily: Option | null;
    price: number;
    quantity: number;
    size: number;
    description: string;
    video: string;
  }
  const initialValues: FormValues = {
    name: "",
    category: null,
    brand: null,
    colorFamily: null,
    price: 0,
    quantity: 0,
    size: 0,
    description: "",
    video: "",
  };
  // const formDataToProduct = (formData: FormData): Product => {
  //   const product: Product = {
  //     name: formData.get("name") as string,
  //     category: formData.get("category") as string,
  //     brand: formData.get("brand") as string,
  //     colorFamily: formData.get("colorFamily") as string,
  //     price: Number(formData.get("price")),
  //     quantity: Number(formData.get("quantity")),
  //     size: Number(formData.get("size")),
  //     description: formData.get("description") as string,
  //     videoUrl: formData.get("video") as string,
  //     images: [], 
  //   };

  //   const imageFiles = formData.getAll("images");
  //   for (let i = 0; i < imageFiles.length; i++) {
  //     const file = imageFiles[i] as File;
  //     product.images.push(file);
  //   }

  //   return product;
  // };

  const handleSubmit = async(
    values: FormValues,
    { resetForm }: FormikHelpers<FormValues>
  ) => {
    // console.log(images);
    // console.log(values);
    const formData = new FormData();
    Object.keys(values).forEach((key)=>{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (values as any)[key];

      if (value !== null && value !== undefined) {
        if (typeof value === "object") {
          formData.append(key, JSON.stringify(value.value));
        } else {
          formData.append(key, value.toString());
        }
      }
    })
    images.forEach((image)=>{
      console.log('this is console img',image);
      formData.append('images',image)
    })
    
    const response = await createProduct(formData);
    console.log(response);
    for (const pair of formData.entries()) {
      // console.log(`${pair[0]}: ${pair[1]}`);
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}:`);
        console.log(`  Name: ${pair[1].name}`);
        console.log(`  Type: ${pair[1].type}`);
        console.log(`  Size: ${pair[1].size} bytes`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
    resetForm();
    setImages([]);
    setImageShow([]);
    setValue("");
  };
  
  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ setFieldValue, values }) => (
          <Form>
            <Card>
              <CardTitle className="bg-gray-50 px-2 py-3 border-b text-md font-semibold">
                Basic Information
              </CardTitle>
              <div className="p-3">
                <Card className="text-sm px-3 py-4 mb-4">
                  <div className="mb-2">
                    <p className="font-semibold">Product Images & Video</p>
                    <p className="text-xs">
                      Your product images is the first thing your customer sees
                      on the product page.
                    </p>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-semibold">
                      Product images{" "}
                      <span className="text-rose-500 text-lg">*</span>
                    </p>
                    <p className="text-xs mb-2">Upload between 3 to 8 images</p>
                    <AddImages
                      insertImage={insertImage}
                      insertImageUrl={insertImageUrl}
                      changeImage={changeImage}
                      images={images}
                      imageShow={imageShow}
                      changeImageUrl={changeImageUrl}
                    />
                  </div>
                  <div className="flex space-x-2 items-center">
                    <label
                      htmlFor="video"
                      className="font-semibold whitespace-no-wrap !w-[100px]"
                    >
                      Video Url
                    </label>
                    <Field name="video" type="text" id="video" as={Input} />
                  </div>
                </Card>
                <Card className="text-sm px-3 mb-4 py-4">
                  <div className="mb-4">
                    <p className="font-semibold">Product Information</p>
                    <p className="text-xs">
                      Having accurate product information raises
                      discoverability.
                    </p>
                  </div>
                  <div className="flex mb-3">
                    <div>
                      <label
                        htmlFor="name"
                        className="font-semibold whitespace-no-wrap !w-[120px]"
                      >
                        Product Name{" "}
                        <span className="text-rose-500 text-lg font-bold ">
                          *
                        </span>
                      </label>
                    </div>
                    <Field
                      name="name"
                      type="text"
                      id="name"
                      as={Input}
                    />
                  </div>
                  <div className="flex mb-5">
                    <div>
                      <label
                        htmlFor="category"
                        className="font-semibold whitespace-no-wrap !w-[120px]"
                      >
                        Category{" "}
                        <span className="text-rose-500 text-lg font-bold ">
                          *
                        </span>
                      </label>
                    </div>
                    <Select
                      className="w-full"
                      name="category"
                      value={values.category}
                      options={categoryOptions}
                      onChange={(option) => setFieldValue("category", option)}
                    />
                  </div>
                  <div>
                    <div className="mb-3">
                      <p className="font-semibold">
                        Product Attributes{" "}
                        <span className="text-rose-500 text-lg font-bold">
                          *
                        </span>
                      </p>
                      <p className="text-xs">
                        Boost your item's searchability by filling-up the key
                        Products Information marked with KEY. The more you fill
                        up, the easier for buyers to find your products.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex gap-4 flex-wrap">
                        <div className="flex-1">
                          <label htmlFor="brand">
                            Brand{" "}
                            <span className="text-lg text-rose-500 font-bold">
                              *
                            </span>
                          </label>
                          <Select
                            options={categoryOptions}
                            name="brand"
                            value={values.brand}
                            onChange={(option) =>
                              setFieldValue("brand", option)
                            }
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="colorFamily">
                            Color Family{" "}
                            <span className="text-lg text-rose-500 font-bold">
                              *
                            </span>
                          </label>
                          <Select
                            options={categoryOptions}
                            name="colorFamily"
                            value={values.colorFamily}
                            onChange={(option) =>
                              setFieldValue("colorFamily", option)
                            }
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        <div className="flex-1">
                          <label htmlFor="price">
                            Price{" "}
                            <span className="text-lg text-rose-500 font-bold">
                              *
                            </span>
                          </label>
                          <Field
                            type="number"
                            name="price"
                            placeholder="In Nepali Rs."
                            as={Input}
                          />
                        </div>
                        <div className="flex-1">
                          <label htmlFor="quantity">
                            Quantity{" "}
                            <span className="text-lg text-rose-500 font-bold">
                              *
                            </span>
                          </label>
                          <Field type="number" name="quantity" as={Input} />
                        </div>
                      </div>
                      <div className="flex gap-4 flex-wrap">
                        <div className="flex-1">
                          <label htmlFor="size">
                            Size{" "}
                            <span className="text-lg text-rose-500 font-bold">
                              *
                            </span>
                          </label>
                          <Field
                            type="number"
                            name="size"
                            placeholder="In cm"
                            as={Input}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                <Card className="text-sm px-3 py-3 mb-4">
                  <p className=" font-semibold">
                    Detailed Description{" "}
                    <span className="text-lg font-bold text-rose-500">*</span>{" "}
                  </p>
                  <p className="text-xs mb-4">
                    Having long description helps to build trust by providing
                    more key information in text form.
                  </p>
                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(content) => {
                      setValue(content);
                      setFieldValue("description", content);
                    }}
                    className="h-[70px] mb-[25px]"
                  />
                  ;
                </Card>
              </div>
              <div className="flex justify-end mb-3 mr-3">
                <Button
                  type="submit"
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  Add Product
                </Button>
              </div>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BasicInfo;
