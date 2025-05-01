import usePostProduct from "../hooks/usePostProduct";
import { useState } from "react";
import "./createp.css";

function CreateP() {
  // create product

  const initialState = {
    name: "",
    price: 0,
    stock: 0,
    description: { basic: "" },
    active: true,
    images: [],
    tags: [],
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
    // handlefeaturesChange,
    // handleAddfeaturesInput,
    // handleRemovefeaturesInput,
    // featuresInputs,
    // handlemeasurementsChange,
    // handleAddmeasurementsInput,
    // handleRemovemeasurementsInput,
    // measurementInputs,
    handleAddTagsInput,
    handleTagsChange,
    handleRemoveTagsInput,
    tagsInputs,
  } = usePostProduct(initialState, endpoint);

  return (
    <div className="createp-wrapper">
      {error && <div>{error.message}</div>}
      <form onSubmit={handleSubmit} className="form createp-form">
        <div className="flex-gap-0-25 createp-checkbox">
          <input
            type="checkbox"
            id="active"
            name="active"
            value={formData.active}
            checked={formData.active}
            onChange={handleChange}
          />
          <label htmlFor="active">active</label>
        </div>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock: </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags: </label>
          {tagsInputs.map((tags, index) => (
            <div key={index} className="flex-gap-0-25 create-tags-input">
              <input
                type="text"
                value={tags}
                onChange={(e) => handleTagsChange(index, e.target.value)}
                placeholder={`tags ${index + 1}`}
              />
              <button
                type="button"
                className="material-symbols-outlined"
                onClick={() => handleRemoveImageInput(index)}
              >
                delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border-radius-button secondary-button padding-point-5"
            onClick={handleAddTagsInput}
          >
            Add Tag
          </button>
        </div>
        <div>
          <label htmlFor="images">Images: </label>
          {imageInputs.map((image, index) => (
            <div key={index} className="flex-gap-0-25 create-tags-image">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder={`Image ${index + 1}`}
              />
              <button
                type="button"
                className="material-symbols-outlined"
                onClick={() => handleRemoveImageInput(index)}
              >
                delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="border-radius-button secondary-button padding-point-5"
            onClick={handleAddImageInput}
          >
            Add Image
          </button>
        </div>
        <div>
          <label htmlFor="description-basic">Description: </label>
          <textarea
            id="description-basic"
            name="basic"
            value={formData.description.basic}
            onChange={handleChange}
            placeholder="Enter description..."
          />
        </div>
        {/* <div>
            <label htmlFor="description">details: </label>
            <input
              type="textarea"
              id="description-details"
              name="details"
              value={formData.description.details}
              onChange={handleChange}
            />
          </div> */}
        {/* <label htmlFor="description-basic">features: </label>
          <input
          type="text"
          id="description-features"
          name="features"
          value={formData.description.features}
          onChange={handleChange}
          /> */}

        <div>
          {/* <label htmlFor="description-basic">mesaurements: </label>
          <input
            type="text"
            id="description-mesaurements"
            name="mesaurements"
            value={formData.description.mesaurements}
            onChange={handleChange}
          /> */}

          {/* <label htmlFor="images">mesaurements: </label>
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
            */}
        </div>

        <button type="submit" className="confirm-button padding-point-5">
          Create new product
        </button>
      </form>
    </div>
  );
}

export default CreateP;
