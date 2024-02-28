import React, { useState } from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { db } from '../../firebase'
import firebase from 'firebase/compat/app'; import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


function SendMail() {

  const dispatch = useDispatch();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [maximize, setMaximize] = useState(false)


  const userEmail = localStorage.getItem('email')

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };


  const composeSizeHandler = () => {
    setMaximize(!maximize)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);
    try {
      await db.collection(to).add({
        to: to,
        from: userEmail,
        subject: subject,
        message: rawContent.blocks[0].text,
        isRead: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      dispatch(closeSendMessage());
    } catch (error) {
      console.error("Error adding message to collection:", error);

    }
  };

  return (
    <div className={maximize ? "sendMail sendMailMax" : "sendMail"}>
      <div className="sendMail-header">
        <h3>New Message</h3>
        <div>
          {maximize ? <CloseFullscreenIcon onClick={composeSizeHandler} /> : <OpenInFullIcon onClick={composeSizeHandler} />}
          <CloseIcon
            onClick={() => dispatch(closeSendMessage())}
            className="sendMail-close"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          name="to"
          placeholder="To"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />

        <input
          name="subject"
          placeholder="Subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />


        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbar={{
            options: [
              'inline',
              'link', 'embedded'],
            // options: [
            //   'inline', 'blockType', 'fontSize', 'fontFamily', 'list',
            //   'textAlign', 'colorPicker', 'link', 'embedded', 'emoji',
            //   'remove', 'history'
            // ],
          }}
        />

        <div className="sendMail-options">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="sendMail-send"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
