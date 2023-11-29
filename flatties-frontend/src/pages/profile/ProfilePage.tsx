import React, { useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";

function ProfilePage() {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState("Add a Bio");
  const [profilePic] = useState("../../../assets/images/flatties-icon-logo.png")

  const handleEditToggle = () => {
    setEditable(!editable);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <img src={profilePic} alt="Null" style={{ width: "500px", height: "500px"}} />
      <h2> Zephr Evergreen </h2>
      <h3> Username: Ze2002</h3>
      {editable ? ( 
        <div>
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
          />
          <button onClick={handleEditToggle}>Save</button>
        </div>
      ) : (
        <div>
          <p>{text}</p>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
      <p>Email: ze@email.com</p>
      <p>Phone: 0210000000</p>
    </div>
  );
}

export default ProfilePage;
