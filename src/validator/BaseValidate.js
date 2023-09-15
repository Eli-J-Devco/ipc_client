class BaseValidate {
    constructor() {
        // Check if all instance methods are implemented.
        if (this.setRule === BaseValidate.prototype.setRule) {
            throw new TypeError("Please implement abstract method setRule.");
        }
        if (this.setAlias === BaseValidate.prototype.setAlias) {
            throw new TypeError("Please implement abstract method setAlias.");
        }
        // this.v = new Validation();
    }
   
}
export default BaseValidate;