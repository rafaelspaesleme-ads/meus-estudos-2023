import React from "react";
import FieldSet from "../field-set";
import {useFormContext} from "react-hook-form";

const FieldContextRegister = (props, {name, label, onChangeField }) => {

    const { register, formState: {errors, defaultValues} } = useFormContext();

    const handleChangeField = (event) => {
        const value = event.target.value;
        onChangeField(value)
    };

    return (
        <FieldSet errors={errors} name={name}>
            <label htmlFor={name}>{label}</label>
            <input
                {...register(name)}
                {...props}
                defaultValue={defaultValues}
                id={name}
                onChange={handleChangeField}
            />
        </FieldSet>
    )
}

export default FieldContextRegister;