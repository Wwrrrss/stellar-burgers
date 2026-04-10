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
  useNavigate,
  useLocation,
  useParams
} from 'react-router-dom';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect, useState } from 'react';
import { useDispatch } from '../../services/store';
import { fetchIngredients } from '../../services/constructorSlice/constructorSlice';
import { ProtectedRoute } from '../protected-route';
import { getUser } from '../../services/userSlice/userSlice';
import { fetchFeed } from '../../services/feedSlice/feedSlice';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const currentUrl = location.pathname;

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(getUser());
  }, []);

  const getNumber = (url: string, name: string) => {
    const feedIndex = url.indexOf(name);
    if (feedIndex !== -1) {
      let number = url.substring(feedIndex + name.length);
      while (number.length < 6) number = '0' + number;
      return number;
    }
    return '';
  };

  const [numberFeed, setNumberFeed] = useState('#');
  const [numberOrders, setNumberOrders] = useState('#');

  useEffect(() => {
    setNumberFeed('#' + getNumber(currentUrl, '/feed/'));
    setNumberOrders('#' + getNumber(currentUrl, '/profile/orders/'));
  }, [currentUrl]);

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
                  <div>
                    <p className='text text_type_digits-default'>
                      {numberFeed}
                    </p>
                    <OrderInfo />
                  </div>
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
                  <div>
                    <p className='text text_type_digits-default'>
                      {numberOrders}
                    </p>
                    <OrderInfo />
                  </div>
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
                    <div>
                      <p className='text text_type_digits-default'>
                        {numberOrders}
                      </p>
                      <OrderInfo />
                    </div>
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
                    <div>
                      <p className='text text_type_digits-default'>
                        {numberFeed}
                      </p>
                      <OrderInfo />
                    </div>
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
