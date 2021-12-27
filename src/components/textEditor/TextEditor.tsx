import React, { useState } from "react";
import { convertToRaw, EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import { stateFromHTML } from "draft-js-import-html";

import { ITextEditorType } from "../../interfaces/interface";

import { Styled, wrapperStyle, editorStyle, toolbarStyle } from "./styled";

const TextEditor = (props: ITextEditorType) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createWithContent(stateFromHTML(props.content!))
  );

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const newContent = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );
    props.onChangeContent(newContent);
  };

  return (
    <React.Fragment>
      <Styled.EditorContainer>
        <Editor
          defaultEditorState={editorState}
          wrapperStyle={wrapperStyle}
          editorStyle={editorStyle}
          toolbarStyle={toolbarStyle}
          editorClassName="demo-editor"
          onEditorStateChange={onEditorStateChange}
        />
      </Styled.EditorContainer>
    </React.Fragment>
  );
};

export default TextEditor;
