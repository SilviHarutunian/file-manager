import { styled } from "@mui/styles";
import { Button } from "@material-ui/core";
import Box from "@mui/material/Box";
import { ButtonGroup } from "@mui/material";

const OptionsContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "70px",
  backgroundColor: "#89CFF0",
  justifyContent: "space-around",
  alignItems: "center",
  borderBottom: "2px solid #000099",
});

const SButtonGroup = styled(ButtonGroup)({
  justifyItems: "space-between",
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
  StyledButton,
  OptionsContainer,
  SButtonGroup,
};
