function Form(props) {
    return (
        <form className={props.name}>
            {props.children}
        </form>
    );
}

export default Form;