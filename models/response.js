module.exports = class ApiResponse {
    data = [];
    errors = [];

    constructor(data, errors = []) {
        this.data = data;
        this.errors = errors;
    }

    toJson() {
        const result = {};

        result.data = this.data;

        if (this.errors.length > 0) {
            result.errors = this.errors;
        }

        return result;
    }
}
