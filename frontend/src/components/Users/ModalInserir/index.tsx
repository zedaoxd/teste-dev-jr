import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  From,
  Header,
  ContainerTelefoneData,
  ContainerButtonsFrom,
  ContainerReactSelect,
  ErrorParagraph,
} from "./styles";
import InputMask from "react-input-mask";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import { Controller } from "react-hook-form";
import Select from "react-select";
import { useModalInserirUsuario } from "../../../hooks/useModalInserirUsuario";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const ModalInserir = ({ handleClose, open }: Props) => {
  const {
    control,
    data,
    isValid,
    errors,
    onSubmit,
    register,
    style,
    watch,
    reset,
  } = useModalInserirUsuario(handleClose);

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
            <label htmlFor="email">E-mail: *</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
            />
            {errors?.email && <ErrorParagraph>E-mail invalido</ErrorParagraph>}
          </div>

          <ContainerTelefoneData>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <InputMask
                {...register("telefone")}
                mask={"(99) 99999-9999"}
                type="tel"
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
                    isClearable={false}
                    getOptionLabel={(option) => option.nome}
                    getOptionValue={(option) => option.id.toString()}
                    placeholder="Selecione as empresas"
                  />
                )}
              />
              <div>
                {isValid && !watch("empresas") && (
                  <p>Escolha uma empresa pelo menos</p>
                )}
              </div>
            </ContainerReactSelect>
          )}

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
