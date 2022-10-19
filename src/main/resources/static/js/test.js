const user = {
    username: "junil",
    password: "1234",
    init: function() {
        return this;
    }
}


let u1 = user.init();

console.log(u1.username);

class UserService {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }

    setName(name) { 
        this.name = name;
    }
}

const userService = new UserService("김준일");
console.log(userService.getName());
userService.setName("김준이");
console.log(userService.getName());
