import Button from "../../../../../../components/button/Button";
import FormInput from "../../../../../../components/formInput/FormInput";

function Advanced() {
    return (
        <div className="container">
            <div className="row align-items-center">
                <div className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
                    <p className="m-0">Device Type:</p>
                </div>

                <div className="col-8 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
                    <FormInput.Text
                        horizontal
                    />
                </div>

                <div className="col-md-3 col-lg-6 col-xl-7 col-xxl-8">
                </div>
            </div>

            <div className="row align-items-center my-2">
                <div className="col-4 col-md-3 col-lg-2 col-xl-2 col-xxl-2">
                    <p className="m-0">Device Class:</p>
                </div>

                <div className="col-8 col-md-6 col-lg-4 col-xl-3 col-xxl-2">
                    <FormInput.Text
                        horizontal
                    />
                </div>

                <div className="col-md-3 col-lg-6 col-xl-7 col-xxl-8">
                </div>
            </div>

            <div>
                <Button>
                    <Button.Text text="Apply" />
                </Button>
                <Button variant="light" className="mt-3 ms-3">
                    <Button.Text text="Cancel" />
                </Button>
            </div>
        </div>
    );
}

export default Advanced;