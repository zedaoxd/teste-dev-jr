import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getAllUsuarios } from "../services/usuarioService";

const schema = z.object({
  texto: z.string().nonempty(),
  campo: z.string().nonempty(),
});

type FormSearch = z.infer<typeof schema>;

export const useSearchUsuario = () => {
  const { register, handleSubmit, watch } = useForm<FormSearch>();

  const { refetch } = useQuery(["users"], {
    queryFn: () => getAllUsuarios(watch("texto"), watch("campo")),
  });

  const onSubmit = handleSubmit((formSeacrh) => {
    refetch();
  });

  return {
    register,
    onSubmit,
  };
};
