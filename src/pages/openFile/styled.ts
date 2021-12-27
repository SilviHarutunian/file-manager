import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";

import { styled } from "@mui/styles";

const FileContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "900px",
  padding: "15px",
});

const FileTextField = styled(TextField)({
  width: "100%",
  height: "80px",
  borderRadius: "4px",
  border: "none",
  padding: "5px",
});

const FileTextArea = styled(TextareaAutosize)({
  width: "100%",
  height: "400px",
  borderRadius: "4px",
  border: "none",
  padding: "10px",
});

const ButtonContainer = styled(Box)({
  width: "100%",
  height: "80px",
  padding: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "75px",
});

const SButton = styled(Button)({
  width: "140px",
  height: "40px",
  cursor: "pointer",
  backgroundColor: "#6699CC",

  "&:hover": {
    color: "#002D62",
  },
});

export const Styled = {
  FileContainer,
  FileTextField,
  FileTextArea,
  ButtonContainer,
  SButton,
};
