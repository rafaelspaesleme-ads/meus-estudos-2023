import React from "react";
import Messages from "../messages";
import {useStyles} from "./styles";

const FieldSet = ({children, errors, name}) => {

    const styles = useStyles();

    return (
        <fieldset style={styles.fieldset}>
            {children}
            {errors[name] && <Messages message={errors[name]?.message || 'Erro não identificado!'} type="error" />}
        </fieldset>
    )
}

export default FieldSet;