import React, { useState, useEffect } from 'react';

import { Button, Table, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import ModalFormAdress from './ModalFormAdress.js';

import Thead from './components/thead';

import api from './services/api';

export default function ModalAdress({buttonLabel, buttonColor, className, fncHandleAddadress, fncHandleAlteradress, idPerson, modalAction, modalTitle}) {
    const [adresses, setAdresses] = useState([])
         ,[modal   , setModal]    = useState(false)
         ,[keyboard, setKeyboard] = useState(true)
         ,aColumnTitle            = ['CEP', 'Endereço', 'Número', 'Complemento', 'Estado', 'Cidade', 'Ações']

    useEffect(() => {
        api.get(`adresses?idPerson=${idPerson}`).then(response => {
            setAdresses(response.data);
            console.log(idPerson)
        })
    }, []);
    
    /**
     * Define quando a modal abre ou fecha.
     */
    const toggle = () => setModal(!modal);

    /**
     * Realiza a inclusão dos dados do endereço.
     * @param {Object} data 
     */
    async function handleAddAdress(data) {
        const response = await api.post('adresses', data);

        setAdresses([...adresses, response.data]);
    }

    /**
     * Realiza a alteração dos dados do endereço.
     * @param {Object} param 
     */
    async function handleAlterAdress({ id, data}) {
        const index    = adresses.findIndex(adress => adress.id == id)
             ,response = await api.put(`adresses/${id}`, data);

        if(!(index < 0)) {
            adresses[index] = response.data;
            setAdresses([...adresses]);
        }
    }

    /**
     * Realiza a exclusão dos dados do endereço informado.
     * @param {String} id 
     */
    async function handleDeleteAdress(id) {
        const response = await api.delete(`adresses/${id}`);

        if(response.status == 204) {
            adresses.splice(adresses.findIndex(adress => adress.id === id), 1);
    
            setAdresses([...adresses]);
        }
    }

    return (
        <div>
            <Button color={buttonColor} onClick={toggle}>{buttonLabel}</Button>
            <Modal size="xl" isOpen={modal} toggle={toggle} className={className} keyboard={keyboard} >
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <Table dark size="sm" responsive>
                        <Thead>
                            {aColumnTitle.map(column => <th key={column}>{column}</th>)}
                        </Thead>
                        <tbody>

                            {(adresses.map(adress => (<tr key={adress.id}>
                                                        <td>{adress.zipCode}</td>
                                                        <td>{adress.adress}</td>
                                                        <td>{adress.number}</td>
                                                        <td>{adress.complement}</td>
                                                        <td>{adress.state}</td>
                                                        <td>{adress.city}</td>
                                                        <td>
                                                            <div className="btn-group">
                                                                <ModalFormAdress buttonColor="warning" modalTitle="Alterar Endereço" buttonLabel="Alterar" adressData={adress} modalAction="2" fncHandleAlter={handleAlterAdress.bind(this)}/>
                                                                <Button size="sm" color="danger" type="button" onClick={() => handleDeleteAdress(adress.id)}>Excluir</Button>
                                                            </div>
                                                        </td>
                                                    </tr>)))}
                        </tbody>
                    </Table>
                    <ModalFormAdress buttonColor="success" modalTitle="Incluir Endereço" buttonLabel="Incluir novo endereço" idPerson={idPerson} modalAction="1" fncHandleAdd={handleAddAdress.bind(this)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}