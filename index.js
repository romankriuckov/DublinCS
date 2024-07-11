//Linking the express as a whole module
import express from 'express';

//Creating the server
const app = express();

app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});