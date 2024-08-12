function EditC() {
  return (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" />
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" />
        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" />
        <label htmlFor="password">Password:</label>
        <input type="text" id="password" />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" />
        <label htmlFor="birthday">Birthday:</label>
        <input type="text" id="birthday" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditC;
