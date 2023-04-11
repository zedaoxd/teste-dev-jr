const formatCNPJ = (cnpj: string): string => {
  const cnpjRegex = /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/;
  const cnpjFormatted = cnpj.replace(cnpjRegex, "$1.$2.$3/$4-$5");
  return cnpjFormatted;
};

export default formatCNPJ;
