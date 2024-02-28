import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import "./EmailRow.css";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from "react-router-dom";
import { selectMail } from "../../features/mailSlice";
import { useDispatch } from "react-redux";
import { db } from "../../firebase";

function EmailRow({ id, title, subject, description, time, isRead }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userEmail = localStorage.getItem('email')

  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        isRead,
        time,
      })
    );

    db.collection(userEmail).doc(id).update({
      isRead: true
    })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    navigate("/mail");
  };


  const deleteEmail = (id) => {
    // Access the Firebase Firestore collection and delete the document by its ID
    db.collection(userEmail).doc(id).delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }



  return (
    <div className="emailRow-container">
      <Checkbox />
      <div onClick={openMail} className="emailRow">
        <div className="emailRow-options">
          <IconButton className={!isRead ? 'active' : 'inactive'}>
            <FiberManualRecordIcon />
          </IconButton>
          <IconButton>
            <LabelImportantOutlinedIcon />
          </IconButton>
        </div>
        <h3 className="emailRow-title">{title}</h3>
        <div className="emailRow-message">
          <h4>
            {subject}{" "}
            <span className="emailRow-description"> - {description}</span>
          </h4>
        </div>
        <p className="emailRow-time">{time}</p>

        {/* <button onClick={() => updateSubject(id)}>Update</button> */}
      </div>
      <IconButton onClick={() => deleteEmail(id)}><DeleteIcon /></IconButton>
    </div>
  );
}

export default EmailRow;
