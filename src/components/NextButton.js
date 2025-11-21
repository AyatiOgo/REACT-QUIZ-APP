function NextButton({dispatch, answer, index , numQuestion}) {
    if (answer === null) return null

    if (index + 1 < numQuestion )
    return (
        <button className="btn btn-ui" onClick={()=> dispatch({type: "nextQuestion"})}>
            Next
        </button>
    )
    if (index + 1 === numQuestion )
    return (
        <button className="btn btn-ui" onClick={()=> dispatch({type: "finish"})}>
            Finish
        </button>
    )
}

export default NextButton
