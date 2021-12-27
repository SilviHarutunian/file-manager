import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useParams } from "react-router";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation } from "react-router-dom";

import AddElements from "../../store/Store";

import { Styled } from "./styled";

const PathContainer = observer(() => {
  const location = useLocation();
  const { folderId, fileId } = useParams();
  const [isFolder, setIsFolder] = useState(false);
  const [isFile, setIsFile] = useState(false);
  const [hasParent, setHasParent] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [currentElemId, setCurrentElemId] = useState("");
  const [parentElem, setParentElem] = useState("");
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    if (location.pathname !== "/home") {
      const currentEl = AddElements.allElements.filter(
        (element) => element.id === (folderId !== undefined ? folderId : fileId)
      )[0];

      if (currentEl !== undefined) {
        if (currentEl.type === "folder") {
          setIsFolder(true);
        } else if (currentEl.type === "textFile") {
          setIsFile(true);
        }

        setCurrentLocation(currentEl.name);
        setCurrentElemId(currentEl.id);
      }
    }

    const currentElement = AddElements.allElements.filter(
      (element) => element.id === currentElemId
    )[0];

    if (currentElement !== undefined && currentElement.parentId !== "0") {
      const parentElement = AddElements.allElements.filter(
        (element) => element.id === currentElement.parentId
      )[0];
      setHasParent(true);
      setParentElem(parentElement.name);
      setParentId(parentElement.id);
    }
  }, [location.pathname, folderId, fileId, currentElemId]);

  return (
    <Styled.PathContainer>
      <Breadcrumbs aria-label="breadcrumb">
        <Styled.SLink underline="hover" color="inherit" href="/home">
          <HomeIcon
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          Home
        </Styled.SLink>
        {hasParent && (
          <Styled.SLink
            underline="hover"
            color="inherit"
            href={`/home/folder/${parentId}`}
          >
            <FolderIcon
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            {parentElem}
          </Styled.SLink>
        )}
        {location.pathname !== "/home" && location.pathname !== "/trash" && (
          <Typography color="inherit" style={{ display: "flex" }}>
            {isFolder && (
              <FolderIcon
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
            )}
            {isFile && (
              <TextSnippetIcon
                style={{ width: "20px", height: "20px", marginRight: "5px" }}
              />
            )}
            {currentLocation}
          </Typography>
        )}
        {location.pathname === "/trash" && (
          <Typography color="inherit" style={{ display: "flex" }}>
            <DeleteIcon
              style={{ width: "20px", height: "20px", marginRight: "5px" }}
            />
            Trash
          </Typography>
        )}
      </Breadcrumbs>
    </Styled.PathContainer>
  );
});

export default PathContainer;
