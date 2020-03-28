import React from 'react';
import{Feather} from '@expo/vector-icons';
import{useNavigation, useRoute} from '@react-navigation/native';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import * as MailComposer from 'expo-mail-composer'

import logoImg from '../../assets/logo.png';

import styles from './styles'

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const account = route.params.account;
    const message = `Ola ${account.name}, estou entrando em contato pois gostaria de ajudar com a conta "${account.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(account.value)}`;
    
    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
      MailComposer.composeAsync({
               subject: `User: ${account.title}`,
               recipients: [account.email],
               body:  message
          });
             
            
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${account.whatsapp}=text=${message}`);

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
             <Image source={logoImg} />
              
              <TouchableOpacity onPress={navigateBack}>
                  <Feather name= 'arrow-left' size={28} color="#E02041" />
              </TouchableOpacity>
          </View>

          

          <View style={styles.account}>
              <Text style={styles.accountProperty, {marginTop: 0} }>USER</Text>
             <Text style={styles.accountValue}>{account.name} de {account.city}/{account.uf}</Text>

              <Text style={styles.accountProperty}>Conta</Text>
             <Text style={styles.accountValue}>{account.title}</Text>

             <Text style={styles.accountProperty}>Valor</Text>
             <Text style={styles.accountValue}>
                 {Intl.NumberFormat('pt-BR', {
                     style: 'currency',
                     currency: 'BRL'
                 }).format(account.value)}
                 </Text>   
          </View> 
         
          <View style={styles.contactBox}>
              <Text>Text style={styles.halseyTitle}> Gold Womans </Text>
              <Text style={styles.halseyTitle}> App feito com carinho </Text>
               
              <Text style={styles.halseyDescription}> Entre em contato: </Text>

              <View style={styles.actions}>
                  <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                      <Text style={styles.actionText}>Whatsapp</Text>
                  </TouchableOpacity>
                   
                  <TouchableOpacity style={styles.action} onPress={sendMail}>
                      <Text style={styles.actionText}>E-mail</Text>
                  </TouchableOpacity>
              </View>
            </View>
     </View>
    );
}