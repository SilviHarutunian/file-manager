import { useState, useEffect } from "react";

import AddElements from "../store/Store";
import Router from "../routes/Router";
import { IElementType } from "../interfaces/interface";
import { getElements, getTrashedElements } from "../api/api";

import { Styled } from "./styled";

const App = () => {
  const [elements, setElements] = useState<IElementType[]>([]);
  const [trashElements, setTrashElements] = useState<IElementType[]>([]);

  useEffect(() => {
    getElements().then((data) => setElements(data));

    getTrashedElements().then((data) => setTrashElements(data));
  }, []);

  AddElements.setAllElementsData(elements);
  AddElements.setTrashElementsData(trashElements);

  return (
    <>
      <Styled.GlobalStyle />
      <Styled.FileManagerContainer>
        <Router />
      </Styled.FileManagerContainer>
    </>
  );
};

export default App;
