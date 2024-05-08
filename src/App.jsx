import toastr from "toastr";
import "toastr/build/toastr.min.css";
import axiosClient from "./axios";
import { useEffect, useState } from "react";
import ItemsTable from "./components/ItemsTable";
import ItemsForm from "./components/ItemsForm";
import CategoriesTable from "./components/CategoriesTable";

toastr.options = {
  positionClass: "toast-top-right",
  closeButton: false,
  timeOut: 5000,
};

const showToast = (type, message) => {
  type == "error" ? toastr.error(message) : toastr.success(message);
};

function App() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isItem, setIsItem] = useState(true);
  useEffect(() => {
    setLoading(true);
    axiosClient
      .get("/items")
      .then(({ data }) => {
        console.log(data)
        setItems(data.items);
        setCategories(data.categories);
        setLoading(false);
      })
      .catch();
  }, []);

  const submitItem = (values, { setSubmitting }) => {
    const { category, ...newValues } = values;
  const requestData = category ? values : newValues;
    axiosClient
      .post("/items/add", requestData)
      .then(({ data }) => {
        setItems([data, ...items]);

        showToast("", "Item added succesfully!");
      })
      .catch((error) => {
        console.log(error);
        showToast("error", error.response.data.error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const submitCategory = (values, { setSubmitting }) => {
    axiosClient
      .post("/category/add", values)
      .then(({ data }) => {
        console.log(data);
        setCategories([data, ...categories]);

        showToast("", "Category added succesfully!");
      })
      .catch((error) => {
        console.log(error);
        showToast("error", error.response.data.error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const toggleTab = (toggle) => {
    setIsItem(toggle);
  };

  const itemsInitialValues = {
    name: "",
    description: "",
    phoneNumber: "",
    category: "",
  };
  const CategoryInitialValues = { name: "" };

  return (
    <>
      {loading && (
        <div className="flex justify-center items-center">loading....</div>
      )}
      {!loading && (
        <>
          <div className="flex text-lg text-center font-bold mb-4 justify-center">
            <h2
              className={`cursor-pointer ${
                isItem && "border-b-2 border-gray-400"
              }`}
              onClick={() => toggleTab(true)}
            >
              Posts
            </h2>

            <h2
              className={`ml-5 cursor-pointer ${
                !isItem && "border-b-2 border-gray-400"
              }`}
              onClick={() => toggleTab(false)}
            >
              Saved
            </h2>
          </div>
          {isItem ? (
            <>
              <ItemsForm
                handleSubmit={submitItem}
                initialValues={itemsInitialValues}
                categories={categories}
                type="item"
              />
              <ItemsTable
                items={items}
                showToast={showToast}
                setItems={setItems}
                categories={categories}
              />
            </>
          ) : (
            <>
              <ItemsForm
                handleSubmit={submitCategory}
                initialValues={CategoryInitialValues}
                type="category"
              />
              <CategoriesTable
                categories={categories}
                showToast={showToast}
                setCategories={setCategories}
              />
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
