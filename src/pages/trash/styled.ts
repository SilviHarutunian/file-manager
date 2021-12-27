import { styled } from "@mui/styles";
import Box from "@mui/material/Box";

const TrashContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "900px",
  flexWrap: "wrap",
  alignItems: "flex-start",
});

const ElementView = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "15px",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "#6699cc",
  },
});

export const Styled = {
  TrashContainer,
  ElementView,
};
