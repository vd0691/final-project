function Button({cName, title, imageUrl, type, event, name, disableValue}) {
    return (
        <button name={name} className={cName} disabled={disableValue} type={type} onClick={event}>{imageUrl}{title}</button>
    );
}

export default Button;