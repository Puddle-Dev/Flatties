import React from "react";
import NavBar from "../../components/layout/navBar/NavBar";

function RegisterPage() {
  return (
    <div className="RegisterPage">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname"> First Name:</label>
          <br />
          <input
            type="text"
            name="firstname"
            id="fname"
            onChange={handleChange}
            value={formData.firstname}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="lastname"> Last Name:</label>
          <br />
          <input
            type="text"
            name="lastname"
            id="lname"
            onChange={handleChange}
            value={formData.lastname}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="email"> Email:</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={formData.email}
            required
            maxLength={40}
          />
        </div>

        <div>
          <label htmlFor="dob"> Date of Birth:</label>
          <br />
          <input
            type="date"
            name="dob"
            id="dob"
            onChange={handleChange}
            value={formData.dob}
            required
          />
        </div>

        <div>
          <label htmlFor="username"> Username:</label>
          <br />
          <input
            type="text"
            name="username"
            id="uname"
            onChange={handleChange}
            value={formData.username}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="gender"> gender:</label>
          <br />
          <input
            type="text"
            name="gender"
            id="gender"
            onChange={handleChange}
            value={formData.gender}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="phone"> Phone number:</label>
          <br />
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={formData.phone}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="ethnicity"> Ethnicity:</label>
          <br />
          <input
            type="text"
            name="ethnicity"
            id="ethnicity"
            onChange={handleChange}
            value={formData.ethnicity}
            required
            maxLength={20}
          />
        </div>

        <div>
          <label htmlFor="password"> Password:</label>
          <br />
          <input
            type="text"
            name="password"
            id="pword"
            onChange={handleChange}
            value={formData.password}
            required
            maxLength={20}
          />
        </div>

        <button>Sign Up</button>
      </form>
    </div>
  );
}

export default RegisterPage;
