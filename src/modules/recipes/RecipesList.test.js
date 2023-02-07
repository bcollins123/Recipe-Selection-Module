import React from 'react';
import ThemeProvider from '../../components/ThemeProvider';
import RecipesList from './RecipesList';
import { act, render, screen, waitForElement } from '@testing-library/react';
import hellofreshBox from '../../data/hellofreshBox';

const RecipesListFactory = async () => {
  render(
    <ThemeProvider>
      <RecipesList />
    </ThemeProvider>
  );
  await waitForElement(() => screen.getByTestId('recipes-list'));
};

describe('RecipeList', () => {
  it('should render recipe list', async () => {
    await RecipesListFactory();
    expect(screen.getByTestId('recipes-list').childNodes).toHaveLength(6);
    act(() => screen.getByTestId('button-load-more').click());
    expect(screen.getByTestId('recipes-list').childNodes).toHaveLength(12);
    act(() => screen.getByTestId('button-load-more').click());
    expect(screen.getByTestId('recipes-list').childNodes).toHaveLength(18);
    act(() => screen.getByTestId('button-load-more').click());
    expect(screen.getByTestId('recipes-list').childNodes).toHaveLength(hellofreshBox.recipes.length);
  });

  it('check total price', async () => {
    await RecipesListFactory();
    expect(screen.getByTestId('text-total-price')).toHaveTextContent("$66.92");
  });
});
