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
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/constructorSlice';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../services/userSlice';
import { fetchFeed } from '../../services/feedSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
    dispatch(fetchFeed());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='*' element={<NotFound404 />} />
        <Route
          path='/login'
          element={<ProtectedRoute onlyUnAuth component={<Login />} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute onlyUnAuth component={<Register />} />}
        />
        <Route
          path='/forgot-password'
          element={<ProtectedRoute onlyUnAuth component={<ForgotPassword />} />}
        />
        <Route
          path='/reset-password'
          element={<ProtectedRoute onlyUnAuth component={<ResetPassword />} />}
        />
        <Route
          path='/profile'
          element={<ProtectedRoute component={<Profile />} />}
        />
        <Route
          path='/profile/orders'
          element={<ProtectedRoute component={<ProfileOrders />} />}
        />
        <Route
          path='/feed/:number'
          element={
            <ProtectedRoute
              component={
                <Modal
                  title=''
                  onClose={() => {
                    navigate('/feed');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <ProtectedRoute
              component={
                <Modal
                  title='Детали ингредиента'
                  onClose={() => {
                    navigate('/');
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute
              component={
                <Modal
                  title=''
                  onClose={() => {
                    navigate('/profile/orders');
                  }}
                >
                  <OrderInfo />
                </Modal>
              }
            />
          }
        />
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <ProtectedRoute
                component={
                  <Modal
                    title='Детали ингредиента'
                    onClose={() => navigate(-1)}
                  >
                    <IngredientDetails />
                  </Modal>
                }
              />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute
                component={
                  <Modal
                    title=''
                    onClose={() => {
                      navigate(-1);
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
          <Route
            path='/feed/:number'
            element={
              <ProtectedRoute
                component={
                  <Modal
                    title=''
                    onClose={() => {
                      navigate(-1);
                    }}
                  >
                    <OrderInfo />
                  </Modal>
                }
              />
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
