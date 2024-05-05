import React, { useState , useEffect } from "react";
import axios from "axios";
import "./adminprofile.scss";
import { addUser, updateUser } from "../../redux/userSlice";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "../../Components/SideBar Section/Sidebar";
import img from "../../../src/Assets/img.jpg";

const AdminProfile = () => {
  
  const [username , setUsername] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [role , setRole] = useState('')
  const [photo, setPhoto] = useState(null);
  const [saveimg, setSaveimg] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate();


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setSaveimg(true);
    }
  };

  const handleSave = () => {
    console.log("Photo saved:", photo);
    setSaveimg(false);
  };
  const userDataString = localStorage.getItem('user_data');
  const userData = JSON.parse(userDataString);

  //update admin detail
  const handleUpdate = async (id) => {
    //e.preventDefault();
    try {
      const updateAdminData = {
        username: username,
        email: email,
        role: role,
      };
      const response = await axios.put(
        `http://localhost:4000/user/updateUser/${id}`,
        updateAdminData
      );
      console.log("Updated admin:", response.data);
      if (response.status === 200) {
        // Dispatch an action to update the user in the Redux store
        dispatch(updateUser(response.data.user));
        // Navigate to the '/User' route upon successful update
        navigate("/User");
      } else {
        console.error("Failed to update user:", response.statusText);
        // Optionally, provide feedback to the user about the failed update
      }
    } catch (error) {
      console.error("Error updating user:", error);
      // Optionally, provide feedback to the user about the error
    }
  };
  




  return (
    <div className="container">
      <Sidebar />

      <div className="mainContent">
        <div className="bottom flex">
          <div className="imgcontainer">
            {photo ? (
              <img src={URL.createObjectURL(photo)} className="orderimg" alt="Uploaded" />
            ) : (
              <img src={img} className="orderimg" alt="Default" />
            )}
          </div>
          <div className="admin_detail">
            <h2>{userData.username} </h2>
            <p>{userData.email} - Administrator</p>
            <div className="edit_photo">
              <label htmlFor="file-upload" className="file-upload">
                photo Upload
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} />
              {saveimg && <button onClick={handleSave}>Save</button>}
            </div>
          </div>
          
        </div>
        <div>
          <div className="detail_accunt">
            <h2>Account Details</h2>
         
            <form className="formSection">
            <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Username</label>
            </div>
            <div className="col-75">
            {userData && <input type="text" value={userData.username}  readOnly />}

            </div>
           </div>

           <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Email</label>
            </div>
            <div className="col-75">
            {userData && <input type="text" value={userData.email}  readOnly />}
            </div>
           </div>
           <div className="row">
              <div className="col-25">
                <label htmlFor="">Role</label>
              </div>
              <div className="col-75">
              {userData && (
                  <select name="role" value={userData.role} > 
                    <option value="role">Role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                )}
              </div>
            </div>

           <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Password </label>
            </div>
            <div className="col-75">
            <input
                type="text" />
            </div>
           </div>

           <div className="row">
            <div className="col-25">
              <label htmlFor="productName">Full Name</label>
            </div>
            <div className="col-75">
              <input
                type="text" />
            </div>
           </div>

       

           <div className="row">
            <div className="col-25">
              <label htmlFor="">Phone Number</label>
            </div>
            <div className="col-75">
              <input
                type="tel" />
            </div>
           </div>
           

           <div className="update_btn">
            <button className="btnUP" type="submit"  onClick={() => handleUpdate(id)}>
              Update Profile
            </button>
          </div>

            </form>
          </div>
          </div>
      </div>
    </div>
  );
};
export default AdminProfile;
