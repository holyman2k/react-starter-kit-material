import { forwardRef } from "react";
import { FormControl, Autocomplete, InputLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// options: {label: value:}
const FormAutocomplete = forwardRef((props, ref) => {
    const { name, control, label, options, onInputChange, rules, ...otherProps } = props;
    const _onInputChange = (event, value) => {
        if (onInputChange) onInputChange(event, value);
    };
    const list = [{ label: "", value: 0 }].concat(options || []);
    return (
        <FormControl>
            <Controller
                name={name}
                control={control}
                rules={rules}
                render={(props) => {
                    const { field, fieldState } = props;
                    const { value, onChange, ...fieldProps } = field;

                    const isOptionEqualToValue = (a, b) => {
                        if (a != null && b != null) return a.value == b.value;
                        return a == b;
                    };
                    return (
                        <Autocomplete
                            ref={ref}
                            label={options}
                            value={value || null}
                            control={control}
                            {...fieldProps}
                            {...otherProps}
                            onChange={(event, value) => onChange(value)}
                            isOptionEqualToValue={isOptionEqualToValue}
                            options={list}
                            getOptionLabel={(item) => item?.label}
                            onInputChange={_onInputChange}
                            renderInput={(params) => <TextField {...params} label={label} error={fieldState.invalid} />}
                        />
                    );
                }}
            />
        </FormControl>
    );
});

export default FormAutocomplete;
