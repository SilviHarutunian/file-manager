import Menu from "@mui/material/Menu";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";

import { styled } from "@mui/styles";

const ElementView = styled(Box)({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  alignItems: "center",
  margin: "15px",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#6699cc",
  },
});

const SMenu = styled(Menu)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const SModal = styled(Modal)({
  display: "flex",
  position: "absolute",
  width: "400px",
  minHeight: "250px",
  maxHeight: "400px",
  flexDirection: "column",
  backgroundColor: "#6699CC",
  border: "2px solid #000099",
  margin: "9% auto",
});

const SBox = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "20px",
  backgroundColor: "#6699CC",
});

const STextField = styled(TextField)({
  width: "100%",
  height: "50px",
  borderRadius: "4px",
  border: "none",
  padding: "5px",
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
  width: "150px",
  height: "40px",
  cursor: "pointer",
  backgroundColor: "white",

  "&:hover": {
    color: "#002D62",
  },
});

export const Styled = {
  ElementView,
  SMenu,
  SModal,
  SBox,
  STextField,
  ButtonContainer,
  StyledButton,
};

export const inputStyle = {
  marginTop: "15px",
  marginBottom: "15px",
};
