import { useController } from "react-hook-form";
import { FormControl, FormLabel, Switch, FormHelperText, Typography as T } from "@mui/joy";

export default function ManagedSwitch({ label, ...controllerProps }) {
    const { field } = useController(controllerProps);

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Switch {...field} />
        </FormControl>
    );
}