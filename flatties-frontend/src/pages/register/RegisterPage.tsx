import React, {useState, ChangeEvent, FormEvent} from "react";
import axios  from "../../services/api";

import NavBar from "../../components/layout/navBar/NavBar";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import {InputLabel, OutlinedInput} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, {SelectChangeEvent} from "@mui/material/Select";
import Button from "@mui/material/Button";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";
import UserInfo from "../../models/UserInfo";

function RegisterPage() {
    //initial user info
    const generateInitialUserInfo = (): UserInfo => {
        // const initialUserInfo: UserInfo = {} as UserInfo;
        // Object.keys(initialUserInfo).forEach((key) => {
        //     if (key === 'dob') {
        //         initialUserInfo[key as keyof UserInfo] = null;
        //     } else {
        //         initialUserInfo[key as keyof UserInfo] = '';
        //     }
        // });
        return {
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            gender: '',
            dob: null,
            password: '',
        };
    };

    //to store user info
    const [userInfo, setUserInfo] = useState<UserInfo>(generateInitialUserInfo());

    //to handle user input
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            [id]: value,
        }));
    };

    //to handle date input
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInfo((prevState) => ({
            ...prevState,
            dob: new Date(event.target.value),
        }));
    };

    //get selected gender
    const [selectedGender, setSelectedGender] = useState<string>("");
    const handleCustomGenderChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = e.target;
        setUserInfo((prevState) => ({
            ...prevState,
            customGender: value,
        }));
    };

    //to store confirm password
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            password: value,
        }));
        setPasswordMatch(value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setConfirmPassword(value);
        setPasswordMatch(userInfo.password === value);
    };

    //to handle form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Log user info to the console, delete this line before deploying to production
        console.log('Form Data:', userInfo);

        // if (!isValidUserInfo(userInfo)) {
        //     console.error('Invalid user info:', userInfo);
        //     return;
        // }

        // Save user info to the backend
        axios.post('/user/create', userInfo)
            .then((response) => {
                console.log('User info saved:', response.data);
            })
            .catch((error) => {
                console.error('Failed to save user info:', error);
            });
    };

    //return the form
    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={2} alignItems="center" justifyContent="center">
                <h3>Basic Information</h3>
                <FormControl>
                    <TextField
                        id="firstName"
                        label="First Name"
                        variant="standard"
                        margin="normal"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        variant="standard"
                        margin="normal"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        id="email"
                        label="Email"
                        variant="standard"
                        margin="normal"
                        value={userInfo.email}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        id="phone"
                        label="Phone"
                        variant="standard"
                        margin="normal"
                        value={userInfo.phone}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        id="gender"
                        label="Gender"
                        variant="standard"
                        margin="normal"
                        select
                        required={true}
                        value={userInfo.gender}
                        onChange={(e) => {
                            setSelectedGender(e.target.value);
                            setUserInfo((prevState) => ({
                                ...prevState,
                                gender: e.target.value,
                            }));
                        }}
                    >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                        <MenuItem value={"custom"}>Input my Identity</MenuItem>
                        <MenuItem value={"Prefer not to say"}>Prefer not to say</MenuItem>
                    </TextField>
                    {selectedGender === 'custom' && (
                        <TextField
                            id="customGender"
                            label="Indentity"
                            variant="standard"
                            margin="normal"
                            required={true}
                            value={userInfo.gender}
                            onChange={handleCustomGenderChange}
                        />
                    )}

                    {/*<LocalizationProvider dateAdapter={AdapterDayjs} >*/}
                    {/*    <DemoContainer components={['DatePicker']} >*/}
                    {/*        <DatePicker*/}
                    {/*            label="Birthday"*/}
                    {/*            value={userInfo.dob}*/}
                    {/*            onChange={handleDateChange}*/}
                    {/*        />*/}
                    {/*    </DemoContainer>*/}
                    {/*</LocalizationProvider>*/}

                    <TextField
                        label="Birthday"
                        variant="standard"
                        type="date"
                        margin="normal"
                        // defaultValue="2017-05-24"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        // value={userInfo.dob}
                        onChange={handleDateChange}
                    />
                    <br/>
                    <h3>Login Information</h3>

                    <TextField
                        id="userName"
                        label="Username"
                        variant="standard"
                        margin="normal"
                        value={userInfo.userName}
                        onChange={handleChange}
                        required={true}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        variant="standard"
                        margin="normal"
                        type="password"
                        value={userInfo.password}
                        onChange={handlePasswordChange}
                        required={true}
                    />
                    <TextField
                        id="confirmPassword"
                        label="Confirm Password"
                        variant="standard"
                        margin="normal"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        error={!passwordMatch}
                        helperText={!passwordMatch ? 'Passwords do not match' : ''}
                        required={true}
                    />
                    <br/>
                    <Button variant="contained" color="primary" type="submit">Register</Button>
                </FormControl>
            </Stack>
        </form>
    );
}

export default RegisterPage;
