export * as yup from 'yup';

const message = yup
    .string()
    .required('Message is required')
    .min(3, 'Message must be at least 5 characters');

export const MessageValidation = yup.object().shape({
    message
});