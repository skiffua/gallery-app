import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/actions';
import { FORM_MODE, FORM_MODE_ENUM } from './types';
import { User } from '../api/type';

import './userPage.scss';

function UserPage({ mode = FORM_MODE_ENUM.PREVIEW}: FORM_MODE) {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Record<'id', string>>();
    const [formMode, setFormMode] = useState(FORM_MODE_ENUM.PREVIEW);

    const { register, setValue, getValues, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onChange',
        defaultValues: {
            formData: {
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

    const getUserData = async (): Promise<void> => {
        // TODO problem with interface
        const { payload }: { payload: any } = await dispatch(fetchUser(+id));

        if (payload) {
            const {
                name,
                username,
                phone,
                address,
                email,
                company,
                website,
            } = payload;

            setValue('formData',{
                name,
                username,
                phone,
                address,
                email,
                company,
                website,
            });
        }
    }

    const onSubmit = (data: any) => console.log(data);

    const setFormToEditState = (): void => {
        setFormMode(FORM_MODE_ENUM.EDIT);
    }

    const isDisabledInput = (): boolean => formMode === FORM_MODE_ENUM.PREVIEW;

    useEffect( () => {
        setFormMode(mode);
        if (id) {
            void getUserData();
        }
    }, []);

    return (
        <div className="user-page flex-grow">
            <form className="user_page__form user-form" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="user-form__block">
                    <label className="user-form__block__label" htmlFor="formData.name">Name</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        {...register('formData.name')}
                    />
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.username">User Name</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        {...register('formData.username')}
                    />
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.phone">Phone</label>
                    <input
                        className="user-form__block__input"
                        disabled={isDisabledInput()}
                        {...register('formData.phone')}
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
                <div className="user-form__block">
                    { formMode === FORM_MODE_ENUM.ADD &&
                        <input type="submit" value="Submit" className="cursor-pointer" />  }
                    { formMode === FORM_MODE_ENUM.EDIT &&
                        <input type="submit" value="EDIT" className="cursor-pointer" />  }
                    { formMode === FORM_MODE_ENUM.PREVIEW
                        && <input
                            type="submit"
                            value="Click To Edit"
                            onClick={setFormToEditState}
                            className="cursor-pointer"
                        />  }
                </div>
            </form>
        </div>
    );
}

export default UserPage;
