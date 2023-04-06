import React, {useEffect, useMemo, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import Form from "../../components/form";
import FieldContextController from "../../components/field-context-controller";
import {dataPaymentSchema} from "./schema";
import {yupResolver} from "@hookform/resolvers/yup";
import ShowTableJson from "../../components/show-table-json";
import SessionService from "../../services/SessionService";
import ConstantsPayment from "./constants";

const FormContextController = () => {

    const [showData, setShowData] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState(null);
    const [messageError, setMessageError] = useState(null);
    const [dataSelected, setDataSelected] = useState([]);

    const validationsSchema = useMemo(() => dataPaymentSchema(), []);

    const sessionService = useMemo(() => new SessionService(), []);

    const methods = useForm({
        resolver: yupResolver(validationsSchema)
    });

    const { handleSubmit } = methods;

    useEffect(() => {

        const dataPaymentSaved = sessionService.findAll(ConstantsPayment.KEY_SERVICE);
        if (dataPaymentSaved.length > showData.length) setShowData(dataPaymentSaved);

    }, [sessionService, showData])

    const onSubmit = (data) => {
        try {
            const dataPaymentSaved = sessionService.save(ConstantsPayment.KEY_SERVICE, data);
            setShowData(dataPaymentSaved);
            setMessageSuccess("Dados de pagamento cadastrado com sucesso!");
        } catch (e) {
            setMessageError(e?.message ?? e.toLocaleString())
        }
    }

    const handleDeleteItem = (event) => {
        const usersSaved = sessionService.deleteBy(ConstantsPayment.KEY_SERVICE, event, 'cvv');
        setShowData(usersSaved);
        setDataSelected([]);
    }

    return (
        <FormProvider {...methods} >
            <Form
                onSubmit={handleSubmit(onSubmit)}
                messageSuccess={messageSuccess}
                messageError={messageError}
                useButtonActions
            >
                <FieldContextController
                    name={ConstantsPayment.NAME_FIELD_CREDIT_CARD}
                    type='text'
                    label='Número do Cartão de Crédito'
                />
                <FieldContextController
                    name={ConstantsPayment.NAME_FIELD_EXPIRATION_DATE}
                    type='date'
                    label='Data de Validade'
                />
                <FieldContextController
                    name={ConstantsPayment.NAME_FIELD_ID}
                    type='tel'
                    label='Código de Segurança (CVV)'
                />
            </Form>
            <ShowTableJson
                idKeyAction={ConstantsPayment.NAME_FIELD_ID}
                idKeyShow={ConstantsPayment.NAME_FIELD_CREDIT_CARD}
                showData={showData}
                dataSelected={dataSelected}
                onChangeEditor={event => setDataSelected(event)}
                onClickDelete={handleDeleteItem}
            />
        </FormProvider>
    )
}

export default FormContextController;