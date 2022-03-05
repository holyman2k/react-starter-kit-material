import axios from "axios";
import { useEffect, forwardRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Stack } from "@mui/material";
import { Button } from "@mui/material";
import { Slide } from "@mui/material";
import FormTextField from "../forms/FormTextField";
import FormDatePicker from "../forms/FormDatePicker";
import FormSelect from "../forms/FormSelect";
import FormAutocomplete from "../forms/FormAutocomplete";
import { edit, save } from "../../slices/todoSlice";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

let throttle = {};

const EditTodo = () => {
    const dispatch = useDispatch();
    const form = useForm();
    const { control, handleSubmit, reset } = form;
    const { editItem } = useSelector((store) => store.todo);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        reset(editItem);
        setCountries(editItem?.country ? [editItem.country] : null);
    }, [editItem, reset]);

    const onSubmit = (data) => {
        // convert date to timestamp
        const newTodo = { ...data, due: new Date(data.due).getTime() };
        dispatch(save(newTodo));
    };

    const onClose = () => dispatch(edit());

    const isBeforeToday = (date) => date.getTime() < Date.now() - 24 * 60 * 60 * 1000;

    if (!editItem) return null;

    const typeList = [
        { value: 1, label: "Work" },
        { value: 2, label: "Home" },
        { value: 3, label: "School" },
        { value: 4, label: "Fun" },
    ];

    const onCountrySearch = (event, value) => {
        clearTimeout(throttle);
        if (value.trim().length === 0) {
            return;
        }
        throttle = setTimeout(() => {
            axios.get(`/api/?q=${value}`).then((response) => {
                const data = response.data.data;
                const list = Object.keys(data).map((key) => ({ value: key, label: data[key].country }));
                setCountries(list);
            });
        }, 200);
    };

    return (
        <Dialog maxWidth="sm" fullWidth={true} open={editItem != null} onClose={onClose} TransitionComponent={Transition}>
            <DialogTitle>{editItem ? "Edit" : "New"}</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} mt={2}>
                        <FormTextField name="todo" label="Todo" control={control} rules={{ required: true }} />
                        <FormDatePicker name="due" label="Due Date" inputFormat="dd/MM/yyyy" control={control} rules={{ required: true }} shouldDisableDate={isBeforeToday} />
                        <FormSelect name="type" label="Type" control={control} options={typeList} />
                        <FormAutocomplete
                            name="country"
                            label="Country"
                            multiple={true}
                            control={control}
                            options={countries}
                            onInputChange={onCountrySearch}
                            rules={{ required: true }}
                        />
                        <Button type="submit" id="submit" sx={{ display: "none" }}></Button>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={() => document.querySelector("#submit").click()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTodo;
