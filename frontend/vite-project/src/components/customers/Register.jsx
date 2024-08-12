function Register() {
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Register;
