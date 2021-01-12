import React from 'react';
import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  TouchableOpacity,
} from 'react-native';
import { RatingBottomModal } from './Modal';
import Stars from './Stars';

export interface IBook {
  title: string;
  author: string;
  source: ImageSourcePropType;
  rating: number;
}

export interface IToggleProps {
  toggleModal: () => void;
}

const Book = (props: IToggleProps & IBook) => {
  return (
    <View
      style={{
        justifyContent: 'flex-start',
        margin: 16,
        padding: 24,
        flex: 1,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { height: 6, width: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
      }}>
      <Image source={props.source} style={{ width: '80%', height: 150 }} />

      <View
        style={{
          width: '50%',
          height: 2,
          backgroundColor: '#ccc',
          marginVertical: 12,
        }}
      />

      <Text style={{ fontSize: 14, textAlign: 'center' }}>{props.title}</Text>

      <Text style={{ fontSize: 12, textAlign: 'center', color: '#636363' }}>
        {props.author}
      </Text>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>

      <TouchableOpacity
        style={{ flexDirection: 'row', marginVertical: 8 }}
        onPress={props.toggleModal}>
        <Stars offset={props.rating} starSize={16} distance={2} />
      </TouchableOpacity>
    </View>
    </View>
  );
};

export default Book;
