// Додати контролери до тестів з минулої домашки(API запити до JSONPlaceholder) АБО 
// Створити 5-10 нових тестів до сервісу https://bookstore.toolsqa.com/swagger/#, https://demoqa.com/books та 
// додати контролери до них
// У тестах робити перевірки через expect (статус, дані з відповіді і так далі)
// Використовувати контролери у тестах

const axios = require("axios").default;
const BooksController = require("./BooksController.js");
const AuthController = require("./AuthController.js");

describe('The tests are running in order.', () => {
//let userName = `test_${Date.now()}`;
let userName = 'Test_AQA';
let password = 'Q123123q!';
//let token, userId;
let token;
let userId = '4ad1958b-d41c-4651-8cb3-db4cce7bd5fa'

test('Get all books', async () => {
    // const response = await axios.get('https://demoqa.com/BookStore/v1/Books');
    const response = await BooksController.getAllBooks();
    responseBody = response.data;
    expect(responseBody.books).toHaveLength(8);
});

test('Verify first books', async () => {
    const response = await BooksController.getAllBooks();
    responseBody = response.data;
    expect(responseBody.books[0].title).toBe("Git Pocket Guide");

});

test('Get book by ISBN', async () => {
    const isbn = '9781449325862';
    const response = await BooksController.getBookByISBN(isbn);
    expect(response.data.title).toBe('Git Pocket Guide');
});

//Треба перероблювати логіку отримання userId, якщо робити АТ під нових юзерів.
// test('Create New user', async () => {
//     const response = await AuthController.createUser(userName, password);
//     responseBody = response.data;
//     expect(response.status).toBe(201);
//     userId = responseBody.userID; //-- отримуємо userId
// });

test('Login with existing user', async () => {
    const response = await AuthController.genToken(userName, password);
    expect(response.status).toBe(200);

});

test('Generate token', async () => {
    const response = await AuthController.genToken(userName, password);
    expect(response.status).toBe(200);
    expect(response.data.token).toBeDefined();
    token = response.data.token; //-- отримуємо token
    console.log(response.data.token);
});

test('Add Books', async () => {
    const isbn = '9781449325862';
    const response = await BooksController.addBooks(userId, isbn, token);
    responseBody = response.data;
    expect(response.status).toBe(201);
});

test('Delete Books', async () => {
    const isbn = '9781449325862';
    const response = await BooksController.deleteBook(userId, isbn, token);
    expect(response.status).toBe(204);
});
});
// "userId": "4ad1958b-d41c-4651-8cb3-db4cce7bd5fa",
// password: "Q123123q!"
// userName: "Test_AQA"