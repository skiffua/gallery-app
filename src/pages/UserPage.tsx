import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { AppDispatch } from '../store/store';
import { fetchUser } from '../store/actions';
import { User } from '../api/type';

function UserPage() {
    const dispatch = useDispatch<AppDispatch>();
    // const [user, setUser] = useState<User | null>(null);
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

    // const getInputValue = (key: keyof User): string => {
    //     console.log(user && key in user);
    //
    //     if (user && key in user) {
    //         return `${user[key]}`;
    //     }
    //
    //     return '';
    // }

    // useEffect( () => {
    //     if (user) {
    //         setValue('formData.name', user.name);
    //     }
    // }, [user]);

    useEffect( () => {
        if (id) {
            void getUserData();
        }
    }, []);

    return (
        <div className="users_page">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input {...register('formData.name')} />
                <input {...register('formData.username')} />
                <input {...register('formData.phone')} />
                <div>
                    <div>Address</div>
                    <input {...register('formData.address.street')} />
                    <input {...register('formData.address.suite')} />
                    <input {...register('formData.address.city')} />
                    <input {...register('formData.email')} />
                </div>
                <div>
                    <div>Company</div>
                    <input {...register('formData.company.name')} />
                    <input {...register('formData.company.catchPhrase')} />
                    <input {...register('formData.company.bs')} />
                    <input {...register('formData.website')} />
                </div>

                {/*/!* include validation with required or other standard HTML validation rules *!/*/}
                {/*<input {...register('exampleRequired', { required: true })} />*/}
                {/*/!* errors will return when field validation fails  *!/*/}
                {/*{errors.exampleRequired && <span>This field is required</span>}*/}

                <input type="submit" />
            </form>
        </div>
    );
}

export default UserPage;
