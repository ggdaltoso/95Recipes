import { useContext } from 'react';
import RecipeContext from './RecipeContext';

const useRecipes = () => useContext(RecipeContext);

export default useRecipes;
