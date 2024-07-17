import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Card, CardTitle } from "./ui/card";
import { FetchProduct } from "@/pages/ProductDetails";
import { DialogTitle } from "@radix-ui/react-dialog";
import AddImages from "./AddImages";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { Input } from "./ui/input";
import Select from "react-select";
import { Category } from "@/Types/Category";
import { getAllBrands, getAllCategories } from "@/api/Product";
import { colorOptions } from "@/utils/Colors";

import { getFirstWord, getLastWord, getMiddleWords } from "@/utils/Category";
import { Brand } from "@/Types/Brand";

interface UpdateProps {
  isOpen: boolean;
  onClose: () => void;
  product: FetchProduct;
}

const Update = ({ isOpen, onClose, product }: UpdateProps) => {
  const [images, setImages] = useState<File[]>([]);
  const [imageShow, setImageShow] = useState<{ url: string }[]>([]);
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [level1Category, setLevel1Category] = useState<Option | null>(null);
  const [level2Category, setLevel2Category] = useState<Option | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);

  interface Option {
    value: string;
    label: string;
    category?: string;
    color?: string;
  }

  const initialValues: FormikValues = {
    name: product.name,
    category: {
      value: getLastWord(product.category),
      label: getLastWord(product.category),
    },
    brand: {
      value: product.brand,
      label: product.brand,
      category: getFirstWord(product.category),
    },
    colorFamily: product.colorFamily.map((color:string)=> {
      const colorOption = colorOptions.find(
        (option) => option.value === color
      );

      if (colorOption) {
        return {
          value: colorOption.value,
          label: colorOption.label,
        };
      }

      return null;
    }),
    price: "",
    quantity: "",
    description: "",
    video: "",
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await getAllCategories();
        setAllCategory(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllCategory();
  }, []);

  useEffect(() => {
    const fetchAllBrands = async () => {
      try {
        const response = await getAllBrands();
        setBrands(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBrands();
  }, []);

  const handleSubmit = async (values: FormikValues) => {
    console.log(values);
  };

  useEffect(() => {
    if (product && product.images) {
      const initialImage = product.images.map((img: string | { url: string }) =>
        typeof img === "string" ? { url: `http://localhost:5100/${img}` } : img
      );
      setImageShow(initialImage);
    }
    const l1Selected = getFirstWord(product.category);
    const l2Selected = getMiddleWords(product.category);
    setLevel1Category({ value: l1Selected, label: l1Selected });
    setLevel2Category({ value: l2Selected, label: l2Selected });
  }, [product]);

  const insertImage = (files: File[]) => {
    setImages([...images, ...files]);
  };
  const changeImage = (tempImages: File[]) => {
    setImages([...tempImages]);
  };
  const insertImageUrl = (imgUrl: { url: string }[]) => {
    setImageShow([...imageShow, ...imgUrl]);
  };
  const changeImageUrl = (imgUrl: { url: string }[]) => {
    setImageShow([...imgUrl]);
  };

  const level1CategoryOptions: Option[] = allCategory
    .filter((cat) => cat.level === 1)
    .map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const level2CategoryOptions: Option[] = allCategory
    .filter((cat) => cat.level === 2 && cat.parent === level1Category?.value)
    .map((item) => ({
      value: item.name,
      label: item.name,
    }));
  const level3CategoryOptions: Option[] = allCategory
    .filter((cat) => cat.level === 3 && cat.parent === level2Category?.value)
    .map((item) => ({
      value: item.name,
      label: item.name,
}));

  const brandOptions: Option[] = brands.map((item) => ({
    value: item.name,
    label: item.name,
    category: item.category,
  }));
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-80 max:w-full sm:w-full h-[100vh] overflow-y-scroll sm:max-w-[70rem]">
        <DialogTitle>Update</DialogTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form>
              <Card className="mb-4">
                <CardTitle className="bg-gray-50 px-2 py-3 border-b text-md font-semibold">
                  Basic Information
                </CardTitle>
                <div className="p-3">
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
                    <p className="text-xs mb-2">
                      (Note: The first picture is used as cover picture of the
                      Product.)
                    </p>
                    <AddImages
                      insertImage={insertImage}
                      insertImageUrl={insertImageUrl}
                      changeImage={changeImage}
                      images={images}
                      imageShow={imageShow}
                      changeImageUrl={changeImageUrl}
                    />
                  </div>
                </div>
                <div className="flex px-3 flex-col mb-3 justify-center">
                  <p className="py-1 ml-[90px] text-xs text-gray-500">
                    Leave empty if no video url.
                  </p>
                  <div className="flex">
                    <label
                      htmlFor="video"
                      className="font-semibold whitespace-no-wrap !w-[100px]"
                    >
                      Video Url
                    </label>
                    <div className="w-full">
                      <Field name="video" type="text" id="video" as={Input} />
                    </div>
                  </div>
                </div>
              </Card>
              <Card className="text-sm px-3 mb-4 py-4">
                <div className="mb-4">
                  <p className="font-semibold">Product Information</p>
                  <p className="text-xs">
                    Having accurate product information raises discoverability.
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
                  <div className="flex flex-col w-full">
                    <Field name="name" type="text" id="name" as={Input} />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="ml-2 mt-1 text-red-500 text-xs"
                    />
                  </div>
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
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <Select
                      className="w-full"
                      value={level1Category}
                      options={level1CategoryOptions}
                      onChange={(option) => {
                        setLevel1Category(option);
                        setLevel2Category(null);
                        values.category = null;
                        values.brand = null;
                      }}
                    />

                    <Select
                      isDisabled={level1Category === null}
                      className="w-full"
                      value={level2Category}
                      options={level2CategoryOptions}
                      onChange={(option) => {
                        setLevel2Category(option);
                        values.category = null;
                        values.brand = null;
                      }}
                    />
                    <div>
                      <Select
                        isDisabled={level2Category === null}
                        className="w-full"
                        name="category"
                        value={values.category}
                        options={level3CategoryOptions}
                        onChange={(option) => setFieldValue("category", option)}
                      />
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="ml-2 mt-1 text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <p className="font-semibold">
                      Product Attributes{" "}
                      <span className="text-rose-500 text-lg font-bold">*</span>
                    </p>
                    <p className="text-xs">
                      Boost your item's searchability by filling-up the key
                      Products Information marked with KEY. The more you fill
                      up, the easier for buyers to find your products.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 flex-wrap">
                    <div className="flex-1">
                      <label htmlFor="brand">
                        Brand{" "}
                        <span className="text-lg text-rose-500 font-bold">
                          *{" "}
                        </span>
                        <span className="text-xs">
                          {values.category?.value
                            ? ""
                            : "Please select the category first"}
                        </span>
                      </label>
                      <Select
                        isDisabled={!values.category?.value}
                        options={brandOptions.filter(
                          (brand) => brand.category === values.category?.value
                        )}
                        name="brand"
                        value={values.brand}
                        onChange={(option) => setFieldValue("brand", option)}
                      />
                      <ErrorMessage
                        name="brand"
                        component="div"
                        className="ml-2 mt-1 text-red-500 text-xs"
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
                        isMulti
                        options={colorOptions}
                        name="colorFamily"
                        value={values.colorFamily}
                        onChange={(option) =>
                          setFieldValue("colorFamily", option)
                        }
                        formatOptionLabel={(option) => (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <span
                              className="rounded-sm"
                              style={{
                                display: "inline-block",
                                width: 20,
                                height: 10,
                                backgroundColor: option.color || option.value,
                                marginRight: 10,
                              }}
                            />
                            <span className="capitalize">{option.label}</span>
                          </div>
                        )}
                      />
                      <ErrorMessage
                        name="colorFamily"
                        component="div"
                        className="ml-2 mt-1 text-red-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Update;
