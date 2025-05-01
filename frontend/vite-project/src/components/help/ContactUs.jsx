function ContactUs() {
  return (
    <>
      <h1>Contact Us</h1>
      <form className="contact-us form">
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" placeholder="name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input type="text" name="phone" id="phone" placeholder="phone" />
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea type="textarea" name="comment" id="comment"></textarea>
        </div>
        <button type="submit" className="main-button padding-point-5 ">
          Send
        </button>
      </form>
    </>
  );
}

export default ContactUs;
