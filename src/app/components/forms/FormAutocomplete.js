import { forwardRef } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// options: {label: value:}
const FormAutocomplete = forwardRef((props, ref) => {
    const { name, control, label, options, multiple, rules, onInputChange, onClose, ...otherProps } = props;
    const _onInputChange = (event, value) => {
        if (onInputChange) onInputChange(event, value);
    };
    const list = options || [];
    const uniqueList = Array.from(new Set(list.map((a) => a.value))).map((value) => list.find((a) => a.value === value));
    console.log("list", uniqueList);
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
                        if (a != null && b != null) return a.value === b.value;
                        return a === b;
                    };
                    return (
                        <Autocomplete
                            ref={ref}
                            label={label}
                            value={value || (multiple === true ? [] : null)}
                            control={control}
                            multiple={multiple || false}
                            {...fieldProps}
                            {...otherProps}
                            onChange={(event, value) => onChange(value)}
                            onClose={onClose}
                            isOptionEqualToValue={isOptionEqualToValue}
                            options={uniqueList}
                            getOptionLabel={(item) => item?.label || ""}
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
