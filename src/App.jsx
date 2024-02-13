import './App.css'
import axios from 'axios'

const getData = async () => {
  try {
    const response = await axios.get('https://sellercentral.amazon.de/hz/fba/profitabilitycalculator/index?lang=en_US',{
    headers: {
      'Allow'
    }
    })
    console.log(response.data);
  }
  catch(e) {
    console.log(e)
  }
}

function App() {
const [data, setData] = useState(null);
  return (
    <>
     Hello
     <button onClick={getData}>Get data</button>
    </>
  )
}

export default App
