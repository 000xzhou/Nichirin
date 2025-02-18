import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const usePostProduct = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  const [imageInputs, setImageInputs] = useState([formData.images]);
  // const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(formData);

  // to edit form data
  useEffect(() => {
    handleChange({ target: { name: "images", value: imageInputs } });
  }, [imageInputs]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((data) => {
      // Check if the field belongs to "description"
      if (["basic", "details"].includes(name)) {
        return {
          ...data,
          description: {
            ...data.description,
            [name]: value, // Update nested description fields
          },
        };
      }

      // Otherwise, update it as a top-level field
      return {
        ...data,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...imageInputs];
    newImages[index] = value;
    setImageInputs(newImages);
  };

  const handleAddImageInput = () => {
    setImageInputs([...imageInputs, ""]);
  };

  const handleRemoveImageInput = (index) => {
    const newImages = imageInputs.filter((_, i) => i !== index);
    setImageInputs(newImages);
  };

  //   fetching data from api
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // api
      const api = new ApiService("http://localhost:3000");

      api
        .post(endpoint, formData)
        .then((data) => {
          console.log(data);
          // send them back to the page they were at.
          console.log("Here at right before nav from", from);
          navigate(from);
        })
        .catch((err) => setError(err));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    error,
    handleAddImageInput,
    handleImageChange,
    handleRemoveImageInput,
    imageInputs,
  };
};
export default usePostProduct;
