import * as z from "zod";
import { Empresa } from "../@types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEmpresas } from "../services/empresaService";
import { salvarUsuario } from "../services/usuarioService";
import Swal from "sweetalert2";

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

export const useModalInserirUsuario = (handleClose: () => void) => {
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

  return {
    style,
    register,
    isValid,
    onSubmit,
    control,
    data,
    watch,
    reset,
  };
};
