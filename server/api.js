import axios from 'axios';
import query from './query.json' ;

console.log(query)



const options = {
    method: 'POST',
    url: 'https://sellercentral.amazon.de/rcpublic/getfeeswithnew?countryCode=DE',
    headers: {
        'Content-Type': 'application.json'
    },
    data: query,
}

axios(options)
.then((response) => console.log(response.data))
.catch(error => {
    console.error('Ошибка:', error)
})