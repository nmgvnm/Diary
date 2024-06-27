import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const DailyEdit = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  console.log("editorState:", editorState);

  return (
    <Editor
      editorState={editorState}
      wrapperClassName="diary-editor-wrapper"
      editorClassName="diary-editor"
      onEditorStateChange={onEditorStateChange}
    />
  );
};

export default DailyEdit;
