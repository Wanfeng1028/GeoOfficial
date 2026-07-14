import { render, screen } from '@testing-library/react';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from './NavigationMenu';

test('renders navigation links with accessible names', () => {
  render(
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuLink href="/product">产品</NavigationMenuLink>
      </NavigationMenuList>
    </NavigationMenu>,
  );

  expect(screen.getByRole('link', { name: '产品' })).toHaveAttribute('href', '/product');
});
