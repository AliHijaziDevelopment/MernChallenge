import React from "react";
import Modal from "react-modal";
import ItemsForm from "./ItemsForm";

const EditModal = ({ isOpen, closeModal, toEdit, handleSubmit ,categories }) => {
  const initialValues = {
    name: toEdit.name,
    description: toEdit.description,
    phoneNumber: toEdit.phone_number,
    category:toEdit.category
  };

  console.log(toEdit)
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={closeModal}
      contentClassName="bg-white rounded-lg "
      overlayClassName="fixed inset-0  bg-opacity-75 "
    >
      <div>
        <div className="flex justify-between">
          <h2 className="text-xl font-bold mb-4">Edit Item</h2>
          <h2 onClick={closeModal} className="text-xl font-bold mb-4">
            Close
          </h2>
        </div>

        <ItemsForm
          handleSubmit={handleSubmit}
          initialValues={initialValues}
          categories={categories}
          type="item"
        />
      </div>
    </Modal>
  );
};

export default EditModal;
