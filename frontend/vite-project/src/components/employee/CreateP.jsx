import usePostProduct from "../hooks/usePostProduct";
import { useState } from "react";
function CreateP() {
  // create product

  const initialState = {
    name: "",
    price: 0,
    stock: 0,
    description: { basic: "", details: "", measurements: [], features: [] },
    active: false,
    images: [],
    // currency: "USA",
  };
  const endpoint = "/products/create";
  const {
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
  } = usePostProduct(initialState, endpoint);

  return (
    <div>
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="">active: </label>
        <input
          type="checkbox"
          id="active"
          name="active"
          value={formData.active}
          onChange={handleChange}
        />
        <label htmlFor="price">price: </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
        <label htmlFor="stock">stock: </label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
        <label htmlFor="images">Images: </label>
        {imageInputs.map((image, index) => (
          <div key={index}>
            <input
              type="url"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Image ${index + 1}`}
            />
            <button type="button" onClick={() => handleRemoveImageInput(index)}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddImageInput}>
          Add Image URL
        </button>

        <fieldset>
          <legend>description</legend>
          <div>
            <label htmlFor="description-basic">basic: </label>
            <input
              type="textarea"
              id="description-basic"
              name="basic"
              value={formData.description.basic}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">details: </label>
            <input
              type="textarea"
              id="description-details"
              name="details"
              value={formData.description.details}
              onChange={handleChange}
            />
          </div>
          <div>
            {/* <label htmlFor="description-basic">features: </label>
          <input
            type="text"
            id="description-features"
            name="features"
            value={formData.description.features}
            onChange={handleChange}
          /> */}

            <label htmlFor="features">features: </label>
            {featuresInputs.map((features, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={features}
                  onChange={(e) => handlefeaturesChange(index, e.target.value)}
                  placeholder={`features ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemovefeaturesInput(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddfeaturesInput}>
              Add features text
            </button>
          </div>

          <div>
            {/* <label htmlFor="description-basic">mesaurements: </label>
          <input
            type="text"
            id="description-mesaurements"
            name="mesaurements"
            value={formData.description.mesaurements}
            onChange={handleChange}
          /> */}

            <label htmlFor="images">mesaurements: </label>
            {measurementInputs.map((mesaurements, index) => (
              <div key={index}>
                <input
                  type="text"
                  value={mesaurements}
                  onChange={(e) =>
                    handlemeasurementsChange(index, e.target.value)
                  }
                  placeholder={`mesaurements ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemovemeasurementsInput(index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={handleAddmeasurementsInput}>
              Add measurements text
            </button>
          </div>
        </fieldset>

        <button type="submit">Create new product</button>
      </form>
    </div>
  );
}

export default CreateP;
