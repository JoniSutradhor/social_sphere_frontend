import {
    Controller,
    type Control,
    type FieldPath,
    type FieldValues,
} from 'react-hook-form';
import {
    TextField,
    Typography,
    Box,
    type TextFieldProps,
} from '@mui/material';

type ControlledTextFieldProps<T extends FieldValues> = Omit<
    TextFieldProps,
    'name'
> & {
    name: FieldPath<T>;
    control: Control<T>;
    label?: string;
};

export function ControlledTextField<T extends FieldValues>({
    name,
    control,
    label,
    ...props
}: ControlledTextFieldProps<T>) {
    return (
        <Box>
            {label && (
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: 16,
                        color: '#4A5568',
                        mb: '8px',
                    }}
                >
                    {label}
                </Typography>
            )}

            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        {...props}
                        label={undefined}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
        </Box>
    );
}