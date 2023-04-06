import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useEffect, useMemo, useState} from "react";
import {JsonEditor as Editor} from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';
import Form from "../../components/form";
import FieldSet from "../../components/field-set";
import {loginSchema} from "./schema";
import SessionService from "../../services/SessionService";
import Messages from "../../components/messages";

const LoginForm = () => {

    const [showData, setShowData] = useState([]);
    const [messageSuccess, setMessageSuccess] = useState(null);
    const [dataSelected, setDataSelected] = useState([]);

    const validationsSchema = useMemo(() => loginSchema(), [])

    const sessionService = useMemo(() => new SessionService(), []);

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(validationsSchema)
    });

    useEffect(() => {

        const usersSave = sessionService.findAll('users');
        if (usersSave.length > showData.length) setShowData(usersSave);

    }, [sessionService, showData])

    const onSubmit = (data) => {
        const usersSave = sessionService.save('users', data);
        setShowData(usersSave);
        setMessageSuccess("Login cadastrado com sucesso!");
    };

    return (
        <div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <FieldSet errors={errors} name='username'>
                        <label htmlFor="password">Usuário</label>
                        <input
                            type="text"
                            id="username"
                            {...register("username")}
                        />

                    </FieldSet>
                    <FieldSet errors={errors} name='password'>
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            {...register("password")}
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
                                {value?.username}
                                {' '}
                                <button onClick={() => {
                                    const usersSaved = sessionService.deleteBy('users', value?.username, 'username');
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

export default LoginForm;