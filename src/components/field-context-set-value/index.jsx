import React from "react";
import FieldSet from "../field-set";
import {useFormContext} from "react-hook-form";

const FieldContextSetValue = (props, {name, label, onChangeField }) => {

    const { setValue, formState: {errors, defaultValues} } = useFormContext();

    const handleChangeField = (event) => {
        const value = event.target.value;
        setValue(name, value);
        onChangeField(value)
    };

    return (
        <FieldSet errors={errors} name={name}>
            <label htmlFor={name}>{label}</label>
            <input
                {...props}
                defaultValue={defaultValues}
                id={name}
                onChange={handleChangeField}
            />
        </FieldSet>
    )
}

export default FieldContextSetValue;