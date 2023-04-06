import React from "react";
import {useStyles} from "./styles";

const Messages = ({message, type}) => {

    const styles = useStyles();

    switch (type) {
        case "success":
            return <p style={styles.success} >{message}</p>
        case "error":
            return <p style={styles.error} >{message}</p>
        case "warning":
            return <p style={styles.warning} >{message}</p>
        case "info":
            return <p style={styles.info} >{message}</p>
        default:
            return <p style={styles.default} >{message}</p>

    }

}

export default Messages;