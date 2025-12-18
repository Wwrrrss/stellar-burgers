import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Routes,
  Route,
  Navigate,
  BrowserRouter,
  useNavigate
} from 'react-router-dom';

import {
  AppHeader,
  BurgerConstructor,
  IngredientDetails,
  Modal,
  OrderInfo
} from '@components';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = true; // useSelector(isAuthCheckedSelector);
  const user = true; // useSelector(userDataSelector);

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate replace to='/login' />;
  }

  return children;
};

const App = () => {
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/');
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path='/feed/:number'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal title='' onClose={onClose}>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
