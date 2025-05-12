const axios = require("axios").default;

//GET

//Test1: Checking the correctness of all parameters for /posts/1
test('GET /posts/1 - should return post with ID 1 and check ALL parameters', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    responseBody = response.data;
    expect(response.status).toBe(200);
    expect(responseBody.id).toBe(1);
    expect(responseBody.userId).toBe(1);
    expect(responseBody.title).toBe('sunt aut facere repellat provident occaecati excepturi optio reprehenderit');
    expect(responseBody.body).toBe('quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto');

})

//Test2: Checking the correctness of all parameters for /posts/1
test('GET /comments - The user with some email left a comment', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    responseBody = response.data;
    expect(response.status).toBe(200);
    //expect(responseBody.email).toContain('Nikita@garfield.biz') -- Don't work (applies to an array of objects, and not to an array of rows.)
    const emailsUser = responseBody.map(comment => comment.email);
    expect(emailsUser).toContain('Nikita@garfield.biz');
});

//Test3: Find and log users with ".biz" domain in email
test('GET /users - Find and log users with ".biz" domain in email', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users/');
    const responseBody = response.data;
    expect(response.status).toBe(200);
    // Filtering user from emails that end in ".biz"
    const mailUsers = responseBody.filter(user => /\.biz$/i.test(user.email));
    mailUsers.forEach(user => console.log(`Id: ${user.id}, Email: ${user.email}`));
});

//////////////////////////////////////
//POST

test('POST /comments - Add new comments and verify response is successful', async () => {
    const newComments = {
        postId: 3333,
        //id: 2222,
        name: "Test Testovich",
        email: "Test@body.at",
        body: "Test body AT"
    }
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', newComments);
    const responseData = response.data;
    expect(response.status).toBe(201);
    expect(responseData.postId).toBe(newComments.postId);
    expect(responseData.id).toBeDefined(); // https://jsonplaceholder.typicode.com is a fake API that does not store data.
    expect(responseData.name).toBe(newComments.name);
    expect(responseData.email).toBe(newComments.email);
    expect(responseData.body).toBe(newComments.body);
    console.log(responseData);
});

test('POST /comments - Add new comments and verify response is successful', async () => {
    const newUser = {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
            street: "Kulas Light",
            city: "Gwenborough",
            zipcode: "92998-3874",
            geo: {
                lat: "-37.3159",
                lng: "81.1496"
            }
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
            name: "Romaguera-Crona",

        }
    };
    const response = await axios.post('https://jsonplaceholder.typicode.com/comments', newUser);
    const responseData = response.data;
    expect(response.status).toBe(201);
    expect(responseData.id).toBeDefined();
    expect(responseData.name).toBe(newUser.name);
    expect(responseData.email).toBe(newUser.email);
    expect(responseData.address.city).toBe(newUser.address.city);
    expect(responseData.company.name).toBe(newUser.company.name);
    console.log(responseData);
});
