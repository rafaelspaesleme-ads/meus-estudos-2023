import React from "react";
import {useStyles} from "./styles";
import Messages from "../messages";

const Form = ({onSubmit, children, useButtonActions = false, messageSuccess, titleButton = 'Cadastrar', messageError}) => {

    const styles = useStyles();

    return (
        <form style={styles.form} onSubmit={onSubmit}>
            {children}
            {useButtonActions && (
                <>
                    <button type="submit">{titleButton}</button>
                    {messageError && <Messages message={messageError} type="error" />}
                    {messageSuccess && <Messages message={messageSuccess} type="success" />}
                    {messageSuccess && <button type='button' onClick={() => window.location.reload()}>Atualizar Pagina</button>}
                </>
            )}
        </form>
    )
}

export default Form;