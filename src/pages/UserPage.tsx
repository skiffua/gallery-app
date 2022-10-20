import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/actions';
import { User } from '../api/type';

import './userPage.scss';

function UserPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { id } = useParams<Record<'id', string>>();

    const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm({
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
        console.log(payload);
        // reset({ name: payload.name! });

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

        console.log('payload', payload);
    }

    const onSubmit = (data: any) => console.log(data);

    useEffect( () => {
        if (id) {
            void getUserData();
        }
    }, []);

    return (
        <div className="user-page">
            <form className="user_page__form user-form" onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <div className="user-form__block">
                    <label className="user-form__block__label" htmlFor="formData.name">Name</label>
                    <input className="user-form__block__input" {...register('formData.name')} />
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.username">User Name</label>
                    <input className="user-form__block__input" {...register('formData.username')} />
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.phone">Phone</label>
                    <input className="user-form__block__input" {...register('formData.phone')} />
                </div>
                <div className="user-form__block">
                    <div>Address</div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Street</label>
                        <input className="user-form__block__input" {...register('formData.address.street')} />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Suite</label>
                        <input className="user-form__block__input" {...register('formData.address.suite')} />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">City</label>
                        <input className="user-form__block__input" {...register('formData.address.city')} />
                    </div>
                </div>
                <div className="user-form__block">
                    <div>Company</div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Company Name</label>
                        <input className="user-form__block__input" {...register('formData.company.name')} />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Phrase</label>
                        <input className="user-form__block__input" {...register('formData.company.catchPhrase')} />
                    </div>
                    <div>
                        <label className="user-form__block__label" htmlFor="formData.phone">Company Bs</label>
                        <input className="user-form__block__input" {...register('formData.company.bs')} />
                    </div>
                </div>
                <div>
                    <label className="user-form__block__label" htmlFor="formData.phone">WebSite</label>
                    <input className="user-form__block__input" {...register('formData.website')} />
                </div>
                <div className="user-form__block">
                    <input type="submit" />
                </div>
            </form>
        </div>
    );
}

export default UserPage;
