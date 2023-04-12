import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { From, Header, ContainerButtonsFrom } from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import InputMask from "react-input-mask";
import { useModalInserirEmpresa } from "../../../hooks/useModalInserirEmpresa";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const ModalInserir = ({ handleClose, open }: Props) => {
  const { onSubmit, register, isValid, reset, style } = useModalInserirEmpresa({
    handleClose,
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>
          <h2>Inserir</h2>
          <button onClick={handleClose}>
            <CloseIcon />
          </button>
        </Header>
        <From onSubmit={onSubmit}>
          <div>
            <label htmlFor="nome">Nome: *</label>
            <input {...register("nome")} type="text" name="nome" id="nome" />
          </div>

          <div>
            <label htmlFor="cnpj">CNPJ: *</label>
            <InputMask
              {...register("cnpj")}
              mask={"99.999.999/9999-99"}
              type="text"
              name="cnpj"
              id="cnpj"
            />
          </div>

          <ContainerButtonsFrom>
            <button type="reset" onClick={() => reset()}>
              <CleaningServicesIcon />
              <span>Limpar</span>
            </button>
            <button type="submit" disabled={!isValid}>
              <SaveIcon />
              <span>Salvar</span>
            </button>
          </ContainerButtonsFrom>
        </From>
      </Box>
    </Modal>
  );
};
