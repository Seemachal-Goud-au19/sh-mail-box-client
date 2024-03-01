import { Checkbox, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./EmailList.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RedoIcon from "@mui/icons-material/Redo";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from '@mui/icons-material/Mail';
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from '@mui/icons-material/Delete';
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import EmailRow from "../EmailRow/EmailRow";
import { db } from "../../firebase";

function EmailList({ emails, type }) {

  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmails, setSelectedEmails] = useState([]);

  const userEmail = localStorage.getItem('email')

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedEmails(selectAll ? [] : emails.map(email => email.id));
  };

  const handleSelectEmail = (id) => {
    setSelectedEmails(selectedEmails.includes(id)
      ? selectedEmails.filter(emailId => emailId !== id)
      : [...selectedEmails, id]);
  };

  const handleDeleteSelectedEmails = () => {
    selectedEmails.forEach(emailId => {
      db.collection(type === 'sent' ? `${userEmail}sent` : userEmail).doc(emailId).delete()
        .then(() => {
          console.log(`Email with ID ${emailId} successfully deleted!`);
        })
        .catch((error) => {
          console.error(`Error removing email with ID ${emailId}: `, error);

        });
    });
  };


  return (
    <div className="emailList">
      <div className="emailList-settings">
        <div className="emailList-settingsLeft">
          <Checkbox
            checked={selectAll}
            onChange={toggleSelectAll}
            className="global-checkbox"
          />
          {selectedEmails.length > 0 && <IconButton onClick={handleDeleteSelectedEmails}><DeleteIcon /></IconButton>}

          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
        </div>
        <div className="emailList-settingsRight">
          <MailIcon />
          <p>{emails.length}</p>
        </div>

      </div>
      <div className="emailList-list">
        {emails.map(({ id, data: { from, to, subject, message, isRead, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={type === "sent" ? to : from}
            subject={subject}
            description={message}
            isRead={isRead}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
            type={type}
            onSelect={handleSelectEmail}
            isSelected={selectedEmails.includes(id)}
          />
        ))}

      </div>
    </div>
  );
}

export default EmailList;
