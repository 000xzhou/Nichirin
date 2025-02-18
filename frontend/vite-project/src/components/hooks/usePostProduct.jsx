import { useState, useEffect } from "react";
import ApiService from "../../api/api";
import { useNavigate, useLocation } from "react-router-dom";

const usePostProduct = (initialState, endpoint) => {
  const [formData, setFormData] = useState(initialState);
  const [imageInputs, setImageInputs] = useState([formData.images]);
  const [featuresInputs, setFeaturesInputs] = useState([
    formData.description.features,
  ]);
  const [measurementInputs, setMeasurementInputs] = useState([
    formData.description.measurements,
  ]);
  // const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // console.log(formData);

  // to edit form data
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      images: imageInputs,
      description: {
        ...prevData.description,
        features: featuresInputs,
        measurements: measurementInputs,
      },
    }));
  }, [imageInputs, featuresInputs, measurementInputs]);

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

  // images
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

  // description features
  const handlefeaturesChange = (index, value) => {
    const newFeatures = [...featuresInputs];
    newFeatures[index] = value;
    setFeaturesInputs(newFeatures);
  };
  const handleAddfeaturesInput = () => {
    setFeaturesInputs([...featuresInputs, ""]);
  };
  const handleRemovefeaturesInput = (index) => {
    const newfeaturess = featuresInputs.filter((_, i) => i !== index);
    setFeaturesInputs(newfeaturess);
  };

  // description mesaurements
  const handlemeasurementsChange = (index, value) => {
    const newMeasurement = [...measurementInputs];
    newMeasurement[index] = value;
    setMeasurementInputs(newMeasurement);
  };
  const handleAddmeasurementsInput = () => {
    setMeasurementInputs([...measurementInputs, ""]);
  };
  const handleRemovemeasurementsInput = (index) => {
    const newMeasurement = measurementInputs.filter((_, i) => i !== index);
    setMeasurementInputs(newMeasurement);
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
    handlefeaturesChange,
    handleAddfeaturesInput,
    handleRemovefeaturesInput,
    featuresInputs,
    handlemeasurementsChange,
    handleAddmeasurementsInput,
    handleRemovemeasurementsInput,
    measurementInputs,
  };
};
export default usePostProduct;
