import { forwardRef, useEffect } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// options: {label: value:}
const FormAutocomplete = forwardRef((props, ref) => {
    const { name, control, label, options, multiple, rules, onInputChange, onClose, ...otherProps } = props;

    const optionList = options || [];
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
                        if (Array.isArray(a)) { // handle multiple selection
                            return a.find((item) => isOptionEqualToValue(item, b)) || false;
                        }
                        return a?.value === b?.value;
                    };

                    const list = [].concat(value || []); // force current value into array, handling multiple selection
                    for (const item of list) {
                        const found = options.find((option) => item.value == option.value);
                        if (!found) optionList.unshift(item);
                    }
                    const onValueChange = (event, value) => {
                        event.stopPropagation();
                        event.preventDefault();
                        if (Array.isArray(value)) {
                            onChange(value.filter((item) => item.value));
                        } else {
                            if (value?.value) onChange(value);
                        }
                    }; 
                    return (
                        <Autocomplete
                            ref={ref}
                            label={label}
                            value={value || (multiple === true ? [] : null)}
                            control={control}
                            multiple={multiple || false}
                            freeSolo
                            {...fieldProps}
                            {...otherProps}
                            onChange={onValueChange}
                            onClose={onClose}
                            isOptionEqualToValue={isOptionEqualToValue}
                            options={optionList}
                            getOptionLabel={(item) => item?.label || ""}
                            onInputChange={onInputChange}
                            renderInput={(params) => <TextField {...params} label={label} error={fieldState.invalid} />}
                        />
                    );
                }}
            />
        </FormControl>
    );
});

export default FormAutocomplete;
