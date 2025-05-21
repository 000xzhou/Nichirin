function Careers() {
  return (
    <div className="container">
      <h1>Job Application</h1>
      <form className="careers form">
        <div className="full-name">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" placeholder="First Name" />
          <input type="text" id="name" name="name" placeholder="Last Name" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="example@example.com"
          />
        </div>
        <div>
          <label htmlFor="available">Available start date</label>
          <input
            type="date"
            id="available"
            name="available"
            placeholder="MM-DD-YYYY"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="(000)000-000"
          />
        </div>
        <div className="job-select">
          <label htmlFor="position">What position are you applying for?</label>
          <select name="position" id="position" className="position">
            <option value="job1">Job 1</option>
            <option value="job2">Job 2</option>
            <option value="job3">Job 3</option>
          </select>
        </div>
        <div className="employment-status">
          <label htmlFor="employment-status">
            What is your current employment status?
          </label>
          <div>
            <input
              type="radio"
              id="employed"
              name="employment-status"
              value="employed"
            />
            <label htmlFor="employed">Employed</label>
          </div>
          <div>
            <input
              type="radio"
              id="unemployed"
              name="employment-status"
              value="unemployed"
            />
            <label htmlFor="unemployed">Unemployed</label>
          </div>
          <div>
            <input
              type="radio"
              id="self-employed"
              name="employment-status"
              value="self-employed"
            />
            <label htmlFor="self-employed">Self-Employed</label>
          </div>
          <div>
            <input
              type="radio"
              id="student"
              name="employment-status"
              value="student"
            />
            <label htmlFor="student">Student</label>
          </div>
        </div>
        <div className="resume">
          <label htmlFor="resume">Upload Resume</label>
          <label htmlFor="resume" className="custom-file-upload">
            Select Resume
          </label>
          <input type="file" name="resume" id="resume" />
        </div>
        <button type="submit" className="main-button padding-1">
          Apply
        </button>
      </form>
    </div>
  );
}

export default Careers;
