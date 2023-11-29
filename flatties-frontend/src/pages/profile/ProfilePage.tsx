import React, { useState } from "react";
import NavBar from "../../components/layout/navBar/NavBar";

function ProfilePage() {
  const [editable, setEditable] = useState(false); // State to manage edit mode
  const [text, setText] = useState("Add a Bio"); // State to hold the text input value

  const handleEditToggle = () => {
    setEditable(!editable); // Toggle the editable state
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value); // Update the state with the input value
  };

  return (
    <div>
      <h1>Profile Page</h1>
      {editable ? ( // Conditional rendering based on editable state
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
    </div>
  );
}

export default ProfilePage;
