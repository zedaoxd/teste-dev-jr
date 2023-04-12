import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  From,
  Header,
  ContainerTelefoneData,
  ContainerButtonsFrom,
  ContainerReactSelect,
} from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { Usuario } from "../../../../@types";
import { useModalEditarUsuario } from "../../../../hooks/useModalEditarUsuario";

type Props = {
  open: boolean;
  handleClose: () => void;
  usuario: Usuario | null;
};

export const ModalEditar = ({ handleClose, open, usuario }: Props) => {
  const {
    style,
    onSubmit,
    register,
    data,
    control,
    reset,
    isValid,
    errorEmpresa,
  } = useModalEditarUsuario({ handleClose, usuario });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Header>
          <h2>Editar</h2>
          <button onClick={handleClose} data-testid="close-modal">
            <CloseIcon />
          </button>
        </Header>
        <From onSubmit={onSubmit}>
          <div>
            <label htmlFor="nome">Nome: *</label>
            <input
              {...register("nome")}
              type="text"
              name="nome"
              id="nome"
              data-testid="input-nome"
            />
          </div>

          <div>
            <label htmlFor="email">E-mail: *</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
              data-testid="input-email"
            />
          </div>

          <ContainerTelefoneData>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input
                {...register("telefone")}
                type="number"
                name="telefone"
                id="telefone"
              />
            </div>
            <div>
              <label htmlFor="dataNascimento">Data de nascimento:</label>
              <input
                {...register("dataNascimento")}
                type="date"
                name="dataNascimento"
                id="dataNascimento"
              />
            </div>
          </ContainerTelefoneData>

          <div>
            <label htmlFor="cidadeNascimento">Cidade onde nasceu:</label>
            <input
              {...register("cidadeNascimento")}
              type="text"
              name="cidadeNascimento"
              id="cidadeNascimento"
            />
          </div>

          {data && (
            <ContainerReactSelect>
              <Controller
                name="empresas"
                rules={{ required: true }}
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={data.content}
                    isMulti
                    getOptionLabel={(option) => option.nome}
                    getOptionValue={(option) => option.id.toString()}
                    placeholder="Selecione as empresas"
                  />
                )}
              />
            </ContainerReactSelect>
          )}

          <div>{errorEmpresa && errorEmpresa}</div>

          <ContainerButtonsFrom>
            <button
              type="reset"
              onClick={() => reset()}
              data-testid="submit-form"
            >
              <CleaningServicesIcon />
              <span>Limpar</span>
            </button>
            <button type="submit" disabled={!isValid}>
              <SaveIcon />
              <span>Atualizar</span>
            </button>
          </ContainerButtonsFrom>
        </From>
      </Box>
    </Modal>
  );
};
