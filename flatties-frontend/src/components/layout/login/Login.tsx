import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

function Login({ open, handleClose }: LoginModalProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate(); // Use the useHistory hook to get the history object

  // Add your login logic here
  const handleLogin = () => {
    // Implement your login logic using email and password
    console.log("Logging in with:", email, password);
  };

  const handleRegisterClick = () => {
    // Navigate to "/register" and close the modal
    navigate("/register");
    handleClose(); // Close the modal without passing any arguments
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Modal Header
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button variant="contained" onClick={handleLogin} sx={{ mr: 2 }}>
            Log In
          </Button>
          <Button
            variant="contained"
            onClick={handleRegisterClick}
            sx={{ mr: 2 }}
          >
            Register
          </Button>
        </Typography>
        <Button onClick={handleClose} sx={{ mt: 2 }}>
          Close
        </Button>
      </Box>
    </Modal>
  );
}

export default Login;
