import React,{ useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
   const[accounts, setAccounts] = useState([]);

   const history = useHistory();

   const userId = localStorage.getItem('userId');
   const userName = localStorage.getItem('userName');

   useEffect(()=> {
     api.get('profile', {
        headers: {
           Authorization: userId
        }
     }).then(response=> {
       setAccounts(response.data)
     })
   }, [userId]);

    async function handleDeleteAccount(id) {
       try {
          await api.delete(`accounts/${id}`, {
              headers: {
                Authorization: userId,
               }
          });   

          setAccounts(accounts.filter(account => account.id !== id));
         }catch(err) {
          alert('Erro ao deletar conta, tente novamente.');
         }
      }
     
      function handleLogout(){
       localStorage.clear();

       history.push('/');
      }

   return (
      <div className="profile-container">
          <header>
                <img src={logoImg} alt = "aureum" />
                <span>Bem vinda, {userName} </span>

              <Link className ="button" to="/accounts/new">Cadastrar novo User</Link>
              <button onClick={handleLogout} type="button">
                  <FiPower size={18} color="#E02041" />
             </button>
          </header>
          
           <h1>Contas Cadastradas</h1>
          
           <ul>
              {accounts.map(account =>(     
                <li key={account.id}>
                   <strong>Conta:</strong>
                   <p>{account.title}</p>
 
                   <strong>DESCRIÇÃO:</strong>
                   <p>{account.description}</p>
 
                   <strong>Valor:</strong>
                   <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(account.value)}</p>
 
                   <button onClick={() => handleDeleteAccount(account.id)} type="button" >
                      <FiTrash2 size={20} collor="#a8a8b3"/>
                   </button>
                 </li> 
 
                
 
 
               ))}
           </ul>
      </div>
    );
}