import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

test('renders triggers with accessible names', () => {
  render(
    <Tabs defaultValue="work">
      <TabsList>
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="work">工作内容</TabsContent>
      <TabsContent value="code">代码内容</TabsContent>
      <TabsContent value="map">地图内容</TabsContent>
    </Tabs>,
  );

  expect(screen.getByRole('tab', { name: 'Work' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Code' })).toBeInTheDocument();
  expect(screen.getByRole('tab', { name: 'Map' })).toBeInTheDocument();
});

test('shows only selected panel content', () => {
  render(
    <Tabs defaultValue="work">
      <TabsList>
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
      </TabsList>
      <TabsContent value="work">工作内容</TabsContent>
      <TabsContent value="code">代码内容</TabsContent>
    </Tabs>,
  );

  expect(screen.getByText('工作内容')).toBeInTheDocument();
  // inactive panel is not visible (Radix hides via `hidden`)
  expect(screen.queryByText('代码内容')).not.toBeInTheDocument();
});

test('switches panel via keyboard', async () => {
  const user = userEvent.setup();
  render(
    <Tabs defaultValue="work">
      <TabsList>
        <TabsTrigger value="work">Work</TabsTrigger>
        <TabsTrigger value="code">Code</TabsTrigger>
        <TabsTrigger value="map">Map</TabsTrigger>
      </TabsList>
      <TabsContent value="work">工作内容</TabsContent>
      <TabsContent value="code">代码内容</TabsContent>
      <TabsContent value="map">地图内容</TabsContent>
    </Tabs>,
  );

  const workTab = screen.getByRole('tab', { name: 'Work' });
  workTab.focus();
  await user.keyboard('{ArrowRight}');
  expect(screen.getByText('代码内容')).toBeInTheDocument();
});
