import '../../assets/scss/alert.scss';

export enum AlertTypes {
    error = 'error',
    success = 'success',
    warn = 'warn',
}
type Props = {
    type:AlertTypes;
    message:string | undefined;
}

function Alert({type,message}: Props) {

    switch (type) {
        case AlertTypes.error:
            return <p className={AlertTypes.error}>{message}</p>
        case AlertTypes.warn:
            return <p className={AlertTypes.warn}>{message}</p>
        case AlertTypes.success:
            return <p className={AlertTypes.success}>{message}</p>
        default:
            return null;
    }
}

export default Alert