function StartScreen({numQuestions, handleState}) {
    return (
        <div className="start">
            <h2> Welcome to the quiz</h2>
            <h3> {numQuestions} Questions to test your react ability</h3>
            <button className="btn btn-ui" onClick={handleState}> Let's Start</button>
        </div>
    )
}

export default StartScreen
