import './ErrorComponent.scss'

function ErrorComponent({cName, message}) {
    return (
        <div className={cName}>
            <span>{message}</span>
        </div>
    )
}

export default ErrorComponent