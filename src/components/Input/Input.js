import {useState} from "react";

function Input({name, value, type='text', cName, labelTitle, event, eventBlur, labelCName}) {

   const label = labelTitle === undefined ? '' : <label htmlFor={name} className={labelCName} onChange={event} onBlur={eventBlur}>{labelTitle}</label>;

    return (
        <>
            {label}
            <input id={name} name={name} className={cName} onChange={event} onBlur={eventBlur} type={type} value={value} />
        </>
    );
}

export default Input;