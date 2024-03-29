import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 130 : 40}px; /* nada encoste nas laterais */
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0 24px;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 40px;
`;

export const UserAvatarButton = styled.TouchableOpacity`
  margin-top: 72px;
`;

export const UserAvatar = styled.Image`
  width: 156px;
  height: 156px;
  border-radius: 100px;
  align-self: center;
`;

export const ButtonLogout = styled.TouchableOpacity`
  background: #ff0000;
  padding: 16px;
  border-radius: 10px;
  margin-top: 10px;
`;

export const ButtonText = styled.Text`
  align-self: center;
  font-family: 'RobotoSlab-Medium';
  color: #312e38;
  font-size: 18px;
`;
