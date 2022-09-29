import React from 'react';
import { Outlet, Navigate, useLocation} from 'react-router-dom';
import { useSelector  } from 'react-redux';
import {RootState} from '../store/store';

const PrivateRoutes = () => {
    const { rights } = useSelector<RootState, { rights: number[] }>((state) => state.rights);

    const { pathname }: {pathname: string} = useLocation();

    const authCheck: Record<string, any> = {
        '/': (): boolean => { return rights.includes(100)},
        '/about': (): boolean => { return rights.includes(102)},
    }

    const isAccess = (): boolean => { return authCheck[pathname]()};

    return(
        isAccess() ? <Outlet/> : <Navigate to='/forbidden'/>
    )
}

export default PrivateRoutes;
