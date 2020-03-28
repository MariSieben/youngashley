import React, {useState, useEffect} from 'react';
import{Feather} from '@expo/vector-icons';
import{useNavigation} from'@react-navigation/native';
import {View,FlatList, Image, Text, TouchableOpacity} from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Accounts() {
    const[accounts, setAccounts] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    
    const navigation = useNavigation();

    function navigateToDetail(account) {
       navigation.navigate('Detail', {account});
    }
  
    async function loadAccounts() {
      if (loading) {
        return;
      }

      if(total > 0 && account.length == total) {
        return;
      }
      
      setLoading(true);

      const response = await api.get('accounts', {
        params: { page}
      });
  
      setAccounts([...accounts, ...response.data]);
      setTotal(response.headers['x-total-count']);
      setPage(page +1);
      setLoading(false);
    }

    useEffect(()=> {
       loadAccounts();
    }, [])
    
    return (
      <View style={styles.container}>
          <View style={styles.header}>
             <Image source={logoImg} />
             <Text style={styles.headerText}>
                 Total de <Text style={styles.headerTextBold}>{total}</Text>
             </Text>
          </View>
         
          <Text style={styles.title}>Bem-vinda!</Text>
          <Text syle={styles.description}>Escolha uma de suas contas para logar!</Text>
            
           <FlatList 
             data={[accounts]}
             style={styles.accountList}
             keyExtractor={account => String(account.id)}
             showsVerticalScrollIndicator={false}
             onEndReached={loadAccounts}
             onEndReachedThreshold={0.2}
             renderItem={({item: account})=> (
                 <View style={styles.account}>
                     <Text style={styles.accountProperty}>USER</Text>
             <Text style={styles.accountValue}>{account.name}</Text>

                     <Text style={styles.accountProperty}>Conta</Text>
                      <Text style={styles.accountValue}>{account.title}</Text>

                      <Text style={styles.accountProperty}>Valor</Text>
             <Text style={styles.accountValue}>
               {Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL'
                 }).format(account.value)}
              </Text>
            
                      <TouchableOpacity 
                          style={styles.detailsButton} 
                         onPress={() => navigateToDetail (account)}
                       >
                          <Text style ={styles.detailsButtonText}>Ver mais detalhes da conta</Text>
                         <Feather name="arrow-right" size={16} color="#E02041" />
                      </TouchableOpacity>
                 </View>
               )}  
            />   
      </View>
    );
       
          
        
    
    
    
}
