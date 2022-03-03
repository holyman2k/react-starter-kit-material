import { forwardRef } from "react";
import { FormControl, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const FormTextField = forwardRef((props, ref) => {
    const { name, control, label, rules, ...otherProps } = props;
    return (
        <FormControl>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={(props) => {
                    const { field, fieldState } = props;
                    const { value, ...fieldProps } = field;
                    return <TextField ref={ref} label={label} value={value || ""} control={control} error={fieldState.invalid} {...fieldProps} {...otherProps} />;
                }}
            />
        </FormControl>
    );
});

export default FormTextField;
