import React from "react";
import TabForms from "./components/tab-forms";
import LoginForm from "./forms/form-login-react-hook-form";
import CustomerForm from "./forms/form-customer-hook-form-set-value";

function App() {

    const styles = {color: '#fff', WebkitTextStroke: '3px #000'};

    return (
        <React.Fragment>
            <center>
                <h1 style={styles}>
                    Meus Estudos - Tema: React Hook Form
                </h1>
            </center>
            <TabForms
                forms={[
                    {title: 'FORM LOGIN HOOK FORM', component: <LoginForm/>},
                    {title: 'FORM CUSTOMER HOOK FORM WITH SET VALUE', component: <CustomerForm/>}
                ]}
            />
        </React.Fragment>
    );
}

export default App;
