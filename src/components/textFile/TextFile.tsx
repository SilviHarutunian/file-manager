import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateDoc, doc } from "firebase/firestore";

import AddElements from "../../store/Store";
import { db } from "../../firebase";
import TextEditor from "../textEditor/TextEditor";
import { ITextFileType } from "../../interfaces/interface";

import { Styled, inputStyle } from "./styled";

const schema = yup.object().shape({
  fileName: yup.string().required(),
});

const TextFile = observer((props: ITextFileType) => {
  const [editFile, setEditFile] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorElement, setAnchorElement] = useState<SVGSVGElement | null>(
    null
  );

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [name, setName] = useState(props.name);
  const [content, setContent] = useState(props.content);

  const onSubmit = () => handleSaveChanges(props.id);

  const handleClick = (
    event: React.SyntheticEvent<SVGSVGElement, MouseEvent>
  ) => {
    event?.stopPropagation();
    setAnchorElement(event.currentTarget);

    if (openSettings === false) {
      setOpenSettings(true);
    } else {
      setOpenSettings(false);
    }
  };

  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  const handleShowInfo = () => {
    setEditFile(true);
    setOpenSettings(false);
  };

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("fileName");
    setName(event.target.value);
  };

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  const handleSaveChanges = async (id: string) => {
    const elementDoc = doc(db, "allElements", id);
    const newFields = { name, content };

    AddElements.editElement(id, name, content);
    setEditFile(false);

    await updateDoc(elementDoc, newFields);
  };

  const handleClosePopUp = () => {
    if (editFile) {
      setEditFile(false);
    }
    clearErrors("fileName");
  };

  return (
    <>
      <Styled.ElementView key={props.id} onDoubleClick={props.onDoubleClick}>
        <TextSnippetIcon color="success" />
        <p>
          {props.name}
          <MoreVertIcon color="disabled" onClick={handleClick} />
        </p>
        {openSettings ? (
          <Styled.SMenu
            open
            anchorEl={anchorElement}
            onClose={handleCloseSettings}
          >
            <MenuItem onClick={handleShowInfo}>Edit</MenuItem>
            <MenuItem onClick={props.onDelete}>Delete</MenuItem>
          </Styled.SMenu>
        ) : null}
      </Styled.ElementView>
      <Styled.SModal open={editFile}>
        <Styled.SBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Styled.STextField
              {...register("fileName")}
              onChange={handleUpdateInput}
              name="fileName"
              type="text"
              variant="outlined"
              color="primary"
              label={"File name"}
              sx={{ inputStyle }}
              defaultValue={props.name}
              error={errors.fileName}
            />
            <p style={{ color: "red" }}>
              {errors.fileName && "File name is required!"}
            </p>
            <TextEditor
              content={props.content}
              onChangeContent={handleChangeContent}
            />
            <Styled.ButtonContainer>
              {errors.fileName ? (
                <Styled.StyledButton disabled>Save Changes</Styled.StyledButton>
              ) : (
                <Styled.StyledButton type="submit" variant="contained">
                  Save Changes
                </Styled.StyledButton>
              )}

              <Styled.StyledButton
                variant="contained"
                onClick={handleClosePopUp}
              >
                Cancel
              </Styled.StyledButton>
            </Styled.ButtonContainer>
          </form>
        </Styled.SBox>
      </Styled.SModal>
    </>
  );
});

export default TextFile;
