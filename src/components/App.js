import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader"
import Error from "./Error"
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const initialState = {
  questions : [],
  status : "loading",
  index: 0,
  answer: null,
  points : 0,
  highScore : 0,
  secondsInterval: null
}

const SECS_COUNT = 30

function reducer(state, action) {
  switch (action.type) {
    case "data-recieved":
      return {
        ...state, 
        questions: action.payload,
        status : "ready"
      }

    case "data-error":
      return { ...state, status : "error"}

    case "start":
      return { ...state, status : "active", secondsInterval: state.questions.length * SECS_COUNT }

    case "newAnswer":
    const question = state.questions.at(state.index)

      return { ...state, 
        answer : action.payload,
        points : action.payload === question.correctOption ?
                state.points +  question.points :
                state.points 
      }
    case "nextQuestion":
      return { ...state, 
               index : state.index + 1,
               answer : null
               }

    case "finish":
      return { ...state,
                status : "finished",
                highScore : state.points > state.highScore ? state.points : state.highScore 
              
              }
    case "restart":
      return { ...initialState,
                status : "ready",
                questions : state.questions,
              
              }
    case "timer":
      return { ...state,
                secondsInterval : state.secondsInterval - 1,
                status : state.secondsInterval === 0 ? "finished" : state.status,
              
              }
    default:
      throw new Error("Unknown Action")

  }
}


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {questions, status, index, answer, points, highScore, secondsInterval} = state
  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, curr)=> prev + curr.points , 0 ) 

  function handleStart() {
    dispatch({type: "start"})
  }

   useEffect(()=>{
    async function fetchMovies() {
      const res = await  fetch("http://localhost:9000/questions")

      if (!res.ok) dispatch({type:"data-error"})
      const data = await res.json()
      dispatch({type: "data-recieved", payload: data})
      console.log(data)
    }
    fetchMovies()
   }, [])


  return (
    <div className="App">
       <Header/>
       <Main>
        {status === "loading" &&  <Loader/> }
        {status === "error" &&  <Error/> }
        {status === "ready" &&  <StartScreen numQuestions={numQuestions} handleState={handleStart}/> }
        {status === "active"  && 
        <> 
        <Progress index={index} numQuestions={numQuestions}  maxPoints={maxPoints} answer={answer} points={points} />
        <Question question={questions[index]} answer={answer} dispatch = {dispatch} />
        <Footer> 
          <Timer  secondsInterval={secondsInterval}  dispatch={dispatch} />
          <NextButton dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestions}  />
        </Footer>
        
        </>
        }
        {status === "finished"  && 
        <> 
        <FinishedScreen points={points} maxPoints={maxPoints} highScore={highScore} dispatch={dispatch} />
        </>
        }


       </Main>
    </div>
  )
}

export default App;
