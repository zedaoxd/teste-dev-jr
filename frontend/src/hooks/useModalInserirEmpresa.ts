import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { salvarEmpresa } from "../services/empresaService";

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

export const useModalInserirEmpresa = ({
  handleClose,
}: {
  handleClose: () => void;
}) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<FormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(schema),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(salvarEmpresa, {
    onSuccess: () => {
      reset(this);
      handleClose();
      queryClient.invalidateQueries(["empresas"]);
    },
  });

  const onSubmit = handleSubmit((data) => {
    try {
      schema.parse(data);
      if (data.cnpj.length < 14) {
        return;
      }
      mutate(data);
    } catch (error) {
      console.log(error);
    }
  });

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

  return {
    register,
    onSubmit,
    isValid,
    reset,
    style,
  };
};
