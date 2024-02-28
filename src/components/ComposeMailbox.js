import React, { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import './ComposeMailbox.css'

const ComposeMailbox = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const handleSend = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = convertToRaw(contentState);

    console.log("To:", to);
    console.log("Subject:", subject);
    console.log("Message:", rawContent.blocks[0].text);
  };

  return (
    <div className="compose-mailbox">
      <div className="compose-header">
        <div className="compose-header-left">
          <h2>New message</h2>
          {/* Close, Resize, Minimize symbols can be added here */}
        </div>
      </div>
      <div className="compose-body">
        <div>
          <label htmlFor="to">To:</label>
          <input
            type="text"
            id="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <Editor
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: [
                'inline', 'blockType', 'fontSize', 'fontFamily', 'list',
                'textAlign', 'colorPicker', 'link', 'embedded', 'emoji',
                'remove', 'history'
              ],
            }}
          />
        </div>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ComposeMailbox;
