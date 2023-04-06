import React, {useState} from "react";
import {useStyles} from "./styles";

const TabForms = ({
                      forms = []
                  }) => {

    const styles = useStyles();

    const [selectTab, setSelectTab] = useState(forms[0]?.title);

    return (
        <div>
            <div style={styles.headerTab}>
                {
                    forms && forms.map((form, index) => (
                        <div
                            key={String(index)}
                            onClick={() => setSelectTab(form?.title)}
                            style={selectTab === form?.title ? styles.headerItemTabSelected : styles.headerItemTab}
                        >
                            {form?.title}
                        </div>
                    ))
                }
            </div>
            <div style={styles.body}>
                <center>
                    {
                        forms && forms.map((form, index) => (
                            <div
                                key={String(index)}
                                style={selectTab === form?.title ? null : {display: 'none'}}
                            >
                                {form?.component}
                            </div>
                        ))
                    }
                </center>
            </div>
        </div>
    )

}

export default TabForms;