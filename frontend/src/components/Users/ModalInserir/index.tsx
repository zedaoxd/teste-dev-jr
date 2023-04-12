import Box from "@mui/material/Box";
import Swal from "sweetalert2";
import Modal from "@mui/material/Modal";
import {
  From,
  Header,
  ContainerTelefoneData,
  ContainerButtonsFrom,
  ContainerReactSelect,
} from "./styles";
import InputMask from "react-input-mask";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { salvarUsuario } from "../../../services/usuarioService";
import { getAllEmpresas } from "../../../services/empresaService";
import Select from "react-select";
import { Empresa } from "../../../@types";

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

const empresaSchema = z.object({
  id: z.number(),
  nome: z.string(),
});

const schema = z.object({
  nome: z.string().min(3).max(50),
  email: z.string().email(),
  telefone: z.string().optional(),
  dataNascimento: z.string().optional(),
  cidadeNascimento: z.string().optional(),
});

type FormValues = z.infer<typeof schema> & {
  empresas: Empresa[];
};

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const ModalInserir = ({ handleClose, open }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
    control,
    watch,
  } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { data } = useQuery(["empresas"], () => getAllEmpresas("", ""));

  const { mutateAsync: createUser } = useMutation(salvarUsuario, {
    onSuccess: () => {
      reset();
      handleClose();
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Usuário inserido com sucesso!", "", "success");
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      if (!watch("empresas")) {
        return;
      } else {
        data.empresas = watch("empresas");
        createUser(data);
      }
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
