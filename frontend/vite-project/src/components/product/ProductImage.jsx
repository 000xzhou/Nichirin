function ProductImage({ image }) {
  return (
    <div>
      {image.length > 0 ? (
        <div>
          <img src="" alt="" />
        </div>
      ) : (
        <div>
          <img src="" alt="" />
        </div>
      )}
    </div>
  );
}

export default ProductImage;
