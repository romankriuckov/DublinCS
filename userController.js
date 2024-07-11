class UserController {
    createUser(user) {
        console.log('POST users', user);
    }

    getAllUsers() {
    console.log('GET users');
    }

    getUserById(id) {
        console.log('GET by Id:', id);
    }

    updateUserById(id) {
        console.log(`PUT by Id: ${user}`, id);
    }

    deleteUserById(id) {
        console.log(`DELETE by Id: ${id}`);
    }
}

export { UserController };