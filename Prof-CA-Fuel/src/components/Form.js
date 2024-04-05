import Input from './Input';

const Form = ({ onSubmit, errors }) => {
    return (
        <form onSubmit={onSubmit} >
            <div className="mb-5">
                <Input
                    name="Station Name:"
                    label="Station Name"
                    type="text"
                />
                {errors.stationName && <span style={{ color: 'red' }}>{errors.stationName}</span>}
            </div>
            <div className="mb-5">
                <Input
                    name="Petrol Price:"
                    label="Petrol Price"
                    type="number"
                />
                {errors.petrolPrice && <span style={{ color: 'red' }}>{errors.petrolPrice}</span>}
            </div>
            <div className="mb-5">
                <Input
                    name="Diesel Price:"
                    label="Diesel Price"
                    type="number"
                />
                {errors.dieselPrice && <span style={{ color: 'red' }}>{errors.dieselPrice}</span>}
            </div>
            <div className="mb-5">
                <Input
                    name="Station Rating:"
                    label="Station Rating"
                    type="number"
                />
                {errors.stationRating && <span style={{ color: 'red' }}>{errors.stationRating}</span>}
            </div>
        </form>
    );
};

export default Form;
