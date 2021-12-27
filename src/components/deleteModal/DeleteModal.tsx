import { IDeleteModalType } from "../../interfaces/interface";

import { Styled } from "./styled";

const DeleteModal = (props: IDeleteModalType) => {
  return (
    <Styled.DeleteModal open sx={{ left: "35%", top: "20%" }}>
      <Styled.DeleteBox>
        <p>Are you sure you want to delete?</p>
        <Styled.ButtonContainer>
          <Styled.StyledButton variant="contained" onClick={props.moveTrash}>
            Yes
          </Styled.StyledButton>
          <Styled.StyledButton variant="contained" onClick={props.onCancel}>
            No
          </Styled.StyledButton>
        </Styled.ButtonContainer>
      </Styled.DeleteBox>
    </Styled.DeleteModal>
  );
};

export default DeleteModal;
