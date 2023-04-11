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
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  editUsuario,
  getUsuarioById,
} from "../../../../services/usuarioService";
import { getAllEmpresas } from "../../../../services/empresaService";
import Select from "react-select";
import { Empresa, Usuario } from "../../../../@types";
import { useEffect } from "react";

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

type FormValues = z.infer<typeof schema> & {
  empresas: Empresa[];
};

type Props = {
  open: boolean;
  handleClose: () => void;
  usuario: Usuario | null;
};

export const ModalEditar = ({ handleClose, open, usuario }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
    control,
    setValue,
    watch,
  } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const setUserData = async () => {
      if (usuario) {
        const user = await getUsuarioById(usuario.id);
        setValue("nome", user.nome);
        setValue("email", user.email);
        setValue("telefone", user.telefone.replace(/\D/g, ""));
        setValue(
          "dataNascimento",
          user.dataNascimento
            ? new Date(user.dataNascimento).toISOString().slice(0, 10)
            : ""
        );
        setValue("cidadeNascimento", user.cidadeNascimento);
        setValue("empresas", user.empresas);
      }
    };
    setUserData();
  }, [usuario]);

  const queryClient = useQueryClient();

  const { data } = useQuery(["empresas"], () => getAllEmpresas("", ""));

  const { mutateAsync: editar } = useMutation(editUsuario, {
    onSuccess: () => {
      reset();
      handleClose();
      queryClient.invalidateQueries(["users"]);
      Swal.fire("Usuário editado com sucesso!", "", "success");
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      if (watch("empresas").length === 0) {
        Swal.fire("Selecione ao menos uma empresa!", "", "error");
        return;
      } else if (usuario) {
        data.empresas = watch("empresas");
        editar({ ...data, id: usuario.id });
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
          <h2>Editar</h2>
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
                type="number"
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

          <ContainerButtonsFrom>
            <button type="reset" onClick={() => reset()}>
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
