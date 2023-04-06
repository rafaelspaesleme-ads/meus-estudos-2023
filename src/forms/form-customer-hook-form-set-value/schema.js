import * as yup from "yup";

export const customerSchema = () => yup.object().shape({
    fullname: yup
        .string()
        .required("Nome Completo é obrigatório.")
        .test('match', `Por favor, insira seu nome completo.`, (value) => {
            return Boolean(value.split(' ').length > 1);
        }),
    cpf: yup
        .string()
        .required("CPF é obrigatória")
        .matches(
            /^\d{3}\d{3}\d{3}\d{2}$/,
            "Este CPF é inválido."
        ),
    whatsapp: yup
        .string()
        .required("WhatsApp é obrigatória")
        .test('match', `Número de WhatsApp ultrapassou o limite de digitos.`, (value) => {
            return !Boolean(value.length > 11);
        })
        .matches(
            /\d{2}?(\d{5})?\d{4}/,
            "Este WhatsApp é inválido."
        ),
    address: yup
        .string()
        .nullable(),
    dateofbirth: yup
        .date()
        .required("Data de Nascimento é obrigatória"),
});
