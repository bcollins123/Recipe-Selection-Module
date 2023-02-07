import React from 'react';
import ThemeProvider from '../../components/ThemeProvider';
import RecipeCard from './RecipeCard';
import { act, render, screen } from '@testing-library/react';

const mockAddRecipe = jest.fn();
const mockRemoveRecipe = jest.fn();

const mockRecipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 1,
  selectionLimit: 3,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: false,
  minRecipesSelected: false,
};

const mockPlusDisabledRecipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 3,
  selectionLimit: 3,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: false,
  minRecipesSelected: false,
};

const mockMinusHiddenRecipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 0,
  selectionLimit: 3,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: false,
  minRecipesSelected: false,
};

const mockExtraMealRecipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 0,
  selectionLimit: null,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: false,
  minRecipesSelected: true,
};

const mockExtraMeal2Recipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 0,
  selectionLimit: 3,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: false,
  minRecipesSelected: false,
};

const mockAllDisabledRecipe = {
  id: '5f4d4a7e62fb0224951e7ec4',
  name: 'Chicken Sausage & Spinach Ravioli',
  slug: 'chicken-sausage-spinach-ravioli',
  headline: 'with Tomato & Lemon',
  image:
    'https://img.hellofresh.com/c_fill,f_auto,fl_lossy,h_405,q_auto,w_720/hellofresh_s3/image/5f4d4a7e62fb0224951e7ec4-2fe03fc2.jpg',
  selected: 0,
  selectionLimit: 3,
  extraCharge: 1198,
  yields: 2,
  maxRecipesSelected: true,
  minRecipesSelected: true,
};

const RecipeCardFactory = (mockRecipe) => {
  render(
    <ThemeProvider>
      <RecipeCard
        {...mockRecipe}
        handleAddRecipe={mockAddRecipe}
        handleRemoveRecipe={mockRemoveRecipe}
      />
    </ThemeProvider>
  );
};

describe('RecipeCard', () => {
  it('should render recipe card', () => {
    RecipeCardFactory(mockRecipe);
    expect(screen.getByTestId('recipe-image')).toHaveAttribute('src', mockRecipe.image);
    expect(screen.getByTestId('recipe-name')).toHaveTextContent(mockRecipe.name);
    expect(screen.getByTestId('recipe-headline')).toHaveTextContent(mockRecipe.headline);
    expect(screen.getByTestId('recipe-selected-count')).toHaveTextContent(
      `${mockRecipe.selected} in your box`
    );
    expect(screen.getByTestId('recipe-yields')).toHaveTextContent(
      `(${mockRecipe.yields} servings)`
    );
  });

  it('should render recipe card', () => {
    RecipeCardFactory(mockRecipe);
    expect(screen.getByTestId('recipe-image')).toHaveAttribute('src', mockRecipe.image);
    expect(screen.getByTestId('recipe-name')).toHaveTextContent(mockRecipe.name);
    expect(screen.getByTestId('recipe-headline')).toHaveTextContent(mockRecipe.headline);
    expect(screen.getByTestId('recipe-selected-count')).toHaveTextContent(
      `${mockRecipe.selected} in your box`
    );
    expect(screen.getByTestId('recipe-yields')).toHaveTextContent(
      `(${mockRecipe.yields} servings)`
    );
  });

  it('Click add recipe button', () => {
    RecipeCardFactory(mockRecipe);
    act(() => screen.getByTestId('button-add-recipe').click());
    expect(mockAddRecipe).toHaveBeenCalled();
  });

  it('Click remove recipe button', () => {
    RecipeCardFactory(mockRecipe);
    act(() => screen.getByTestId('button-remove-recipe').click());
    expect(mockRemoveRecipe).toHaveBeenCalled();
  });

  it('Recipe add button should be disabled', () => {
    RecipeCardFactory(mockPlusDisabledRecipe);
    expect(screen.getByTestId('button-add-recipe')).toBeDisabled();
  });

  it('Recipe remove button should be hidden', () => {
    RecipeCardFactory(mockMinusHiddenRecipe);
    expect(screen.queryByTestId('button-remove-recipe')).toBeNull();
    act(() => screen.getByTestId('button-add-recipe').click());
    expect(mockAddRecipe).toHaveBeenCalled();
  });

  it('Extra charge price should be visible on card footer', () => {
    RecipeCardFactory(mockMinusHiddenRecipe);
    expect(screen.getByTestId('recipe-extra-charge')).toHaveTextContent(
      `$${mockMinusHiddenRecipe.extraCharge / 100}`
    );
  });

  it('Should show ADD EXTRA MEAL button', () => {
    RecipeCardFactory(mockExtraMealRecipe);
    expect(screen.getByTestId('button-add-recipe')).toHaveTextContent("Add extra meal");
  });

  it('Should show ADD button', () => {
    RecipeCardFactory(mockExtraMeal2Recipe);
    expect(screen.getByTestId('button-add-recipe')).toHaveTextContent("Add");
  });

  it('All add recipe buttons should be disabled', () => {
    RecipeCardFactory(mockAllDisabledRecipe);
    expect(screen.getByTestId('button-add-recipe')).toBeDisabled();
  });
});
