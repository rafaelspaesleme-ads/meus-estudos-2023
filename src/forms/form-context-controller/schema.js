import * as yup from "yup";
import {isCreditCard, isValidDate} from "../../utils/validations.utils";

export const dataPaymentSchema = () => yup.object().shape({
    creditCard: yup
        .string()
        .required("É obrigatório informar o número do cartão.")
        .test('match', `Cartão de Crédito inválido.`, (value) => {
            return isCreditCard(value);
        }),
    expirationDate: yup
        .date()
        .required("É obrigatório informar a data de validade do cartão.")
        .test('match', `Data inválida.`, (value) => {
            return isValidDate(value);
        }),
    cvv: yup
        .string()
        .required("É obrigatório inserir o CVV.")
        .test('match', `CVV inválido.`, (value) => {
            return value.length === 3 || value.length === 4;
        }),
});
