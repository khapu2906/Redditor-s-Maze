import { Devvit, useState, useForm } from '@devvit/public-api';

function Form ({context}) {
    const [name, setName] = useState('Hoang 8129');

    const myForm = useForm(
        {
            fields: [
                {
                    type: 'string',
                    name: 'name',
                    label: 'Name',
                },
            ],
        },
        (values) => {
            // onSubmit handler
            setName(values.name);
        }
    );

    function showForm() {
        context.ui.showForm(myForm);
    }

    return (
        <vstack>
            <text>Hello {name}!</text>
            <button
                onPress={showForm}
            >
                Set name
            </button>
        </vstack>
    );
}

export default Form;
