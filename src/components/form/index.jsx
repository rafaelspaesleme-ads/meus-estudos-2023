import React from "react";
import {useStyles} from "./styles";

const Form = ({onSubmit, children}) => {

    const styles = useStyles();

    return (
        <form style={styles.form} onSubmit={onSubmit}>
            {children}
        </form>
    )
}

export default Form;