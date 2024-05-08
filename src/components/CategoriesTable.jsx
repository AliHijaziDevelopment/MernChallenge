import React, { useState } from "react";
import axiosClient from "../axios";
import EditCategoryModal from "./EditCategoryModal";

const CategoriesTable = ({ categories, showToast, setCategories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const handleEdit = (id) => {
    setToEdit(categories.find((item) => item._id === id));
    setIsOpen(true);
  };

  console.log(categories)

  const handleDelete = (id) => {
    axiosClient
      .delete(`/category/delete/${id}`)
      .then(() => {
        const updatedcategories = categories.filter((item) => item._id !== id);
        setCategories(updatedcategories);
        showToast("", "Category deleted succesfully!");
      })
      .catch((error) => {
        console.log(error);
        showToast("error", error.response.data.error);
      });
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axiosClient
      .post(`/category/update/${toEdit._id}`, values)
      .then(({ data }) => {
        const index = categories.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          categories[index] = { ...categories[index], ...data };
          setCategories([...categories]);
          console.log(index);
        }

        showToast("", "Category edited succesfully!");
        closeModal();
      })
      .catch((error) => {
        console.log(error);
        showToast("error", error.response.data.error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      {isOpen && (
        <EditCategoryModal
          isOpen={isOpen}
          closeModal={closeModal}
          toEdit={toEdit}
          handleSubmit={handleSubmit}
        />
      )}
      <div className=" my-8">
        <h1 className="text-2xl font-bold mb-4">categories</h1>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {categories.map((category) => (
              <tr key={category._id} className="border-b">
                <td className="px-4 py-2">{category.name}</td>
                <td className="px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleEdit(category._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CategoriesTable;
