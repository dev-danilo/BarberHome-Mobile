import React, { useRef, useCallback } from 'react';
import {
  Image, View, KeyboardAvoidingView, Platform, ScrollView, TextInput, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import getValidationsErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {
  Container,
  Title,
  BackToSignIn,
  BackToSignInText,
} from './styles';

interface SignUpFormData{
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().min(6, 'Mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        abortEarly: false, // mostra todos os erros de uma vez
      });

      // await api.post('/users', data);
      // history.push('/');

      Alert.alert(
        'Cadastro realizado!',
        'Você já pode fazer seu logon no GoBarber! 😃',
      );
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationsErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }
      // disparar toast
      Alert.alert(
        'Erro no cadastro',
        'Ocorreu um erro ao fazer cadastro, tente novamente. 🤔',
      );
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flex: 1 }}>
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu cadastro</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                /** primeira letra maiuscula apenas das palavras  */
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
                name="email"
                icon="mail"
                placeholder="E-mail"

                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Senha"
                textContentType="newPassword"
                /** oneTimeCode preenchimento do campo com recebimento de sms */
                secureTextEntry
                returnKeyType="send"
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />
              <Button onPress={() => {
                formRef.current?.submitForm();
              }}
              >
                Entrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
