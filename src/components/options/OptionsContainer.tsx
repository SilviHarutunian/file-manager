import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

import AddFolderModal from "../addElementModals/AddFolderModal";
import AddFileModal from "../addElementModals/AddFileModal";
import AddElements from "../../store/Store";
import { IOptionsContainerType } from "../../interfaces/interface";

import { Styled } from "./styled";

const OptionsContainer = observer((props: IOptionsContainerType) => {
  const navigate = useNavigate();

  const handleAddFolder = () => {
    AddElements.showFolderPopUp();
  };

  const handleAddFile = () => {
    AddElements.showFilePopUp();
  };

  const handleOpenTrash = () => {
    navigate("/trash");
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <>
      <Styled.OptionsContainer>
        {props.inFilePage || props.inTrash ? (
          <Styled.StyledButton
            style={{ position: "absolute", left: "217px" }}
            variant="contained"
            onClick={handleGoHome}
          >
            Home
          </Styled.StyledButton>
        ) : (
          <>
            <Styled.StyledButton variant="contained" onClick={handleGoHome}>
              Home
            </Styled.StyledButton>

            <Styled.SButtonGroup variant="contained">
              <Styled.StyledButton onClick={handleAddFolder}>
                +Add Folder
              </Styled.StyledButton>
              <Styled.StyledButton onClick={handleAddFile}>
                +Add File
              </Styled.StyledButton>
              <Styled.StyledButton onClick={handleOpenTrash}>
                Trash
              </Styled.StyledButton>
            </Styled.SButtonGroup>
          </>
        )}
      </Styled.OptionsContainer>
      {AddElements.folderPopUp && <AddFolderModal />}
      {AddElements.filePopUp && <AddFileModal />}
    </>
  );
});

export default OptionsContainer;
