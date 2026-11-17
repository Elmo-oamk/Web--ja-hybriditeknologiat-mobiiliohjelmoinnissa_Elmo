import React from 'react';
import { Appbar, Menu} from 'react-native-paper';
import { getHeaderTitle } from '@react-navigation/elements';
import { StackHeaderProps } from '@react-navigation/stack';




export default function CustomNavigationBar({ navigation, route, options, back }: StackHeaderProps) {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    const title = getHeaderTitle(options, route.name);

    return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={title} />
      {!back ? (
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}
        >
          <Menu.Item
            onPress={() => {
              console.log('Button 1 was pressed');
            }}
            title="Button 1"
          />
          <Menu.Item
            onPress={() => {
              console.log('Button 2 was pressed');
            }}
            title="Button 2"
          />
          <Menu.Item
            onPress={() => {
              console.log('Button 3 was pressed');
            }}
            title="Button 3"
            disabled
          />
        </Menu>
      ) : null}
    </Appbar.Header>
  );
}