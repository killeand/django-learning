import { yupResolver } from '@hookform/resolvers/yup';

export default function FormPreconfig({ schema }) {
    return {
        mode: "onBlur",
        shouldFocusError: true,
        resolver: yupResolver(schema)
    };
}