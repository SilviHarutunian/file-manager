import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc } from "firebase/firestore";

import { allElementsRef } from "../../api/api";
import AddElements from "../../store/Store";

import { Styled, inputStyle } from "./styled";

const schema = yup.object().shape({
  folderName: yup.string().required(),
});

const AddElementModal = () => {
  const [isDuplicated, setIsDuplicated] = useState(false);
  const { folderId } = useParams();
  const {
    handleSubmit,
    register,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = () => handleSaveElement();

  const [name, setName] = useState("");

  const handleFolderName = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("folderName");
    setName(event.target.value);
  };

  const handleSaveElement = async () => {
    const duplicatedIndex = AddElements.allElements.findIndex(
      (element) => element.name === name && element.type === "folder"
    );
    if (duplicatedIndex > -1) {
      setIsDuplicated(true);
    } else {
      AddElements.showFolderPopUp();

      const newFolder = await addDoc(allElementsRef, {
        name: name,
        parentId: folderId === undefined ? "0" : folderId,
        type: "folder",
      });

      AddElements.addElement({
        id: newFolder.id,
        name: name,
        type: "folder",
        parentId: folderId === undefined ? "0" : folderId,
      });
    }
  };

  const handleClosePopUp = () => {
    AddElements.showFolderPopUp();

    clearErrors("folderName");
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
      <Styled.SModal open>
        <Styled.SBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            <>
              <Styled.STextField
                {...register("folderName")}
                onChange={handleFolderName}
                name="folderName"
                value={name}
                label="Folder name"
                sx={{ inputStyle }}
                error={errors.folderName}
              />
              <p style={{ color: "red" }}>
                {errors.folderName && "The name field is required!"}
              </p>
            </>
            <Styled.ButtonContainer>
              {errors.folderName ? (
                <Styled.StyledButton disabled>Save</Styled.StyledButton>
              ) : (
                <Styled.StyledButton type="submit" variant="contained">
                  Save
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
};

export default AddElementModal;
