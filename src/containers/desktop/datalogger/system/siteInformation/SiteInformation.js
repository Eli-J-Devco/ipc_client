import Button from '../../../../../components/button/Button';
import FormInput from '../../../../../components/formInput/FormInput';

function SiteInformation() {
    return (
        <div>
            <p className='note'>
                Enter information to describe and identify this unit. The information is displayed at the top of all the web pages and on your browser's tab heading.
            </p>

            <div className="container">
                <div className="row">
                    <div className="col-md-3" />
                    
                    <div className="col-md-6" >
                        <div>
                            <FormInput
                            >
                                <FormInput.Text
                                    label="Name"
                                    name="name"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Location"
                                    name="location"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Description"
                                    name="description"
                                    className="my-3"
                                />

                                <FormInput.Text
                                    label="Administrative Contact"
                                    name="contact"
                                    className="my-3"
                                />
                            </FormInput>

                            <div className="mt-5 d-flex flex-wrap gap-3">
                                <Button>
                                    <Button.Text text="Save" />
                                </Button>

                                <Button variant="white" >
                                    <Button.Text text="Cancel" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3" />
                </div>
            </div>
        </div>
    );
}

export default SiteInformation;