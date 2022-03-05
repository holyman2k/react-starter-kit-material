import { forwardRef, useEffect } from "react";
import { FormControl, Autocomplete, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

// options: {label: value:}
const FormAutocomplete = forwardRef((props, ref) => {
    const { name, control, label, options, multiple, rules, onInputChange, onClose, ...otherProps } = props;
    const _onInputChange = (event, value) => {
        if (onInputChange) onInputChange(event, value);
    };
    // const uniqueList = Array.from(new Set(list.map((a) => a.value))).map((value) => list.find((a) => a.value === value));
    // console.log("list", uniqueList);

    console.log("opt", otherProps);

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
                        if (Array.isArray(a)) {
                            return a?.any((item) => isOptionEqualToValue(item, b)) || false;
                        }
                        return a?.value === b?.value;
                    };

                    const list = [].concat(value || []);
                    for (const item of list) {
                        const found = options.find((option) => item.value == option.value);
                        if (!found) optionList.unshift(item);
                    }
                    console.log("render");
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
                            options={optionList}
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
