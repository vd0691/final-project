function Spinner({cName}) {
    return (
        <div className={cName}>
            <span className={`${cName}__content`}>ЗАГРУЗКА</span>
        </div>
    )
}

export default Spinner