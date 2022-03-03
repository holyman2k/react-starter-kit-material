import { forwardRef } from "react";
import { FormControl, TextField } from "@mui/material";
import { DatePicker } from "@mui/lab";
import { Controller } from "react-hook-form";

const FormDatePicker = forwardRef((props, ref) => {
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
                    return (
                        <DatePicker
                            label={label}
                            control={control}
                            value={value || ""}
                            {...otherProps}
                            {...fieldProps}
                            renderInput={(renderProps) => <TextField {...renderProps} helperText={renderProps?.inputProps?.placeholder} error={fieldState.invalid} />}
                        />
                    );
                }}
            />
        </FormControl>
    );
});

export default FormDatePicker;
