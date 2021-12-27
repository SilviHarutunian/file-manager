import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { addDoc, deleteDoc, doc, getDoc } from "firebase/firestore";

import { IElementType } from "../../interfaces/interface";
import { db } from "../../firebase";
import { trashElementsRef } from "../../api/api";
import Folder from "../../components/folder/Folder";
import TextFile from "../../components/textFile/TextFile";
import PathContainer from "../../components/pathContainer/PathContainer";
import OptionsContainer from "../../components/options/OptionsContainer";
import AddElements from "../../store/Store";
import DeleteModal from "../../components/deleteModal/DeleteModal";

import { Styled } from "./styled";

const FilesContainer = observer(() => {
  const navigate = useNavigate();
  const [isTrashed, setIsTrashed] = useState(false);
  const [clickDelete, setClickDelete] = useState(false);
  const [currentElement, setCurrentElement] = useState("");

  const { folderId } = useParams();

  const handleClickDelete = (id: string) => {
    setClickDelete(true);
    setCurrentElement(id);
  };

  const handleMoveTrash = async (elemId: string) => {
    setClickDelete(false);
    setIsTrashed(true);

    AddElements.moveElementTrash(elemId);

    const docRef = doc(db, "allElements", elemId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();

      await addDoc(trashElementsRef, {
        name: documentData.name,
        type: documentData.type,
        parentId: documentData.parentId,
        content:
          documentData.content !== undefined ? documentData.content : null,
      });
    } else {
      alert("No such document!");
    }

    await deleteDoc(docRef);
  };

  const handleOpenELement = (element: IElementType) => {
    if (element.type === "folder") {
      navigate(`/home/folder/${element.id}`);
    } else {
      navigate(`/home/file/${element.id}`);
    }
  };

  const handleCloseDeleteModal = () => {
    setClickDelete(false);
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

    setIsTrashed(false);
  };

  return (
    <>
      <OptionsContainer inFilePage={false} inTrash={false} />
      <PathContainer />
      <Styled.FilesContainer>
        {AddElements.allElements
          .filter(
            (element) =>
              element.parentId === (folderId !== undefined ? folderId : "0")
          )
          .map((element) => {
            return (
              <span key={element.name}>
                {element.type === "folder" ? (
                  <Folder
                    onDoubleClick={() => handleOpenELement(element)}
                    name={element.name}
                    onDelete={() => handleClickDelete(element.id)}
                    id={element.id}
                  />
                ) : (
                  <TextFile
                    onDoubleClick={() => handleOpenELement(element)}
                    name={element.name}
                    onDelete={() => handleClickDelete(element.id)}
                    id={element.id}
                    content={element.content}
                  />
                )}
                {clickDelete && (
                  <DeleteModal
                    open={true}
                    moveTrash={() => handleMoveTrash(currentElement)}
                    onCancel={handleCloseDeleteModal}
                  />
                )}
              </span>
            );
          })}
        <Snackbar
          open={isTrashed}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="success" onClose={handleClose}>
            Moved to Trash!
          </Alert>
        </Snackbar>
      </Styled.FilesContainer>
    </>
  );
});

export default FilesContainer;
