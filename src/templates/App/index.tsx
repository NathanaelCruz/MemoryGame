import { Grid } from '../../components/Grid'
import { CARDS } from '../../data/cards'
import './styles.css'

export const App = () => {
  
  return <div className="app">
    <Grid cards={CARDS} />
  </div>
}
