import { useController } from "react-hook-form";
import { FormControl, FormLabel, Input, FormHelperText, Typography as T } from "@mui/joy";
import _ from 'lodash';

export default function ManagedInput({ type, label, ...controllerProps }) {
    const { field, fieldState } = useController(controllerProps);
    
    return (
        <FormControl error={!_.isNil(fieldState.error)}>
            <FormLabel>{label}</FormLabel>
            <Input type={type || "text"} {...field} />
            <FormHelperText>
                <T level="body-xs">{fieldState.error?.message}</T>
            </FormHelperText>
        </FormControl>
    );
}