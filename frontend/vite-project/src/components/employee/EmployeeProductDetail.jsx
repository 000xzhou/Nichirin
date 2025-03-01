import { useParams } from "react-router-dom";
// import "./productDetail.css";
import { Link } from "react-router-dom";
import useGet from "../hooks/useGet";
import ApiService from "../../api/api";
import { useEffect, useState } from "react";

const Popup = ({ onClose, field, value, onSubmit }) => {
  const [newValue, setNewValue] = useState(value);

  useEffect(() => {
    setNewValue(value);
  }, [value]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(field, value);
    // submit to db
    // try {
    //   const endpoint = `/products/${id}`;

    //   const data = await api.patch(endpoint, { [field]: newValue });
    //   if (data) refetch();

    //   console.log("sumbit");

    //   // close popup
    // onClose();
    // } catch (error) {
    //   console.error("Error submitting:", error);
    // }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Edit {field}</h2>
        <label htmlFor="value">{field}</label>
        <input
          id="value"
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

function EmployeeProductDetail() {
  const { id } = useParams();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedField, setSelectedField] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");

  const { apiData, loading, error, refetch } = useGet(`/products/${id}`);
  // console.log("apiData", apiData);
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

  const addImage = async () => {
    try {
      const endpoint = `/products/${id}/addImages`;
      let images = [];

      const data = await api.patch(endpoint, images);
      if (data) refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleUpdate = async (field, newValue) => {
    // call api
    try {
      const endpoint = `/products/${id}`;

      const data = await api.patch(endpoint, { [field]: newValue });
      if (data) refetch();

      console.log("sumbit");

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
      <div>
        {showPopup && (
          <Popup
            onClose={() => setShowPopup(false)}
            field={selectedField}
            value={selectedValue}
            onSubmit={handleUpdate}
          />
        )}

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
          <div>
            <button
              className="material-symbols-outlined"
              onClick={() => handleEditClick("Name", apiData.name)}
            >
              edit
            </button>
            <div>Name: {apiData.name} </div>
          </div>
          <div>
            <button
              className="material-symbols-outlined"
              onClick={() => handleEditClick("Price", apiData.price)}
            >
              edit
            </button>
            <div>Price: {apiData.price}</div>
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            <div>Stock: {apiData.stock}</div>
          </div>
        </div>

        <div>
          <h3>Description</h3>
          <div>
            <button className="material-symbols-outlined">edit</button>
            {apiData.description.basic && (
              <div>Basic: {apiData.description.basic}</div>
            )}
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            {apiData.description.details && (
              <div>Details: {apiData.description.details}</div>
            )}
          </div>
          <div>
            <button className="material-symbols-outlined">edit</button>
            Features:
            <div>
              {apiData.description.features?.length > 0 && (
                <ul>
                  {apiData.description.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <button className="material-symbols-outlined">edit</button>
              Measurements:
              {apiData.description.measurements?.length > 0 && (
                <ul>
                  {apiData.description.measurements.map((measure, index) => (
                    <li key={index}>{measure}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3>Image</h3>
          <button>Add Image</button>
          {apiData.images.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} />
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
    </>
  );
}

export default EmployeeProductDetail;
