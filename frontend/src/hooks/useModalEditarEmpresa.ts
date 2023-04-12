import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { editarEmpresa } from "../services/empresaService";
import { Empresa } from "../@types";

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

export const useModalEditarEmpresa = ({
  empresa,
  handleClose,
}: {
  empresa: Empresa | null;
  handleClose: () => void;
}) => {
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

  return {
    style,
    register,
    onSubmit,
    reset,
  };
};
