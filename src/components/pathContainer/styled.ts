import { styled } from "@mui/styles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";

const PathContainer = styled(Box)({
  display: "flex",
  width: "100%",
  height: "50px",
  padding: "0 30px",
  alignItems: "center",
  borderBottom: "2px solid #000099",
});

const SLink = styled(Link)({
  display: "flex",
});

export const Styled = {
  PathContainer,
  SLink,
};
