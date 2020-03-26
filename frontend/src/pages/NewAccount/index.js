import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function NewAccount() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    
    const history = useHistory();

    const userId = localStorage.getItem('userId');

    async function handleNewAccount(e) {
      e.preventDefault();

      const data = {
        title,
        description,
        value,
      };

      try {
        await api.post('accounts', data, {
            headers: {
                Authorization: userId
            }
        })

        history.push('/profile');
      } catch(err) {
          alert('Erro ao cadastrar caso, tente novamente');
      }
    }

    return(
        <div className="new-account-container">
          <div className="content">
             <section>
                 <img src={logoImg} alt="aureum"/>

                  <h1>Cadastrar nova conta</h1>
                  <p>Crie sua nova conta, quantas vezes quiser! </p>
             
                  <Link className= "back-link" to="/profile">
                     <FiArrowLeft size={16} color="#E02041"/>
                     Voltar para home
                 </Link>
              </section>

              <form onSubmit={handleNewAccount}>
                  <input 
                  placeholder= "User" 
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  />

                  <textarea 
                  placeholder="Descrição"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  />

                  <input
                   placeholder="Valor em reais" 
                   value={value}
                  onChange={e => setValue(e.target.value)}
                   />
               
                   <button className = "button" type= "submit">Cadastrar</button>
                </form>
           </div>
       </div>
    )
};