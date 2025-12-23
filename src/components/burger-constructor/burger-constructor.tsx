import { FC, useMemo } from 'react';
import { TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { postOrder, closeModal } from '../../services/constructorSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: useSelector((state) => state.homePage.bun),
    ingredients: useSelector((state) => state.homePage.selectedIngredients)
  };
  const orderRequest = useSelector((state) => state.homePage.orderRequest);
  const orderModalData = useSelector((state) => state.homePage.orderModalData);
  const user = useSelector((state) => state.user.user);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) navigate('/login');
    dispatch(postOrder());
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };
  // constructorItems.ingredients.map((e) => e._id)
  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
