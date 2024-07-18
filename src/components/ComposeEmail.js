import React, { useState } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const ComposeEmail = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSend = () => {
    const contentState = editorState.getCurrentContent();
    const rawContent = JSON.stringify(convertToRaw(contentState));
    const emailData = {
      to,
      cc,
      bcc,
      subject,
      body: rawContent,
    };
    // send email logic here
  };

  return (
    <div className="w-11/12 m-auto rounded  sm:w-auto sm:mx-2">
      <div className="p-1 bg-blue-600 text-white flex justify-between">
        <span>New Message</span>
        <button className="mr-2">✕</button>
      </div>
      <div className="min-h-96 p-1 flex flex-col border rounded-b">
        <div className="border-b p-1 flex items-center">
          <label className="text-sm font-semibold text-slate-600" htmlFor="from">
            From:
          </label>
          <input
            className="px-2 flex-1 focus:outline-none"
            type="text"
            id="from"
            readOnly
            value="aman@gmail.com"
          />
        </div>
        <div className="border-b flex p-1 items-center">
          <label className="font-semibold text-sm text-slate-600" htmlFor="email">
            To:
          </label>
          <input
            className="flex-1 px-2 focus:outline-none"
            type="email"
            id="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <div className="text-slate-400 text-sm ml-2 flex">
            <span className="mr-1 cursor-pointer" onClick={() => setCc(!cc)}>
              Cc
            </span>
            <span className="cursor-pointer" onClick={() => setBcc(!bcc)}>
              Bcc
            </span>
          </div>
        </div>
        {cc && (
          <div className="border-b flex p-1 items-center">
            <label className="font-semibold text-sm text-slate-600" htmlFor="cc">
              Cc:
            </label>
            <input
              className="flex-1 px-2 focus:outline-none"
              type="email"
              id="cc"
              value={cc}
              onChange={(e) => setCc(e.target.value)}
            />
          </div>
        )}
        {bcc && (
          <div className="border-b flex p-1 items-center">
            <label className="font-semibold text-sm text-slate-600" htmlFor="bcc">
              Bcc:
            </label>
            <input
              className="flex-1 px-2 focus:outline-none"
              type="email"
              id="bcc"
              value={bcc}
              onChange={(e) => setBcc(e.target.value)}
            />
          </div>
        )}
        <div className="border-b p-1 flex items-center">
          <label className="text-sm font-semibold text-slate-600" htmlFor="subject">
            Subject:
          </label>
          <input
            className="flex-1 px-2 focus:outline-none"
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="rdw-editor-wrapper border rounded mt-2">
          <Editor
            editorState={editorState}
            toolbarClassName="rdw-editor-toolbar"
            wrapperClassName="rdw-editor-wrapper"
            editorClassName="rdw-editor-main"
            onEditorStateChange={handleEditorChange}
            toolbar={{
              options: ["inline", "blockType", "fontSize", "list", "textAlign", "colorPicker", "link", "embedded", "emoji", "image", "remove", "history"],
            }}
          />
        </div>
        <div className="flex justify-end mt-2">
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;
