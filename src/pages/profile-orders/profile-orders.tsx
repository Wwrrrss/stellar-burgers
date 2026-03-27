import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/userSlice';
import { fetchFeed } from '../../services/feedSlice';
import { useNavigate } from 'react-router-dom';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders: TOrder[] = useSelector((state) => state.user.orders);
  const isOrdersLoading = useSelector((state) => state.user.isOrdersLoading);

  useEffect(() => {
    dispatch(fetchFeed());
    dispatch(getOrders());
  }, []);

  if (isOrdersLoading) return <Preloader />;

  return <ProfileOrdersUI orders={orders} />;
};
