import React, { useRef, createContext, useContext } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import DropDownAlert from 'react-native-dropdownalert';

const DropDownContext = createContext({});

export const DropDownComponentProvider = ({ children }) => {
  let ref = useRef(null);

  return (
    <DropDownContext.Provider value={{ ref }}>
      {children}
      <DropDownAlert
        defaultContainer={styles.dropDownAlerContainer}
        ref={ref}
        updateStatusBar={false}
      />
    </DropDownContext.Provider>
  );
}

export const useDropDown = () => useContext(DropDownContext);

const styles = StyleSheet.create({
  dropDownAlerContainer: {
    padding: 15,
    marginHorizontal: 20,
    marginVertical: StatusBar.currentHeight + 5,
    borderRadius: 15,
  },
});
