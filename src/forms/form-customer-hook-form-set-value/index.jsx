import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useMemo, useState} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import Form from "../../components/form";
import FieldSet from "../../components/field-set";
import {customerSchema} from "./schema";
import SessionService from "../../services/SessionService";
import Messages from "../../components/messages";

const CustomerForm = () => {

    const [showData, setShowData] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState(null);
    const [dataSelected, setDataSelected] = useState([]);

    const validationsSchema = useMemo(() => customerSchema(), [])

    const sessionService = useMemo(() => new SessionService(), []);

    const {
        handleSubmit,
        formState: {errors},
        setValue,
        reset
    } = useForm({
        resolver: yupResolver(validationsSchema)
    });

    useEffect(() => {

        const usersSave = sessionService.findAll('customers');
        if (usersSave.length > showData.length) setShowData(usersSave);

    }, [sessionService, showData])

    const onSubmit = (data) => {
        const usersSave = sessionService.save('customers', data);
        setShowData(usersSave);
        setMessageSuccess("Cliente cadastrado com sucesso!");
        reset(data);
    };

    const handleChangeField = (event) => event.target.value;

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FieldSet errors={errors} name='fullname'>
                        <label htmlFor="fullname">Nome Completo</label>
                        <input
                            type="text"
                            id="fullname"
                            onChange={event => setValue('fullname', handleChangeField(event))}
                        />

                    </FieldSet>
                    <FieldSet errors={errors} name='cpf'>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            type="tel"
                            id="cpf"
                            onChange={event => setValue('cpf', handleChangeField(event))}
                        />
                    </FieldSet>
                    <FieldSet errors={errors} name='whatsapp'>
                        <label htmlFor="whatsapp">WhatsApp</label>
                        <input
                            type="tel"
                            id="whatsapp"
                            onChange={event => setValue('whatsapp', handleChangeField(event))}
                        />
                    </FieldSet>
                    <FieldSet errors={errors} name='address'>
                        <label htmlFor="address">Enderço</label>
                        <input
                            type="text"
                            id="address"
                            onChange={event => setValue('address', handleChangeField(event))}
                        />
                    </FieldSet>
                    <FieldSet errors={errors} name='dateofbirth'>
                        <label htmlFor="dateofbirth">Data de Nascimento</label>
                        <input
                            type="date"
                            id="dateofbirth"
                            onChange={event => setValue('dateofbirth', handleChangeField(event))}
                        />
                    </FieldSet>
                </div>
                <button type="submit">Cadastrar</button>
                {messageSuccess && <Messages message={messageSuccess} type="success" />}
                {messageSuccess && <button type='button' onClick={() => window.location.reload()}>Atualizar Pagina</button>}
            </Form>
            <hr/>
            <div>
                <div>
                    {
                        showData && showData.length > 0 && (
                            <Editor
                                value={showData}
                                onChange={(event) => setDataSelected(event)}
                            />
                        )
                    }
                </div>
                <br/>
                <hr/>
                <br/>
                <div>
                    {
                        dataSelected && dataSelected.map((value, index) => (
                            <span key={String(index)}>
                                {value?.fullname}
                                {' '}
                                <button onClick={() => {
                                    const usersSaved = sessionService.deleteBy('customers', value?.cpf, 'cpf');
                                    setShowData(usersSaved);
                                    setDataSelected([]);
                                }}>Excluir</button>
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default CustomerForm;