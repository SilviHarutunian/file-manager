import { styled } from "@mui/styles";
import { Button } from "@material-ui/core";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";

const SModal = styled(Modal)({
  display: "flex",
  width: "400px",
  minHeight: "250px",
  maxHeight: "550px",
  flexDirection: "column",
  backgroundColor: "#6699CC",
  border: "2px solid #000099",
  margin: "8% auto",
});

const SBox = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "15px",
  backgroundColor: "#6699CC",
});

const STextField = styled(TextField)({
  width: "100%",
  height: "50px",
  borderRadius: "4px",
  border: "none",
  padding: "5px",
});

const STextarea = styled(TextareaAutosize)({
  width: "100%",
  padding: "5px",
  marginTop: "30px",
  borderRadius: "5px",
});

const ButtonContainer = styled(Box)({
  width: "100%",
  height: "80px",
  padding: "15px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "20px",
});

const StyledButton = styled(Button)({
  width: "140px",
  height: "40px",
  cursor: "pointer",
  backgroundColor: "white",

  "&:hover": {
    color: "#002D62",
  },
});

export const Styled = {
  SModal,
  SBox,
  ButtonContainer,
  STextField,
  STextarea,
  StyledButton,
};

export const inputStyle = {
  marginTop: "15px",
  marginBottom: "15px",
};
