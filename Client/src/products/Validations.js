import * as yup from "yup";

const today = new Date();
today.setHours(0, 0, 0, 0);

export const CreateLocationSchema = yup.object().shape({
  street: yup.string().required("required"),
  post_code: yup.string().required("required"),
  state: yup.string().required("required"),
  city: yup.string().required("required"),
  phone_number: yup.string().required("required")
});

export const CreateProductSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  price: yup.number()
    .typeError('must be a positive value or zero')
    .min(0)
    .required("required"),
  files: yup.mixed()
    .test("file","required",(value) => (value && value.length && value.length >= 1))
    .test('fileType', `Unsupported File Format, image only("image/jpeg", "image/png", "image/gif", "image/jpg")`, value => !["image/jpeg", "image/png", "image/gif", "image/jpg"].includes(value.mimetype)),
  location: CreateLocationSchema
});

export const CreateServiceSchema = yup.object().shape({
  name: yup.string().required("required"),
  description: yup.string().required("required"),
  price: yup.number()
    .typeError('must be a positive value or zero')
    .min(0)
    .required("required"),
  persons: yup.number()
    .typeError('must be a positive value')
    .min(1)
    .required("required"),
  startingDate: yup.date()
    .min(today, "Starting date must be in future")
    .required("required"),
  location: CreateLocationSchema
});