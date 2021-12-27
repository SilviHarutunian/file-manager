import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteDoc, doc, getDoc, addDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { allElementsRef } from "../../api/api";
import OptionsContainer from "../../components/options/OptionsContainer";
import PathContainer from "../../components/pathContainer/PathContainer";
import AddElements from "../../store/Store";

import { Styled } from "./styled";

const Trash = observer(() => {
  const [isRestored, setIsRestored] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [inTrash, setInTrash] = useState(false);

  useEffect(() => {
    setInTrash(true);
  }, []);

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

    setIsRestored(false);
  };

  const handleRestoreElement = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();

    const docRef = doc(db, "trashElements", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const documentData = docSnap.data();

      await addDoc(allElementsRef, {
        name: documentData.name,
        type: documentData.type,
        parentId: documentData.parentId,
        content:
          documentData.content !== undefined ? documentData.content : null,
      });
    } else {
      console.log("No such document!");
    }

    AddElements.restoreElement(id);
    setIsRestored(true);
    await deleteDoc(docRef);
  };

  const handleDeleteElement = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
    id: string
  ) => {
    event.stopPropagation();
    const elementDoc = doc(db, "trashElements", id);

    AddElements.deleteElement(id);
    setIsDeleted(true);
    await deleteDoc(elementDoc);
  };

  return (
    <>
      {inTrash && <OptionsContainer inTrash={true} />}
      <PathContainer />
      <Styled.TrashContainer>
        {AddElements.trashElements.map((trashElement) => (
          <Styled.ElementView key={trashElement.id}>
            {trashElement.type === "folder" ? (
              <FolderIcon color="secondary" />
            ) : (
              <TextSnippetIcon color="success" />
            )}
            <p>
              {trashElement.name}
              <RestoreFromTrashIcon
                color="disabled"
                onClick={(e) => handleRestoreElement(e, trashElement.id)}
              />
              <DeleteForeverIcon
                color="disabled"
                onClick={(e) => handleDeleteElement(e, trashElement.id)}
              />
            </p>
          </Styled.ElementView>
        ))}
        <Snackbar
          open={isRestored}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="success" onClose={handleClose}>
            Restored!
          </Alert>
        </Snackbar>
        <Snackbar
          open={isDeleted}
          autoHideDuration={3000}
          onClose={handleClose}
        >
          <Alert severity="success" onClose={handleClose}>
            Deleted!
          </Alert>
        </Snackbar>
      </Styled.TrashContainer>
    </>
  );
});

export default Trash;
