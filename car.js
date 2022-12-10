// define what cars require & validate inputs

class Car {

    constructor(description){
        if (description) {
            this.id = description.id;
            this.userID = description.userID;
            this.title = description.title;
            this.desc = description.desc;
            this.type = description.type;
            this.prio = description.prio;
            this.status = description.status;
        }
        
        this.errors = [];
    }

    isValid(){
        this.errors = [];
        if (!this.title || this.title.length <= 2 || this.title == ("car")) {
            this.errors.push("Title must contain at least 3 charaters (and not be named 'car')");
        }

        if (!this.desc || this.desc.length <= 0){
            this.errors.push("Car must have a description");
        }
        return this.errors.length <= 0;
    }

}

module.exports = Car;