

class User {
    constructor(ID, Name, Age) {
        this.ID = ID || 0,
            this.Name = Name || '',
            this.Age = Age || 0
    }
    getById(id) {
        return new User(id, 'Thanawat', 27);
    }
}

module.exports = User