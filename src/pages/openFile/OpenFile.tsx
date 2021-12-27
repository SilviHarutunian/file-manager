import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import PathContainer from "../../components/pathContainer/PathContainer";
import OptionsContainer from "../../components/options/OptionsContainer";
import AddElements from "../../store/Store";
import TextEditor from "../../components/textEditor/TextEditor";

import { Styled } from "./styled";

const OpenFile = observer(() => {
  const navigate = useNavigate();
  const { fileId } = useParams();

  const currentFile = AddElements.allElements.find(
    (element) => element.id === fileId
  );

  if (currentFile == null || fileId == null) {
    return null;
  }

  const [name, setFileName] = useState(currentFile.name);
  const [content, setContent] = useState<string | undefined>(currentFile.content);

  const handleCancelChanges = () => {
    if (currentFile.parentId === "0") {
      navigate("/home");
    } else {
      navigate(`/home/folder/${currentFile.parentId}`);
    }
  };

  const handleUpdateFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleSaveChanges = () => {
    AddElements.editElement(fileId, name, content);

    if (currentFile.parentId === "0") {
      navigate("/home");
    } else {
      navigate(`/home/folder/${currentFile.parentId}`);
    }
  };

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  return (
    <>
      {!fileId && <OptionsContainer inFilePage={true} />}
      <PathContainer />

      <Styled.FileContainer>
        <Styled.FileTextField
          defaultValue={currentFile.name}
          onChange={handleUpdateFileName}
        />
        <TextEditor
          content={currentFile.content}
          onChangeContent={handleChangeContent}
        />
        <Styled.ButtonContainer>
          <Styled.SButton onClick={handleSaveChanges}>
            Save Changes
          </Styled.SButton>
          <Styled.SButton onClick={handleCancelChanges}>Cancel</Styled.SButton>
        </Styled.ButtonContainer>
      </Styled.FileContainer>
    </>
  );
});

export default OpenFile;
