import React from "react";
import FieldSet from "../field-set";
import {Controller, useFormContext} from "react-hook-form";

const FieldContextController = ({name, label, ...props}) => {

    const {control, formState: {errors}} = useFormContext();

    return (
        <FieldSet errors={errors} name={name}>
            <label htmlFor={name}>{label}</label>
            <Controller
                render={({ field}) => {
                    return (
                        <input
                            {...field}
                            {...props}
                        />
                    );
                }}
                control={control}
                name={name}
                defaultValue=""
            />
        </FieldSet>
    )
}

export default FieldContextController;