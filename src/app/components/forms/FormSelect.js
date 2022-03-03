import { forwardRef } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller } from "react-hook-form";

// options: {label: value:}
const FormSelect = forwardRef((props, ref) => {
    const { name, control, label, options, rules, ...otherProps } = props;
    return (
        <FormControl>
            <InputLabel id={`id-${name}`}>{label}</InputLabel>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={(props) => {
                    const { field, fieldState } = props;
                    const { value, ...fieldProps } = field;
                    return (
                        <Select ref={ref} labelId={`id-${name}`} value={value || ""} label={label} control={control} error={fieldState.invalid} {...fieldProps} {...otherProps}>
                            {options?.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    );
                }}
            />
        </FormControl>
    );
});

export default FormSelect;
