import React, {useEffect} from 'react';
import {Route, Outlet, Navigate, useMatch, useLocation} from 'react-router-dom';
import { useSelector  } from 'react-redux';
import {RootState} from '../store/store';

const PrivateRoutes = (prop: any) => {
    const { rights } = useSelector<RootState, { rights: number[] }>((state) => state.rights);

    const { pathname }: {pathname: string} = useLocation();

    const authCheck: Record<string, any> = {
        '/': (): boolean => { return rights.includes(100)},
        '/about': (): boolean => { return rights.includes(102)},
    }

    const isAccess = (): boolean => { return authCheck[pathname]()};

    console.log('isAccess', isAccess());

    return(
        isAccess() ? <Outlet/> : <Navigate to='/forbidden'/>
    )
}

export default PrivateRoutes;
