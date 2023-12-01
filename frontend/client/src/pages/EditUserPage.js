import ProductDescriptionForm from "../components/ProductForm"
import NavBarWithCart from "../components/NavBarWithCart"
import EditUserProfileForm from "../components/EditUserProfileForm"
import InputField from "../components/InputField"
import SelectField from "../components/SelectField"
import ImageUploadField from "../components/ImageUploadField"
import { toast } from 'react-toastify';
import { useSelector } from "react-redux"
import { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const EditUserPage=()=>{
    let AuthTokens = useSelector(state => state.AuthTokens);
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      bio: '',
      avatar: null
    });
  
    const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleImageChange = (e) => {
      setFormData({ ...formData, avatar: e.target.files[0] });
    };
  
    const validateForm = () => {
      // Add validation logic here
      return true;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!validateForm()) {
        toast.error("Please fill in all required fields.");
        return;
      }
    
      const data = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        data.append(key, value);
      }
    
      // Log data for verification
      for (var pair of data.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
      }
    
      // Add logic to send data to your backend API
      console.log(data);
      toast.success('Profile updated successfully');
    };
    return(
        <div className="w-[100vw] h-[100vh] relative flex flex-col items-center">
              <NavBarWithCart/>
          <div className="w-[80%] h-[50%] flex flex-col items-center gap-2 mt-4">  
            <h1 className="w-full flex justify-center py-2 text-2xl">Personal Information</h1>
            <div className="flex w-1/2 gap-4 justify-center"> 
                <TextField id="outlined-basic" label="Firstname" variant="outlined" sx={{ width: '50%' }} />
                <TextField id="outlined-basic" label="Lastname" variant="outlined" sx={{ width: '50%' }} />
            </div>
            <div className="flex w-1/2 gap-4">
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={{ width: '100%' }} />
            </div>
            <div className="flex w-1/2 gap-4">
                <TextField id="outlined-basic" label="StudentID" variant="outlined" sx={{ width: '100%' }} />
            </div>
            <div className="flex w-1/2 gap-4">
                <TextField id="outlined-basic" label="Password" variant="outlined" sx={{ width: '100%' }} />
            </div>
            <div className="flex w-1/2 gap-4">
                <TextField id="outlined-basic" label="Confirm Password" variant="outlined" sx={{ width: '100%' }} />
            </div>
            <div className="flex w-1/2 gap-4">
                {/* <button>Update Account</button> */}
                <Button variant="contained">Update Account</Button>

                <Button variant="contained">Delete Account</Button>
            </div>
          </div>

        </div>
    )
}
export default EditUserPage