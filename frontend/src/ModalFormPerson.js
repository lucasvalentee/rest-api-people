import React, { useState } from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';

export default function ModalFormPerson({buttonLabel, buttonColor, className, fncHandleAddPerson, fncHandleAlterPerson, personData, modalAction, modalTitle}) {
    const [modal      , setModal]    = useState(false)
         ,[keyboard   , setKeyboard] = useState(true);

    /**
     * Define quando a modal abre ou fecha.
     */
    const toggle = () => setModal(!modal);

    /**
     * Preenche os campos ao abrir a tela.
     */
    const onOpenedModal = () => {
        if(personData) {
            document.querySelector('#name').value          = personData.name;
            document.querySelector('#dateBirth').value     = personData.dateBirth;
            document.querySelector('#gender').value        = personData.gender;
            document.querySelector('#maritalStatus').value = personData.maritalStatus;
        }
    }

    /**
     * Realiza o processamento dos dados ao submitar.
     */
    const processData = () => {
        let oName          = document.querySelector('#name')
           ,oDateBirth     = document.querySelector('#dateBirth')
           ,oGender        = document.querySelector('#gender')
           ,oMaritalStatus = document.querySelector('#maritalStatus')

           if(validatePersonData(oName, oDateBirth, oGender, oMaritalStatus)) {
            let oPersonData = {name         : oName.value
                              ,dateBirth    : oDateBirth.value
                              ,gender       : oGender.value 
                              ,maritalStatus: oMaritalStatus.value};

            modalAction == 1 ? fncHandleAddPerson(oPersonData) : fncHandleAlterPerson(personData.id, oPersonData)
            toggle();
        }
    }

    /**
     * Valida os campos do formulário.
     * @param {Object} oName 
     * @param {Object} oDateBirth 
     * @param {Object} oGender 
     * @param {Object} oMaritalStatus 
     * @return boolean
     */
    const validatePersonData = (oName, oDateBirth, oGender, oMaritalStatus) => {
        let bValid = true;

        if(!checkTextInput(oName, 'text')) {
            bValid = false;
        }

        if(!checkTextInput(oDateBirth, 'date')) {
            bValid = false;
        }

        if(!checkTextInput(oGender, 'select')) {
            bValid = false;
        }

        if(!checkTextInput(oMaritalStatus, 'select')) {
            bValid = false;
        }

        return bValid;
    }

    /**
     * Checa se o input informado é válido, conforme o tipo recebido.
     * @param {Object} oInput 
     * @param {String} sType
     * @return boolean 
     */
    const checkTextInput = (oInput, sType) => {
        let bCheck = true;
           
        switch(sType) {
            case 'text':
                if(oInput.value.trim() == "") {
                    bCheck = false;
                }
            break;
            case 'select':
                if(oInput.value < 1) {
                    bCheck = false;
                }
            break;
            case 'date':
                if(!isValidDate(oInput.value)) {
                    bCheck = false;
                }
            break;
        }

        oInput.setAttribute('class', `${bCheck ? 'is-valid' : 'is-invalid'} form-control`);

       return bCheck;
    }

    /**
     * Retorna se a data informada é válida.
     * @param {String} date 
     * @return boolean
     */
    const isValidDate = (date) => {
        return date == 'dd/mm/yyyy' || ( /^\d{4}\-\d{2}\-\d{2}$/.test(date) && new Date(date).getTime() );
    }

    return (
        <div>
            <Button color={buttonColor} onClick={toggle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} backdrop="static" keyboard={keyboard} onOpened={onOpenedModal}>
                <ModalHeader toggle={toggle}>{modalTitle}</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <FormGroup>
                            <Label for="nome">Nome:</Label>
                            <Input type="text" name="name" id="name"/>
                            <FormFeedback invalid="true">O campo nome é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="data">Data de Nascimento</Label>
                            <Input type="date" name="dateBirth" id="dateBirth"/>
                            <FormFeedback invalid="true">O campo data de nascimento é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="sexo">Sexo:</Label>
                            <Input type="select" name="gender" id="gender">
                                <option value="0">Selecione...</option>
                                <option value="1">Masculino</option>
                                <option value="2">Feminino</option>
                            </Input>
                            <FormFeedback invalid="true">O campo sexo é inválido.</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                            <Label for="civil">Estado Civil:</Label>
                            <Input type="select" name="maritalStatus" id="maritalStatus">
                                <option value="0">Selecione...</option>
                                <option value="1">Solteiro</option>
                                <option value="2">Casado</option>
                                <option value="3">Divorciado</option>
                                <option value="4">Viúvo</option>
                            </Input>
                            <FormFeedback invalid="true">O campo estado civil é inválido.</FormFeedback>
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"   onClick={processData}>Confirmar</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Fechar</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}