import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import FolderIcon from "@mui/icons-material/Folder";
import { useForm } from "react-hook-form";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { updateDoc, doc } from "firebase/firestore";

import AddElements from "../../store/Store";
import { db } from "../../firebase";
import { IFolderType } from "../../interfaces/interface";

import { Styled, inputStyle } from "./styled";

const schema = yup.object().shape({
  folderName: yup.string().required(),
});

const FolderView = observer((props: IFolderType) => {
  const [openSettings, setOpenSettings] = useState(false);
  const [anchorElement, setAnchorElement] = useState<SVGSVGElement | null>(
    null
  );
  const [editFolder, setEditFolder] = useState(false);
  const [isDuplicated, setIsDuplicated] = useState(false);

  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [name, setName] = useState(props.name);

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
    setEditFolder(true);
    setOpenSettings(false);
  };

  const handleUpdateInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("folderName");
    setName(event.target.value);
  };

  const handleClosePopUp = () => {
    if (editFolder) {
      setEditFolder(false);
    }
    clearErrors("folderName");
  };

  const handleSaveChanges = async (id: string) => {
    const elementDoc = doc(db, "allElements", id);
    const newFields = { name };

    AddElements.editName(id, name);

    await updateDoc(elementDoc, newFields);

    setEditFolder(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setIsDuplicated(false);
  };

  return (
    <>
      <Styled.ElementView key={props.id} onDoubleClick={props.onDoubleClick}>
        <FolderIcon color="secondary" />

        <p>
          {props.name}
          <MoreVertIcon color="disabled" onClick={handleClick} />
        </p>
        {openSettings ? (
          <Styled.SMenu
            anchorEl={anchorElement}
            open={openSettings}
            onClose={handleCloseSettings}
          >
            <MenuItem onClick={handleShowInfo}>Edit</MenuItem>
            <MenuItem onClick={props.onDelete}>Delete</MenuItem>
          </Styled.SMenu>
        ) : null}
      </Styled.ElementView>
      <Styled.SModal open={editFolder}>
        <Styled.SBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Styled.STextField
              {...register("folderName")}
              onChange={handleUpdateInput}
              name="folderName"
              type="text"
              variant="outlined"
              color="primary"
              label={"Folder name"}
              sx={{ inputStyle }}
              defaultValue={props.name}
              error={errors.folderName}
            />
            <p style={{ color: "red" }}>
              {errors.folderName && "Folder name is required!"}
            </p>
            <Styled.ButtonContainer>
              {errors.folderName ? (
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
      <Snackbar
        open={isDuplicated}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          This name already exists! Please choose another name!
        </Alert>
      </Snackbar>
    </>
  );
});

export default FolderView;
