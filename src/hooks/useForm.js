import { useEffect, useState } from 'react';

export const useForm = ( initialForm = {} ,formValidators = {}) => {


    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      createValidators();     
    }, [formState])
    

    //const { username, email, password} = formState;

    const onInputChange = ( {target} ) => {

        const { name , value } = target;
        console.log(name,value);
        setFormState({
            ...formState,
            [ name ]: value
        })

    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    const createValidators = () => {
        const formCheckedValues = {};
        for (const formField of Object.keys( formValidators )) {
            console.log(formField);

            const [fn, errorMessage ] = formValidators[formField];

            formCheckedValues[`${formField}Valid`] = fn ( formState[ formField ]) ? null : errorMessage;

        }

        setFormValidation(formCheckedValues);


    }

    return {
        formState,
        onInputChange,
        ...formState,
        onResetForm,
        ...formValidation

    }

}