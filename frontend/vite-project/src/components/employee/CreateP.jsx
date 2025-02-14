function CreateP() {
  // create product

  return (
    <div>
      <form action="" method="post">
        <label htmlFor="">Name: </label>
        <input type="text" />
        <label htmlFor="">price: </label>
        <input type="number" />
        <label htmlFor="">stock: </label>
        <input type="number" />
        <label htmlFor="">description: </label>
        <input type="text" />
        <label htmlFor="">images: </label>
        <input type="file" />
        <label htmlFor="">active: </label>
        <input type="checkbox" />
      </form>
    </div>
  );
}

export default CreateP;
