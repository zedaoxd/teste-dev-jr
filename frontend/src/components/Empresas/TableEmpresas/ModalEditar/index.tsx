import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { From, Header, ContainerButtonsFrom } from "./styles";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputMask from "react-input-mask";
import {
  editarEmpresa,
  salvarEmpresa,
} from "../../../../services/empresaService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Empresa } from "../../../../@types";
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

const schema = z
  .object({
    nome: z.string().min(3).max(50),
    cnpj: z.string(),
  })
  .transform((filds) => ({
    nome: filds.nome.trim(),
    cnpj: filds.cnpj.replace(/\D/g, ""),
  }));

type FormValues = z.infer<typeof schema>;

type Props = {
  open: boolean;
  handleClose: () => void;
  empresa: Empresa | null;
};

export const ModalEditar = ({ handleClose, open, empresa }: Props) => {
  const { handleSubmit, register, reset } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (empresa) {
      reset(empresa);
    }
  }, [empresa]);

  const queryClient = useQueryClient();

  const { mutate } = useMutation(editarEmpresa, {
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries(["empresas"]);
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      mutate({ ...empresa!, ...data });
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
