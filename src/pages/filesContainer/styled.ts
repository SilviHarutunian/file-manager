import { styled } from "@mui/styles";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";

const FilesContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "900px",
  flexWrap: "wrap",
  alignItems: "flex-start",
});

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

const StyledButton = styled(Button)({
  width: "140px",
  height: "40px",
  cursor: "pointer",
  margin: "10px",

  "&:hover": {
    color: "#002D62",
  },
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

export const Styled = {
  FilesContainer,
  ElementView,
  StyledButton,
  ButtonContainer,
};
