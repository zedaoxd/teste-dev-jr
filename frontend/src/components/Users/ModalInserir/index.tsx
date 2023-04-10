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
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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

const schema = z.object({
  nome: z.string().min(3).max(50),
  email: z.string().email(),
  telefone: z.string().optional(),
  dataNascimento: z.string().optional(),
  cidadeNascimento: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const ModalInserir = ({ handleClose, open }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid, errors },
    reset,
  } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
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
            <label htmlFor="email">E-mail: *</label>
            <input
              {...register("email")}
              type="email"
              name="email"
              id="email"
            />
          </div>

          <ContainerTelefoneData>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input
                {...register("telefone")}
                type="tel"
                name="telefone"
                max={11}
                min={10}
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
