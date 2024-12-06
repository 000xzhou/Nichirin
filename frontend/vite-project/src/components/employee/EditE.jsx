function EditE() {
  return (
    <div>
      <form action="" method="post">
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="fname">First Name:</label>
        <input type="text" id="fname" name="fname" />
        <label htmlFor="lname">Last Name:</label>
        <input type="text" id="lname" name="lname" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" />
        <label htmlFor="status">Status:</label>
        <input type="text" id="status" name="status" />
        <label htmlFor="role">Role:</label>
        <div>
          <input type="radio" id="employee" name="role" value="employee" />
          <label htmlFor="employee">Employee</label>
        </div>
        <div>
          <input type="radio" id="customer" name="role" value="admin" />
          <label htmlFor="customer">Customer</label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default EditE;
