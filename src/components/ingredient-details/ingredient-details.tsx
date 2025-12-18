import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  const ingredientModalData = useSelector((state) =>
    state.homePage.allingredients.find((e) => e._id === id)
  );

  if (!ingredientModalData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientModalData} />;
};
