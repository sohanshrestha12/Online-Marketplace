import { Category } from "@/Types/Category";
import { getAllBrands, getAllCategories, updateProduct } from "@/api/Product";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { FetchProduct } from "@/pages/ProductDetails";
import { colorOptions } from "@/utils/Colors";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ErrorMessage, Field, Form, Formik, FormikValues } from "formik";
import { useEffect, useState } from "react";
import Select from "react-select";
import AddImages from "./AddImages";
import { Card, CardTitle } from "./ui/card";
import { Input } from "./ui/input";

import { Brand } from "@/Types/Brand";
import { getFirstWord, getLastWord, getMiddleWords } from "@/utils/Category";
import { IoIosClose } from "react-icons/io";
import ReactQuill from "react-quill";
import { Button } from "./ui/button";
import { useProduct } from "@/contexts/ProductContext";
import { toast } from "sonner";

interface UpdateProps {
  isOpen: boolean;
  onClose: () => void;
  product: FetchProduct;
}

const Update = ({ isOpen, onClose, product }: UpdateProps) => {
  const [images, setImages] = useState<File[] >([]);
  const [imageShow, setImageShow] = useState<{ url: string }[]>([]);
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [level1Category, setLevel1Category] = useState<Option | null>(null);
  const [level2Category, setLevel2Category] = useState<Option | null>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [existingImage,setExistingImage] = useState<string[]>([]);
  const [size, setSize] = useState<number[]>([]);
  const [sizeInput, setSizeInput] = useState("");
  const [value, setValue] = useState("");
  const {updateProductState} = useProduct();

  interface Option {
    value: string;
    label: string;
    category?: string;
    color?: string;
  }

  const handleAddSize = () => {
    setSize([...size, parseInt(sizeInput.trim())]);
    setSizeInput("");
  };

  const handleRemoveSize = (i: number) => {
    const updatedSize = size.filter((_, index) => index !== i);
    setSize(updatedSize);
  };

  const initialValues: FormikValues = {
    id:product._id,
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
    colorFamily: product.colorFamily.map((color: string) => {
      const colorOption = colorOptions.find((option) => option.value === color);
      if (colorOption) {
        return {
          value: colorOption.value,
          label: colorOption.label,
        };
      }
      return null;
    }),
    price: product.price,
    quantity: product.quantity,
    description: product.description,
    videoUrl: product.videoUrl,
  };

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const response = await getAllCategories();
        setAllCategory(response.data.data);
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllBrands();
  }, []);

  const handleSubmit = async (values: FormikValues) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const value = (values as any)[key];

      if (value !== null && value !== undefined) {
        if (Array.isArray(value)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value.forEach((item: any) => {
            formData.append(key, item.value.toString());
          });
        } else if (typeof value === "object") {
          formData.append(key, value.value);
        } else {
          formData.append(key, value.toString());
        }
      }
    });
    size.forEach((item) => {
      formData.append("size", item.toString());
    });

    images.forEach((image) => {
      formData.append("images", image);
    });

    existingImage.forEach((image)=>{
      formData.append("existingImage",image);
    });

    formData.append("uploadType", "product");


    try {
      const response = await updateProduct(formData);
      updateProductState(response.data.data.updatedProduct,response.data.data.categoryString);
      toast.success("Product Updated successfully");
      onClose();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    // for (const pair of formData.entries()) {
    //   // console.log(`${pair[0]}: ${pair[1]}`);
    //   if (pair[1] instanceof File) {
    //     console.log(`${pair[0]}:`);
    //     console.log(`  Name: ${pair[1].name}`);
    //     console.log(`  Type: ${pair[1].type}`);
    //     console.log(`  Size: ${pair[1].size} bytes`);
    //   } else {
    //     console.log(`${pair[0]}: ${pair[1]}`);
    //   }
    // }
    setImages([]);
    setImageShow([]);

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
    setSize(product.size);
    setValue(product.description);
    setExistingImage(product.images);
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
  const handleExistingImage = (img:string[]) =>{
    setExistingImage([...img]);
  }

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
      <DialogContent className="w-80 max:w-full sm:w-full h-[100vh] overflow-y-scroll p-0 px-4 pt-4 sm:max-w-[65rem]">
        <DialogTitle>Update</DialogTitle>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
        >
          {({ isSubmitting, setFieldValue, values }) => (
            <Form className="relative">
              <Field name="id" as={Input} hidden disabled />
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
                      handleExistingImage={handleExistingImage}
                      existingImage = {existingImage}
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
                      <Field name="videoUrl" type="text" id="Url" as={Input} />
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
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="ml-2 mt-1 text-red-500 text-xs"
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
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="ml-2 mt-1 text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 flex-col flex-wrap">
                    <div className="flex-1">
                      <label htmlFor="size">
                        Size{" "}
                        <span className="text-lg text-rose-500 font-bold">
                          *
                        </span>
                      </label>
                      <div className="flex gap-4">
                        <Field
                          type="number"
                          placeholder="In cm"
                          value={sizeInput}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSizeInput(e.target.value)
                          }
                          onKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddSize();
                            }
                          }}
                          as={Input}
                        />

                        <Button
                          type="button"
                          onClick={handleAddSize}
                          className="bg-indigo-500 hover:bg-indigo-600"
                        >
                          Add Size
                        </Button>
                      </div>
                    </div>
                    {size && (
                      <div className="flex items-center gap-2">
                        <label>Sizes: </label>
                        <ul className="flex gap-2">
                          {size.map((item, i) => (
                            <div key={i}>
                              <div className="relative group">
                                <li className="py-1 px-3 bg-indigo-200 rounded">
                                  {item}
                                </li>
                                <IoIosClose
                                  onClick={() => handleRemoveSize(i)}
                                  className="absolute p-1 bg-indigo-400 rounded-full invisible opacity-30 transition-all group-hover:!visible group-hover:!opacity-100 hover:cursor-pointer text-white text-xl -top-2 -right-1"
                                />
                              </div>
                            </div>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
              <Card className="text-sm px-3 py-3 mb-4">
                <p className=" font-semibold">
                  Detailed Description{" "}
                  <span className="text-lg font-bold text-rose-500">*</span>{" "}
                </p>
                <p className="text-xs mb-4">
                  Having long description helps to build trust by providing more
                  key information in text form.
                </p>
                <ReactQuill
                  theme="snow"
                  value={value}
                  onChange={(content) => {
                    setValue(content);
                    setFieldValue("description", content);
                  }}
                  className="h-auto !min-h-[70px] mb-[25px]"
                />
              </Card>
              <div className="flex justify-end px-[50px] w-[full] py-3  bg-white sticky bottom-0 right-0">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-indigo-500 hover:bg-indigo-600"
                >
                  {isSubmitting ? "Updating..." : "Update"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default Update;
