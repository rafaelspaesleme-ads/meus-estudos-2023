import * as yup from "yup";

export const loginSchema = () => yup.object().shape({
    username: yup
        .string()
        .required("Nome de usuário é obrigatório")
        .test('match', `Nome de usuário não pode conter espaços.`, (value) => {
            return !Boolean(value.split('').find(v => v === ' '));
        }),
    password: yup
        .string()
        .required("Senha é obrigatória")
        .matches(
            /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=])(?=.{8,})/,
            "Senha deve conter no mínimo um número, uma letra, um simbolo e ter no mínimo 8 caracteres"
        ),
});
