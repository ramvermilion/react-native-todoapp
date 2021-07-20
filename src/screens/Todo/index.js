import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Alert,
  Keyboard,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import reducer from '../../reducer';
import styles from '../../styles';

function TODO() {
  const [inputText, setInputText] = useState('');
  const [listItems, setListItems] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    counter: 0,
    modalState: false,
  });

  const {counter, modalState} = state;

  const showModal = () => {
    Keyboard.dismiss();
    dispatch({type: 'modal', payload: true});
    setInputText('');
  };

  const AlertSection = text => {
    return Alert.alert(
      null,
      text,
      [
        {
          text: 'Ok',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const addList = () => {
    if (inputText !== '') {
      setListItems(listItems => [
        ...listItems,
        {value: inputText, id: Math.random().toString()},
      ]);
      setInputText('');
      dispatch({type: 'count', payload: 1});
    } else {
      AlertSection('Please Input Value');
    }
  };

  const removeItem = item => {
    setListItems(listItems => {
      return listItems.filter(listedItems => listedItems.id != item.id);
    });
    dispatch({type: 'count', payload: -1});
  };

  const clearItems = () => {
    setListItems([]);
    dispatch({type: 'count', payload: 0});
    AlertSection('List items Cleared');
  };

  useEffect(() => {
    if (listItems.length === 0) dispatch({type: 'modal', payload: false});
  }, [listItems]);

  return (
    <View style={styles.wrap}>
      <View style={styles.todoWrap}>
        <Text style={styles.header}>Todo List</Text>
        <View style={styles.inputWrap}>
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={value => setInputText(value)}
            placeholder="Enter your Task"
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={addList}
            style={styles.buttonWrap}>
            <Text style={styles.button}>Add Me</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.counter}>
          Items Pending: {counter}{' '}
          {counter != 0 ? (
            <Icon
              name="frown"
              style={[styles.icon, styles.counterIcon]}
              size={30}
              color="#000"
            />
          ) : (
            <Icon
              name="smile"
              style={[styles.icon, styles.counterIcon]}
              size={30}
              color="#000"
            />
          )}
        </Text>
        <View style={styles.buttonTodoWrap}>
          <TouchableOpacity activeOpacity={0.5} onPress={showModal}>
            <Text style={styles.buttonCta}>SHOW</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={clearItems}
            onPress={() => setInputText('')}>
            <Text style={[styles.buttonCta, styles.colorCta]}>CLEAR</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={modalState}
        animationType="fade"
        onRequestClose={() => {
          dispatch({type: 'modal', payload: false});
        }}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => dispatch({type: 'modal', payload: false})}>
            <Icon
              name="times-circle"
              style={styles.icon}
              size={30}
              color="#000"
            />
          </TouchableOpacity>
          <SafeAreaView style={{flex: 1}}>
            <Text style={styles.heading}>Added Items</Text>
            <FlatList
              data={listItems}
              style={styles.itemList}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity onPress={removeItem.bind(this, item)}>
                  <Text style={styles.date}>
                    {new Date().toISOString().split('T')[0]}
                  </Text>
                  <Text style={styles.items} id={item.id}>
                    {item.value}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </SafeAreaView>
        </View>
      </Modal>
    </View>
  );
}

export default TODO;
