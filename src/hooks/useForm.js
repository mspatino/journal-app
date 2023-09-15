import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {} ,formValidators = {}) => {


    const [formState, setFormState] = useState(initialForm);
    const [formValidation, setFormValidation] = useState({});

    useEffect(() => {
      createValidators();     
    }, [formState])

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }
        return true;

    }, [formValidation])
    

    //const { username, email, password} = formState;

    const onInputChange = ( {target} ) => {

        const { name , value } = target;
        
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
        ...formValidation,
        isFormValid

    }

}