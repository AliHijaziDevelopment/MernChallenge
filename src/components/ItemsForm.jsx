import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ItemsForm = ({ handleSubmit, initialValues, categories, type }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description:
      type === "item" ? Yup.string().required("description is required") : "",
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setErrors }) =>
        handleSubmit(values, {
          setSubmitting,
          setErrors,
        })
      }
    >
      {({ values, isSubmitting, errors }) => (
        <Form className="flex items-center">
          <div className="mr-4 flex flex-col">
            <Field
              type="text"
              name="name"
              className="px-4 py-2 rounded"
              placeholder="Name"
            />
            <ErrorMessage
              component="span"
              className="text-red-500 my-0 text-sm"
              name="name"
            />
          </div>

          {type === "item" && (
            <>
              <div className="mr-4 flex flex-col">
                <Field
                  as="textarea"
                  name="description"
                  className="px-4 py-2 rounded"
                  placeholder="Description..."
                />
                <ErrorMessage
                  component="span"
                  className="text-red-500 my-0 text-sm"
                  name="description"
                />
              </div>

              <div className="mr-4 ">
                <Field
                  type="tel"
                  name="phoneNumber"
                  className="px-4 py-2 rounded"
                  placeholder="Phone number"
                />
                <ErrorMessage
                  component="span"
                  className="text-red-500 my-0 text-sm"
                  name="phoneNumber"
                />
              </div>
              <div className="mr-4 flex flex-col">
                <Field
                  as="select"
                  name="category"
                  className="px-4 py-2 rounded"
                >
                  <option value="">Select...</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              </div>
            </>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Save
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ItemsForm;
