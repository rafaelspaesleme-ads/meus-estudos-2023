import React from "react";
import {JsonEditor as Editor} from "jsoneditor-react";

const ShowTableJson = ({showData = [], onChangeEditor, dataSelected = [], idKeyShow, idKeyAction, onClickDelete}) => {

    return (
        <div>
            <hr/>
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
            <br/>
            <hr/>
            <br/>
            <div>
                {
                    dataSelected && dataSelected.map((value, index) => (
                        <span key={String(index)}>
                            {value?.[idKeyShow]}
                            {' '}
                            <button onClick={() => onClickDelete(value?.[idKeyAction])}>
                                Excluir
                            </button>
                        </span>
                    ))
                }
            </div>
            <hr/>
        </div>
    )
}

export default ShowTableJson;