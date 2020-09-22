import React, { useState, useEffect } from 'react';
import ModalFormPerson from './ModalFormPerson.js';
import ModalAdress from './ModalAdress.js';

import './App.css';

import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Thead from './components/thead';

import api from './services/api';

export default function App() {
    const [people     , setPeople]      = useState([])
         ,[nestedModal, setNestedModal] = useState(false)
         ,aColumnTitle                  = ['Nome', 'Data de Nascimento', 'Sexo', 'Estado Civil','Ações']
         ,aGender                       = [
                                            { id: 1, description: 'Masculino'},
                                            { id: 2, description: 'Feminino'}
                                          ]
         ,aMaritalStatus                = [
                                            { id: 1, description: 'Solteiro'}, 
                                            { id: 2, description: 'Casado'}, 
                                            { id: 3, description: 'Divorciado'}, 
                                            { id: 4, description: 'Viúvo'}
                                          ]

    useEffect(() => {
        api.get('people').then(response => {
            setPeople(response.data);
        })
    }, []);

    /**
     * Define quando a modal de parabenização abre ou fecha.
     */
    const toggleNested = () => {
        setNestedModal(!nestedModal);
    }

    /**
     * Mostra as informações da pessoa após a inserção.
     * @param {Date} oDateBirth 
     * @param {String} sPersonName 
     */
    const showPersonInfo = (oDateBirth, sPersonName) => {
        let oCurrentDate = new Date()
           ,iAge         = getAge(oCurrentDate, oDateBirth)
           ,sPrepAge     = iAge > 1 ? 'anos' : 'ano'
           ,sMessage     = '';

           oCurrentDate.setHours('00')
           oCurrentDate.setMinutes('00')
           oCurrentDate.setSeconds('00')           
           
           if((oCurrentDate.getDate() == oDateBirth.getDate()) && (oCurrentDate.getMonth() == oDateBirth.getMonth())) {
               sMessage = `<strong>Parabéns ${sPersonName}!</strong> Hoje é seu aniversário de ${iAge} ${sPrepAge}! 🎉`;
            }
            else {
                oDateBirth.setFullYear(new Date().getFullYear());
                (oDateBirth < oCurrentDate) ? oDateBirth.setFullYear(oDateBirth.getFullYear() + 1) : '';

                let iDifference = Math.ceil((oDateBirth.getTime() - oCurrentDate.getTime()) / (1000 * 60 * 60 * 24))
                   ,sPrepDiff   = iDifference > 1 ? 'restam' : 'resta'
                   ,sPrepDay    = iDifference > 1 ? 'dias'   : 'dia';

            sMessage = `${sPersonName} tem ${iAge} ${sPrepAge} e ${sPrepDiff} ${iDifference} ${sPrepDay} para o próximo aniversário!`;
        }

        toggleNested();
        document.querySelector('#info-person-message').innerHTML = sMessage;
    }

    /**
     * Retorna a idade.
     * @param {Date} oCurrentDate 
     * @param {Date} oDateBirth 
     */
    const getAge = (oCurrentDate, oDateBirth) => {
        let iAge = oCurrentDate.getFullYear() - oDateBirth.getFullYear();

        if (oCurrentDate.getMonth() < oDateBirth.getMonth() || oCurrentDate.getMonth() == oDateBirth.getMonth() && oCurrentDate.getDate() < oDateBirth.getDate()) {
            iAge--;
        }

        return iAge < 0 ? 0 : iAge;
    }

    /**
     * Realiza a inclusão dos dados da pessoa.
     * @param {Object} data 
     */
    async function handleAddPerson(data) {
        await api.post('people', data).then((resolve, rejected) => {
            showPersonInfo(new Date(`${resolve.data.dateBirth} 00:00:00`), resolve.data.name);
            setPeople([...people, resolve.data]);
        });
    }

    /**
     * Realiza a alteração dos dados da pessoa.
     * @param {String} id 
     * @param {Object} data 
     */
    async function handleAlterPerson(id, data) {
        const index    = people.findIndex(person => person.id == id)
             ,response = await api.put(`people/${id}`, data);

        if(!(index < 0)) {
            people[index] = response.data;
            setPeople([...people]);
        }
    }

    /**
     * Realiza a exclusão dos dados da pessoa informada.
     * @param {String} id 
     */
    async function handleDeletePerson(id) {
        const response = await api.delete(`people/${id}`);

        if(response.status == 204) {
            people.splice(people.findIndex(person => person.id === id), 1);
    
            setPeople([...people]);
        }
    }

    return (
        <div className="container-fluid">
            <Table dark striped size="lg">
                <Thead>
                    {aColumnTitle.map(column => <th key={column}>{column}</th>)}
                </Thead>
                <tbody>
                    {(people.map(person => (<tr key={person.id}>
                                                <td>{person.name}</td>
                                                <td>{person.dateBirth.split('-').reverse().join('/')}</td>
                                                <td>{aGender[aGender.findIndex(gender => gender.id == person.gender)].description}</td>
                                                <td>{aMaritalStatus[aMaritalStatus.findIndex(status => status.id == person.maritalStatus)].description}</td>
                                                <td>
                                                    <div className="btn-group">
                                                        <ModalAdress buttonLabel="Endereços" modalTitle="Endereços" buttonColor="info" modalAction="2" fncHandleAlterPerson={handleAlterPerson.bind(this)} idPerson={person.id}/>
                                                        <ModalFormPerson buttonLabel="Alterar" modalTitle="Alterar Pessoa" buttonColor="warning" modalAction="2" fncHandleAlterPerson={handleAlterPerson.bind(this)} personData={person}/>
                                                        <Button color="danger"  type="button" onClick={() => handleDeletePerson(person.id)}>Excluir</Button>
                                                    </div>
                                                </td>
                                            </tr>)))}
                </tbody>
            </Table>

            <ModalFormPerson buttonLabel="Incluir nova pessoa" modalTitle="Incluir Pessoa" buttonColor="success" modalAction="1" fncHandleAddPerson={handleAddPerson.bind(this)}/>

            <Modal isOpen={nestedModal} toggle={toggleNested}>
                <ModalHeader toggle={toggleNested}></ModalHeader>
                <ModalBody>
                    <p className="text-center" id="info-person-message"></p>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleNested}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}