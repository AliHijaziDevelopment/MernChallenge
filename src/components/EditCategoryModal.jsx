import React from "react";
import Modal from "react-modal";
import ItemsForm from "./ItemsForm";

const EditCategoryModal = ({ isOpen, closeModal, toEdit, handleSubmit }) => {
  const initialValues = {
    name: toEdit.name,
  };

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
          <h2 className="text-xl font-bold mb-4">Edit Category</h2>
          <h2 onClick={closeModal} className="text-xl font-bold mb-4">
            Close
          </h2>
        </div>

        <ItemsForm handleSubmit={handleSubmit} initialValues={initialValues} type="category" />
      </div>
    </Modal>
  );
};

export default EditCategoryModal;
