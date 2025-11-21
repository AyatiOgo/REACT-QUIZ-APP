function FinishedScreen({points, maxPoints, highScore, dispatch} ) {
    const pointPercentage = (points/maxPoints) * 100

    return (
        <>
        <p className="result">
            You Scored {points} Out of {maxPoints} ({Math.ceil(pointPercentage)}%) 
        </p>
        <p className="highscore">
            ( highScore : {highScore})
        </p>
    
          <button className="btn" onClick={()=> dispatch({type: "restart"})}> Restart Quiz </button>
        </>
    )
}

export default FinishedScreen
