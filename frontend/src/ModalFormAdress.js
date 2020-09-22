import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

export default function ModalFormAdress({buttonLabel, buttonColor, className, fncHandleAdd, fncHandleAlter, idPerson, adressData, modalAction, modalTitle}) {
    const [modal   , setModal]    = useState(false)
         ,[keyboard, setKeyboard] = useState(true);

    /**
     * Define quando a modal abre ou fecha.
     */
    const toggle = () => setModal(!modal);

    const onOpenedModal = () => {
        if(adressData) {
            document.querySelector('#zipCode').value    = adressData.zipCode; 
            document.querySelector('#adress').value     = adressData.adress; 
            document.querySelector('#number').value     = adressData.number; 
            document.querySelector('#complement').value = adressData.complement;
            document.querySelector('#state').value      = adressData.state;
            document.querySelector('#city').value       = adressData.city;
        }
    }

    /**
     * Realiza o processamento dos dados.
     */
    const processData = () => {
        let oZipCode    = document.querySelector('#zipCode')
           ,oAdress     = document.querySelector('#adress')
           ,oNumber     = document.querySelector('#number')
           ,oComplement = document.querySelector('#complement')
           ,oState      = document.querySelector('#state')
           ,oCity       = document.querySelector('#city')

        if(validateAdressData(oZipCode, oAdress, oNumber, oComplement, oState, oCity)) {
            let oAdressData = {person_id : idPerson || adressData.person_id
                              ,zipCode   : oZipCode.value
                              ,adress    : oAdress.value
                              ,number    : oNumber.value
                              ,complement: oComplement.value
                              ,state     : oState.value
                              ,city      : oCity.value};

            modalAction == 1 ? fncHandleAdd(oAdressData) : fncHandleAlter({id: adressData.id, data: oAdressData})
            toggle();
        }
    }

    /**
     * Valida os campos do formulário.
     * @param {Object} oZipCode 
     * @param {Object} oAdress 
     * @param {Object} oNumber 
     * @param {Object} oComplement 
     * @param {Object} oState 
     * @param {Object} oCity 
     * @return boolean
     */
    const validateAdressData = (oZipCode, oAdress, oNumber, oComplement, oState, oCity) => {
        let bValid = true;

        if(!checkTextInput(oZipCode) || isNaN(oZipCode.value)) {
            bValid = false;
        }

        if(!checkTextInput(oAdress)) {
            bValid = false;
        }

        if(!checkTextInput(oNumber)) {
            bValid = false;
        }

        if(!checkTextInput(oComplement)) {
            bValid = false;
        }

        if(!checkTextInput(oState)) {
            bValid = false;
        }

        if(!checkTextInput(oCity)) {
            bValid = false;
        }

        return bValid;
    }

    /**
     * Checa se o input informado é válido.
     * @param {Object} oInput 
     * @return boolean
     */
    const checkTextInput = (oInput) => {
        let bCheck = true;

        if(oInput.value.trim() == "") {
            bCheck = false;
        }

        oInput.setAttribute('class', `${bCheck ? 'is-valid' : 'is-invalid'} form-control`);

        return bCheck;
     }


    return (
        <div>
            <Button size="sm" color={buttonColor} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} backdrop="static" keyboard={keyboard} onOpened={onOpenedModal}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FormGroup>
                            <Label for="cep">CEP:</Label>
                            <Input type="text" name="zipCode" id="zipCode" maxLength="7"/>
                            <FormFeedback invalid="true">O campo CEP é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="endereco">Endereço:</Label>
                            <Input type="text" name="adress" id="adress"/>
                            <FormFeedback invalid="true">O campo endereço é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="numero">Número:</Label>
                            <Input type="text" name="number" id="number"/>
                            <FormFeedback invalid="true">O campo número é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="complemento">Complemento:</Label>
                            <Input type="text" name="complement" id="complement"/>
                            <FormFeedback invalid="true">O campo complemento é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="estado">Estado:</Label>
                            <Input type="select" name="state" id="state">
                                <option value="">Selecione...</option>
                                <option value="AC">Acre</option>
                                <option value="AL">Alagoas</option>
                                <option value="AP">Amapá</option>
                                <option value="AM">Amazonas</option>
                                <option value="BA">Bahia</option>
                                <option value="CE">Ceará</option>
                                <option value="DF">Distrito Federal</option>
                                <option value="ES">Espirito Santo</option>
                                <option value="GO">Goiás</option>
                                <option value="MA">Maranhão</option>
                                <option value="MS">Mato Grosso do Sul</option>
                                <option value="MT">Mato Grosso</option>
                                <option value="MG">Minas Gerais</option>
                                <option value="PA">Pará</option>
                                <option value="PB">Paraíba</option>
                                <option value="PR">Paraná</option>
                                <option value="PE">Pernambuco</option>
                                <option value="PI">Piauí</option>
                                <option value="RJ">Rio de Janeiro</option>
                                <option value="RN">Rio Grande do Norte</option>
                                <option value="RS">Rio Grande do Sul</option>
                                <option value="RO">Rondônia</option>
                                <option value="RR">Roraima</option>
                                <option value="SC">Santa Catarina</option>
                                <option value="SP">São Paulo</option>
                                <option value="SE">Sergipe</option>
                                <option value="TO">Tocantins</option>
                            </Input>
                            <FormFeedback invalid="true">O campo estado é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="cidade">Cidade:</Label>
                            <Input type="text" name="city" id="city"/>
                            <FormFeedback invalid="true">O campo cidade é inválido.</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={processData}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );

}