import { useRouter } from 'next/router';
import jscookie from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CHECK_ACCESS } from '@libs/redux/modules/user/actions';

const withAuth = (WrappedComponent: any) => {
  return (props: any) => {
    // Hooks
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
      const accessToken = jscookie.get('access');
      if (!accessToken) {
        router.replace('/signin');
      } else {
        dispatch({ type: CHECK_ACCESS });
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
