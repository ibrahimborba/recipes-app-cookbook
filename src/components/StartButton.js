import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { updateToInProgress } from '../redux/actions';
import {
  getInProgressRecipes, getRecipesDone, updateRecipesDone, updateRecipeStatus,
} from '../services/mealsLocalSt';
import style from './StartButton.module.css';

function StartButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { path, params: { id: pathId } } = useRouteMatch();

  const {
    inProgress,
    currentRecipe,
    currentRecipe: { id, group },
    finishButtonDisabled,
  } = useSelector((state) => state.recipe);

  const [isToShow, setIsToShow] = useState(true);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    const recipes = getRecipesDone();

    if (recipes.length !== 0) {
      const hasRecipe = recipes.some(({ id: recipeId }) => recipeId === id);

      setIsToShow(!hasRecipe);
    }
  }, [id]);

  useEffect(() => {
    if (group) {
      const { [group]: recipes } = getInProgressRecipes();
      const hasRecipeInProgress = Object
        .keys(recipes)
        .some((recipeId) => recipeId === id);

      if (hasRecipeInProgress) {
        setButtonText('Continue Recipe');
      } else {
        setButtonText('Start Recipe');
      }
    }
  }, [id, group]);

  const getDate = () => {
    const date = new Date();

    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const goTo = ({ target: { name } }) => {
    let pathName = path;

    if (name === 'startBtn') {
      pathName = path.replace(':id', `${pathId}/in-progress`);
    } else if (name === 'finishBtn') {
      pathName = '/done-recipes';

      const {
        alcoholic, category, image, nationality, tags, title, type,
      } = currentRecipe;

      updateRecipesDone({
        id,
        type,
        nationality,
        category,
        alcoholicOrNot: alcoholic,
        name: title,
        image,
        doneDate: getDate(),
        tags,
      });

      dispatch(updateToInProgress(false));
      updateRecipeStatus(id, group, true);
    }
    console.log(pathId);

    history.push(pathName);
  };

  return (
    <div>
      {
        !inProgress
          ? (
            <div>
              {
                isToShow
                  && (
                    <button
                      className={ style.button }
                      data-testid="start-recipe-btn"
                      name="startBtn"
                      type="button"
                      onClick={ goTo }
                    >
                      { buttonText }
                    </button>
                  )
              }
            </div>
          )
          : (
            <button
              className={ style.button }
              data-testid="finish-recipe-btn"
              name="finishBtn"
              type="button"
              disabled={ finishButtonDisabled }
              onClick={ goTo }
            >
              Finish Recipe
            </button>
          )
      }
    </div>
  );
}

export default StartButton;
