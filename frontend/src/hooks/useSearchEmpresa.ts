import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { getAllEmpresas } from "../services/empresaService";

const schema = z.object({
  texto: z.string().nonempty(),
  campo: z.string().nonempty(),
});

type FormSearch = z.infer<typeof schema>;

export const useSearchEmpresa = () => {
  const { register, handleSubmit, watch } = useForm<FormSearch>();
  const [openModalInserir, setOpenModalInserir] = useState(false);
  const handleCloseModalInserir = () => setOpenModalInserir(false);
  const handleOpenModalInserir = () => setOpenModalInserir(true);

  const { refetch } = useQuery(["empresas"], {
    queryFn: () => getAllEmpresas(watch("texto"), watch("campo")),
    enabled: false,
  });

  const onSubmit = handleSubmit((formSeacrh) => {
    refetch();
  });

  return {
    register,
    onSubmit,
    openModalInserir,
    handleCloseModalInserir,
    handleOpenModalInserir,
  };
};
