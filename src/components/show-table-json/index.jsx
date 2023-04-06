import React from "react";
import {JsonEditor as Editor} from "jsoneditor-react";
import {useStyles} from "./styles";

const ShowTableJson = ({showData = [], onChangeEditor, dataSelected = [], idKeyShow, idKeyAction, onClickDelete}) => {

    const styles = useStyles();

    return (
        <div style={styles.areaTable}>
            <div>
                {
                    showData && showData.length > 0 && (
                        <Editor
                            value={showData}
                            onChange={onChangeEditor}
                        />
                    )
                }
            </div>
            <div style={styles.showFind}>
                {
                    dataSelected && dataSelected.map((value, index) => (
                        <span key={String(index)}>
                            {value?.[idKeyShow]}
                            {' '}
                            <button onClick={() => onClickDelete(value?.[idKeyAction])}>
                                Excluir
                            </button>
                            {index < dataSelected.length - 1 ? ', ' : '.'}
                        </span>
                    ))
                }
            </div>
        </div>
    )
}

export default ShowTableJson;