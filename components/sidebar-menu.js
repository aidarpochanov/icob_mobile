// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React, { useContext } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
  Alert
} from 'react-native';
import AuthContext from './auth/context';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function CustomSidebarMenu(props){
  const { logOut } = useContext(AuthContext) 

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      {/* <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      /> */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Sign Out"
          onPress={() => Alert.alert(
                                      "Sign out?",
                                      "Are you sure you want to sign out?",
                                      [{text: "Sign out",
                                       onPress: () => logOut()
                                      },
                                      {text: 'Cancel', onPress: () => {}, style: 'cancel'}],
                                      {cancelable: true}
                                    )}
        />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;
