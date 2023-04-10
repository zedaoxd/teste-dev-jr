import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  From,
  Header,
  ContainerTelefoneData,
  ContainerButtonsFrom,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const ModalInserir = ({ handleClose, open }: Props) => {
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
        <From>
          <div>
            <label htmlFor="nome">Nome: *</label>
            <input type="text" name="nome" id="nome" />
          </div>

          <div>
            <label htmlFor="email">E-mail: *</label>
            <input type="email" name="email" id="email" />
          </div>

          <ContainerTelefoneData>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" name="telefone" id="telefone" />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <input type="date" name="dataNascimento" id="dataNascimento" />
            </div>
          </ContainerTelefoneData>

          <div>
            <label htmlFor="cidadeNascimento">Cidade onde nasceu:</label>
            <input type="text" name="cidadeNascimento" id="cidadeNascimento" />
          </div>

          <ContainerButtonsFrom>
            <button type="reset">
              <CleaningServicesIcon />
              <span>Limpar</span>
            </button>
            <button type="submit">
              <SaveIcon />
              <span>Salvar</span>
            </button>
          </ContainerButtonsFrom>
        </From>
      </Box>
    </Modal>
  );
};
