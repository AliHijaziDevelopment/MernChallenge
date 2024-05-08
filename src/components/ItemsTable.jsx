import React, { useState } from "react";
import EditModal from "./EditModal";
import axiosClient from "../axios";

const ItemsTable = ({ items, showToast, setItems, categories }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toEdit, setToEdit] = useState(null);
  const handleEdit = (id) => {
    setToEdit(items.find((item) => item.id === id));
    setIsOpen(true);
  };

  const handleDelete = (id) => {
    axiosClient
      .delete(`/items/delete/${id}`)
      .then(() => {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
        showToast("", "Item deleted succesfully!");
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
      .post(`/items/update/${toEdit.id}`, values)
      .then(({ data }) => {
        const index = items.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          items[index] = { ...items[index], ...data };
          setItems([...items]);
          console.log(index);
        }

        showToast("", "Item edited succesfully!");
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
        <EditModal
          isOpen={isOpen}
          closeModal={closeModal}
          toEdit={toEdit}
          handleSubmit={handleSubmit}
          categories={categories}
        />
      )}
      <div className=" my-8">
        <h1 className="text-2xl font-bold mb-4">Items</h1>
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Country Code</th>
              <th className="px-4 py-2">Country Name</th>
              <th className="px-4 py-2">Operator Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {items.map((item) => {
              const category = categories.find(
                (category) => category._id === item.category
              );
              return (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="px-4 py-2">{item.phone_number}</td>
                  <td className="px-4 py-2">{item.phone_info?.country_code}</td>
                  <td className="px-4 py-2">{item.phone_info?.country_name}</td>
                  <td className="px-4 py-2">
                    {item.phone_info?.operator_name}
                  </td>
                  <td className="px-4 py-2">{category?.name ?? null}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      onClick={() => handleEdit(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ItemsTable;
