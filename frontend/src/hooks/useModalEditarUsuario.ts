import * as z from "zod";
import { Empresa, Usuario } from "../@types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { editUsuario, getUsuarioById } from "../services/usuarioService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllEmpresas } from "../services/empresaService";
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

export const useModalEditarUsuario = ({
  usuario,
  handleClose,
}: {
  usuario: Usuario | null;
  handleClose: () => void;
}) => {
  const [errorEmpresa, setErrorEmpresa] = useState<string | null>(null);
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
        setErrorEmpresa("Selecione ao menos uma empresa!");
        return;
      } else if (usuario) {
        setErrorEmpresa(null);
        data.empresas = watch("empresas");
        editar({ ...data, id: usuario.id });
      }
    } catch (error) {
      console.log(error);
    }
  });

  return {
    style,
    register,
    onSubmit,
    isValid,
    control,
    data,
    reset,
    errorEmpresa,
  };
};
