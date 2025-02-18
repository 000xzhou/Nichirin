import usePostProduct from "../hooks/usePostProduct";
import { useState } from "react";
function CreateP() {
  // create product

  const initialState = {
    name: "",
    price: 0,
    stock: 0,
    description: { basic: "", details: "" },
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
        <fieldset>
          <legend>description</legend>
          <label htmlFor="description-basic">basic: </label>
          <input
            type="text"
            id="description-basic"
            name="basic"
            value={formData.description.basic}
            onChange={handleChange}
          />
          <label htmlFor="description">details: </label>
          <input
            type="text"
            id="description-details"
            name="details"
            value={formData.description.details}
            onChange={handleChange}
          />
          <label htmlFor="description-basic">features: </label>
          <input
            type="text"
            id="description-features"
            name="features"
            value={formData.description.features}
            onChange={handleChange}
          />
          <label htmlFor="description-basic">mesaurements: </label>
          <input
            type="text"
            id="description-mesaurements"
            name="mesaurements"
            value={formData.description.mesaurements}
            onChange={handleChange}
          />
        </fieldset>

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
        <label htmlFor="">active: </label>
        <input
          type="checkbox"
          id="active"
          name="active"
          value={formData.active}
          onChange={handleChange}
        />
        <button type="submit">Create new product</button>
      </form>
    </div>
  );
}

export default CreateP;
