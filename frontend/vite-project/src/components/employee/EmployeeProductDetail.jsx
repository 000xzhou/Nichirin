import { useParams } from "react-router-dom";
// import "./productDetail.css";
import { Link, useNavigate } from "react-router-dom";
import useGet from "../hooks/useGet";
import ApiService from "../../api/api";
import { useEffect, useState } from "react";
import "./employeeproductdetail.css";

const Popup = ({ onClose, field, value, onSubmit }) => {
  const [newValue, setNewValue] = useState(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(field, newValue);
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h2>Edit {field}</h2>
        <form onSubmit={handleSubmit}>
          {/* <label htmlFor="value">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </label> */}
          <input
            id="value"
            type={field === "image" ? "url" : "text"}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
          />
          <div className="button-group">
            <button type="submit" className="main-button padding-point-5 ">
              Submit
            </button>
            <button onClick={onClose} className="main-button padding-point-5 ">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function EmployeeProductDetail() {
  const { id } = useParams();
  // const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const { apiData, loading, error, refetch } = useGet(`/products/${id}`);
  // const [dataInfo, setDataInfo] = useState(apiData);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  // console.log(dataInfo);
  const api = new ApiService("http://localhost:3000");

  const setActive = async (checked) => {
    // change checked in db using id
    const item = { id: id, active: checked };
    const data = await api.patch(`/products/${id}`, item);
    if (data) refetch();
    // console.log("Active changed");
  };

  const deleteImage = async (image) => {
    try {
      const endpoint = `/products/${id}/deleteImage`;

      const data = await api.delete(endpoint, {
        image: image,
      });
      if (data) refetch();
      // setDataInfo(data);
      // alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      // alert("Failed to delete product. Please try again.");
    }
  };

  const deleteTags = async (tag) => {
    try {
      const endpoint = `/products/${id}/deleteTag`;

      const data = await api.delete(endpoint, {
        tag: tag,
      });
      if (data) refetch();
      // setDataInfo(data);
      // alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      // alert("Failed to delete product. Please try again.");
    }
  };

  // const handleDeleteDList = async (type, dataItem) => {
  //   try {
  //     const endpoint = `/products/${id}/featureormeasurements`;
  //     let dataToDelete;

  //     if (type === "tags") {
  //       dataToDelete = {
  //         description: {
  //           tags: dataItem,
  //         },
  //       };
  //     } else {
  //       dataToDelete = {
  //         description: {
  //           measurements: dataItem,
  //         },
  //       };
  //     }
  //     const data = await api.delete(endpoint, dataToDelete);
  //     if (data) refetch();
  //   } catch (error) {
  //     console.error("Error submitting:", error);
  //   }
  // };

  const handleUpdate = async (field, newValue) => {
    // call api
    try {
      let endpoint = `/products/${id}`;
      let sendData;
      if (field === "basic") {
        sendData = {
          "description.basic": newValue,
        };
      } else if (field === "details") {
        sendData = {
          "description.details": newValue,
        };
      }
      // tags measurements requires []
      else if (field === "tags") {
        endpoint = `/products/${id}/addtags`;
        sendData = { tags: [newValue] };
        // } else if (field === "measurements") {
        //   endpoint = `/products/${id}/featureormeasurements`;
        //   sendData = {
        //     description: {
        //       measurements: [newValue],
        //     },
        //   };
        // images require []
      } else if (field === "image") {
        endpoint = `/products/${id}/addImages`;
        sendData = { images: [newValue] };
      } else {
        sendData = { [field]: newValue };
      }
      console.log(sendData);
      const data = await api.patch(endpoint, sendData);
      if (data) refetch();

      // close popup
      // onClose();
      setShowPopup(false);
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  const handleEditClick = (field, value) => {
    setSelectedField(field);
    setSelectedValue(value);
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          field={selectedField}
          value={selectedValue}
          onSubmit={handleUpdate}
        />
      )}
      <div className="e-product-detail-container">
        <div>
          {/* <input type="checkbox" name="" id="" /> */}
          <input
            type="checkbox"
            checked={apiData.active}
            onChange={(e) => setActive(e.target.checked)}
          />
          active
          {/* {apiData.active ? <button>Off</button> : <button>On</button>} */}
        </div>

        <div>
          <div className="flex-gap-0-25">
            <button
              className="material-symbols-outlined"
              onClick={() => handleEditClick("name", apiData.name)}
            >
              edit
            </button>
            <div>Name: {apiData.name} </div>
          </div>
          <div className="flex-gap-0-25">
            <button
              className="material-symbols-outlined"
              onClick={() => handleEditClick("price", apiData.price)}
            >
              edit
            </button>
            <div>Price: {apiData.price}</div>
          </div>
          <div className="flex-gap-0-25">
            <button
              className="material-symbols-outlined"
              onClick={() => handleEditClick("stock", apiData.stock)}
            >
              edit
            </button>
            <div>Stock: {apiData.stock}</div>
          </div>
        </div>

        <div>
          <h3>Description</h3>
          <div className="flex-gap-0-25">
            <button
              className="material-symbols-outlined"
              onClick={() =>
                handleEditClick("basic", apiData.description.basic)
              }
            >
              edit
            </button>
            {apiData.description.basic && (
              <div>Description: {apiData.description.basic}</div>
            )}
          </div>
          {/* <div>
            <button
              className="material-symbols-outlined"
              onClick={() =>
                handleEditClick("details", apiData.description.details)
              }
            >
              edit
            </button>
            {apiData.description.details && (
              <div>Details: {apiData.description.details}</div>
            )}
          </div> */}
          <div className="tags-container">
            <div className="flex-gap-0-25 cursor-pointer">
              <button
                className="material-symbols-outlined"
                onClick={() => handleEditClick("tags", " ")}
              >
                add
              </button>
              Tags
            </div>
            <div className="tags-api-wrapper">
              {apiData.tags?.length > 0 && (
                <ul>
                  {apiData.tags.map((tag, index) => (
                    <li key={index} className="flex-gap-0-25">
                      <div>{tag}</div>
                      <button
                        className="material-symbols-outlined"
                        onClick={() => deleteTags(tag)}
                      >
                        delete
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* <div>
              <button
                className="material-symbols-outlined"
                onClick={() => handleEditClick("measurements", "")}
              >
                add
              </button>
              Measurements:
              {apiData.description.measurements?.length > 0 && (
                <ul>
                  {apiData.description.measurements.map((measure, index) => (
                    <ul key={index}>
                      <li>{measure}</li>
                      <button
                        className="material-symbols-outlined"
                        onClick={() =>
                          handleDeleteDList("measurements", measure)
                        }
                      >
                        delete
                      </button>
                    </ul>
                  ))}
                </ul>
              )}
            </div> */}
        </div>
        <div>
          <h3>Image</h3>
          {/* Add image need a popup or something ... or send to the add image page. */}
          {/* <button onClick={() => navigate(`/products/${id}/add-image`)}> */}
          <div
            className="flex-gap-0-25 cursor-pointer"
            onClick={() => handleEditClick("image", " ")}
          >
            <button className="material-symbols-outlined">add</button>
            Image
          </div>
          {/* <button onClick={() => handleEditClick("image", "")}>
            Add Image
          </button> */}
          <div className="employee-product-image-wrapper">
            {apiData.images.map((image, index) => (
              <div key={index}>
                <img
                  className="employee-product-image"
                  src={image}
                  alt={`Image ${index + 1}`}
                />
                <button
                  className="material-symbols-outlined"
                  onClick={() => deleteImage(image)}
                >
                  delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeProductDetail;
