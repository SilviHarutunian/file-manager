import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc } from "firebase/firestore";

import { allElementsRef } from "../../api/api";
import TextEditor from "../textEditor/TextEditor";
import AddElements from "../../store/Store";

import { Styled, inputStyle } from "./styled";

const schema = yup.object().shape({
  fileName: yup.string().required(),
});

const AddFileModal = () => {
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
  const [content, setContent] = useState("");

  const handleFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearErrors("fileName");
    setName(event.target.value);
  };

  const handleChangeContent = (content: string) => {
    setContent(content);
  };

  const handleSaveElement = async () => {
    const duplicatedIndex = AddElements.allElements.findIndex(
      (element) => element.name === name && element.type === "textFile"
    );
    if (duplicatedIndex > -1) {
      setIsDuplicated(true);
    } else {
      AddElements.showFilePopUp();

      const newFile = await addDoc(allElementsRef, {
        name: name,
        parentId: folderId === undefined ? "0" : folderId,
        type: "textFile",
        content: content,
      });

      AddElements.addElement({
        id: newFile.id,
        name: name,
        type: "textFile",
        parentId: folderId === undefined ? "0" : folderId,
        content: content,
      });
    }
  };

  const handleClosePopUp = () => {
    AddElements.showFilePopUp();
    clearErrors("fileName");
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
                {...register("fileName")}
                onChange={handleFileName}
                name="fileName"
                value={name}
                label="Text file name"
                sx={{ inputStyle }}
                error={errors.fileName}
              />
              <p style={{ color: "red" }}>
                {errors.fileName && "The name field is required!"}
              </p>

              <TextEditor
                content={content}
                onChangeContent={handleChangeContent}
              />
            </>
            <Styled.ButtonContainer>
              {errors.fileName ? (
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

export default AddFileModal;
