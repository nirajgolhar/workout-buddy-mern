import { useEffect } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

// import Utils from '../utils/Utilities'
// let API_URL = Utils.API_URL

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext()

  useEffect(() => {
    const API_URL = 'https://mern-workout-buddy-app.herokuapp.com'

    const fetchWorkouts = async () => {
      // const API_URL = process.env.API_URL || 'http://localhost:3000'
      try {
        const response = await fetch(`${API_URL}/api/workouts`, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },  
        })

        const json = await response.json()
        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json })
        }
      } catch (er) {
        console.log('Error', er)
      }
    }
    fetchWorkouts()
  }, [dispatch])

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home
