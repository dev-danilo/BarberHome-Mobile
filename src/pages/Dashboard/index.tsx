import { useNavigation } from '@react-navigation/native';
import _isEmpty from 'lodash/isEmpty';
import _map from 'lodash/map';
import _replace from 'lodash/replace';
import React, { useCallback, useEffect, useState } from 'react';
import Config from 'react-native-config';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  ProviderAvatar,
  ProviderContainer,
  ProviderInfo,
  ProviderMeta,
  ProviderMetaText,
  ProviderName,
  ProvidersList,
  ProvidersListTitle,
  UserAvatar,
  UserName
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}
const imageProfileNullProvider = 'https://i.pravatar.cc/350';
const Dashboard: React.FC = () => {
  const imageProfileNullUser = 'https://ui-avatars.com/api/?background=random';
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    let count = 10;
    api.get('/providers').then(response => {
      _map(response.data, User => {
        if (_isEmpty(response.data.avatar_url)) {
          response.data.avatar_url = `https://i.pravatar.cc/300?img=${count}`;
          count++;
        }
        let image = _replace(
          User.avatar_url,
          'http://localhost:3333',
          Config.API_URL,
        );
        if (__DEV__) {
          image = _replace(User.avatar_url, 'localhost', '10.0.2.2');
        }
        User.avatar_url = image;
      });

      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback(
    (providerId: string) => {
      navigate('CreateAppointment', { providerId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo,
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>
        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar
            source={{ uri: user.avatar_url || imageProfileNullUser }}
          />
        </ProfileButton>
      </Header>
      <ProvidersList
        data={providers}
        keyExtractor={provider => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer
            onPress={() => navigateToCreateAppointment(provider.id)}
          >
            <ProviderAvatar
              source={{ uri: provider.avatar_url || imageProfileNullProvider }}
            />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={13} color="#ff9000" />
                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={13} color="#ff9000" />
                <ProviderMetaText>8h às 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      />
    </Container>
  );
};

export default Dashboard;
