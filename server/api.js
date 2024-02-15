const url = 'https://cors-anywhere.herokuapp.com/https://myamazonrequest.netlify.app/'; // замените 'https://example.com/api' на URL вашего сервера

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    // Добавьте другие необходимые заголовки здесь
  },
  body: JSON.stringify({ key: 'value' }) // замените { key: 'value' } на ваш объект JSON
})
.then(response => response.json())
.then(data => {
  console.log(data); // Обработка ответа от сервера
})
.catch(error => {
  console.error('Ошибка:', error);
});
