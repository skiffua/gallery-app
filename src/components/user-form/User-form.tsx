import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import InputMask from 'react-input-mask';

import { FORM_MODE, FORM_MODE_ENUM } from '../../pages/types';
import { User } from '../../api/type';

import './form.scss';
import { AppDispatch } from '../../store/store';
import { addUser, updateUser } from '../../store/usersSlice';

function UserForm({
    mode = FORM_MODE_ENUM.PREVIEW,
    userData,
    closeModal
                  }: FORM_MODE & { userData: User; closeModal?: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const [formMode, setFormMode] = useState(FORM_MODE_ENUM.PREVIEW);

    const { register, setValue, getValues, handleSubmit, control, formState: { isValid, errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            formData: {
                id: NaN,
                name: '',
                username: '',
                phone: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                },
                email: '',
                company: {
                    name: '',
                    catchPhrase: '',
                    bs: '',
                },
                website: '',
            }
        }
    });

    const onSubmit = (data: any) => console.log(data);

    const isDisabledInput = (): boolean => formMode === FORM_MODE_ENUM.PREVIEW;

    const changeFormMode = (mode: FORM_MODE_ENUM): void => {
        setFormMode(mode);
    }

    const editUser = (): any => {
        dispatch(updateUser(getValues().formData));
        changeFormMode(FORM_MODE_ENUM.PREVIEW);
    }

    const addNewUser = (): any => {
        if(closeModal && isValid) {
            closeModal();
            dispatch(addUser(getValues().formData));
        }
    }

    useEffect(() => {
        if (userData) {
            const {
                id,
                name,
                username,
                phone,
                address,
                email,
                company: { name: companyName, catchPhrase, bs },
                website,
            } = userData;

            setValue('formData',{
                id,
                name,
                username,
                phone,
                address,
                email,
                company: {
                    name: companyName,
                    ...(catchPhrase && { catchPhrase }),
                    ...(bs && { bs }),
                },
                website,
            });
        }
    }, [userData]);

    useEffect( () => {
        setFormMode(mode);
    }, []);

    // useEffect( () => {
    //     console.log('formState', formState);
    // }, [isValid]);

    return (
        <div className="form-container">
            <form
                className="form-container__form user-form"
                onSubmit={ handleSubmit(onSubmit) }
                autoComplete="off"
            >
                {/* register your input into the hook by invoking the "register" function */}
                <div className="user-form__block">
                    <label className="user-form__block__label" htmlFor="formData.name">Name</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        { ...register('formData.name', { required: 'required text', maxLength: 20 }) }
                    />
                    {errors.formData?.name && <p>{errors.formData.name.message}</p>}
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.username">User Name</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        {...register('formData.username', { required: 'required field', maxLength: 30 }) }
                    />
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.phone">Phone</label>
                    {/*<input*/}
                    {/*    className="user-form__block__input"*/}
                    {/*    disabled={isDisabledInput()}*/}
                    {/*    {...register('formData.phone')}*/}
                    {/*/>*/}
                    <Controller
                        control={control}
                        name="formData.phone"
                        render={({ field: { onChange, onBlur, ref } }) => (
                            <InputMask
                                className="user-form__block__input"
                                mask="(999) 999-9999"
                            />
                        )}
                    />
                </div>
                <div className="user-form__block">
                    <div className="user-form__block__section">Address</div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Street</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.address.street')}
                        />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Suite</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.address.suite')}
                        />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">City</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.address.city')}
                        />
                    </div>
                </div>
                <div className="user-form__block">
                    <div className="user-form__block__section">Company</div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Company Name</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.company.name')}
                        />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Phrase</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.company.catchPhrase')}
                        />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Company Bs</label>
                        <input
                            className="user-form__block__input"
                            disabled={isDisabledInput()}
                            {...register('formData.company.bs')}
                        />
                    </div>
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.phone">WebSite</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        {...register('formData.website')}
                    />
                </div>
                <div className="user-form__block flex justify-between">
                    { formMode === FORM_MODE_ENUM.ADD &&
                        <input
                            type="submit"
                            value="Add"
                            className="cursor-pointer"
                            onClick={addNewUser}
                        />  }
                    { formMode === FORM_MODE_ENUM.EDIT &&
                        <input
                            type="submit"
                            value="EDIT"
                            className="cursor-pointer"
                            onClick={editUser}
                        />  }
                    { formMode === FORM_MODE_ENUM.EDIT &&
                        <input
                            type="submit"
                            value="RESET"
                            className="cursor-pointer"
                            onClick={() => changeFormMode(FORM_MODE_ENUM.PREVIEW)}
                        />  }
                    { formMode === FORM_MODE_ENUM.PREVIEW
                        && <input
                            type="submit"
                            value="Click To Edit"
                            onClick={() => changeFormMode(FORM_MODE_ENUM.EDIT)}
                            className="cursor-pointer"
                        />  }
                    { closeModal && <input
                        type="submit"
                        value="Close"
                        className="cursor-pointer"
                        onClick={closeModal}
                    /> }
                </div>
            </form>
        </div>
    );
}

export default UserForm;
