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
    const fetchWorkouts = async () => {
      // const API_URL = process.env.API_URL || 'http://localhost:3000'
      const API_URL = 'https://workout-buddy-gui.herokuapp.com'
      const response = await fetch(`${API_URL}/api/workouts`)
      const json = await response.json()
      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
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
