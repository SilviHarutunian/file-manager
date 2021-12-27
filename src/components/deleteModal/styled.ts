import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";

import { styled } from "@mui/styles";

const DeleteModal = styled(Modal)({
  display: "flex",
  position: "absolute",
  width: "500px",
  height: "150px",
  flexDirection: "column",
  backgroundColor: "#6699CC",
  border: "2px solid #000099",
});

const DeleteBox = styled(Box)({
  width: "100%",
  height: "100%",
  padding: "15px",
  backgroundColor: "#6699CC",
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
  DeleteModal,
  DeleteBox,
  ButtonContainer,
  StyledButton,
};
