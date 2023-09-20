import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputSwitch } from 'primereact/inputswitch';
import { InputText } from 'primereact/inputtext';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';

import { UtilisateurDto } from 'app/controller/model/Utilisateur.model';
import { UtilisateurAdminService } from 'app/controller/service/admin/UtilisateurAdminService.service';
import { RoleDto } from "app/zynerator/dto/RoleDto.model";
import { MessageService } from 'app/zynerator/service/MessageService';
import RoleService from "app/zynerator/service/RoleService";
import { TFunction } from "i18next";
import { Toast } from "primereact/toast";

import useEditHook from "app/component/zyhook/useEdit.hook";
import { UtilisateurCriteria } from "app/controller/criteria/UtilisateurCriteria.model";
import { EntiteAdministrativeDto } from 'app/controller/model/EntiteAdministrative.model';
import { GenderDto } from 'app/controller/model/Gender.model';
import { EntiteAdministrativeAdminService } from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import { GenderAdminService } from 'app/controller/service/admin/GenderAdminService.service';
import { Password } from "primereact/password";


type UtilisateurEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: UtilisateurDto
    update: (item: UtilisateurDto) => void,
    list: UtilisateurDto[],
    service: UtilisateurAdminService,
    t: TFunction
}

const Edit: React.FC<UtilisateurEditAdminType> = ({ visible, onClose, showToast, selectedItem, update, list, service, t }) => {

    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if (item.email == '')
            errorMessages.push("email is required")
        if (item.nom == '')
            errorMessages.push("nom is required")
        return errorMessages.length == 0;
    }
    const emptyItem = new UtilisateurDto();

    const {
        item,
        setItem,
        submitted,
        setSubmitted,
        activeIndex,
        setActiveIndex,
        activeTab,
        setActiveTab,
        onInputTextChange,
        onInputDateChange,
        onInputNumerChange,
        onMultiSelectChange,
        onBooleanInputChange,
        onDropdownChange,
        onTabChange,
        hideDialog,
        editItem,
        formateDate,
        parseToIsoFormat,
        adaptDate
    } = useEditHook<UtilisateurDto, UtilisateurCriteria>({ list, selectedItem, onClose, update, showToast, service, t, isFormValid })

    const [roles, setRoles] = useState<RoleDto[]>([]);
    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const [genders, setGenders] = useState<GenderDto[]>([]);

    const entiteAdministrativeAdminService = new EntiteAdministrativeAdminService();
    const genderAdminService = new GenderAdminService();
    const roleService = new RoleService();


    useEffect(() => {
        genderAdminService.getList().then(({ data }) => setGenders(data)).catch(error => console.log(error));
        entiteAdministrativeAdminService.getList().then(({ data }) => setEntiteAdministratives(data)).catch(error => console.log(error));
        roleService.getList().then(({ data }) => setRoles(data)).catch(error => console.log(error));
    }, []);

    const [confirmPwd, setConfirmPwd] = useState('');

    const handlePwdChange = () => {
        if (item.password == confirmPwd) {
            service.changePassword(item.username, item.password)
            onClose();
            MessageService.showSuccess(showToast, "Mise à jour", "Opération faite avec success.")
        }
        else if (item.password != confirmPwd) {
            MessageService.showError(showToast, "Erreur", "Opération faite avec success.");
        }
    }

    const itemDialogFooter = (<>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={editItem} /> </>
    );

    return (
        <Dialog visible={visible} style={{ width: '70vw' }} header={t("utilisateur.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
            <Toast ref={showToast} />
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("utilisateur.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <label htmlFor="email">{t("utilisateur.email")}</label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-at" />
                                <InputText id="email" value={item.email} onChange={(e) => onInputTextChange(e, 'email')} required className={classNames({ 'p-invalid': submitted && !item.email })} />
                            </span>
                            {submitted && !item.email && <small className="p-invalid">Email is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="nom">{t("utilisateur.nom")}</label>
                            <InputText id="nom" value={item.nom} onChange={(e) => onInputTextChange(e, 'nom')} required className={classNames({ 'p-invalid': submitted && !item.nom })} />
                            {submitted && !item.nom && <small className="p-invalid">Nom is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="prenom">{t("utilisateur.prenom")}</label>
                            <InputText id="prenom" value={item.prenom} onChange={(e) => onInputTextChange(e, 'prenom')} required className={classNames({ 'p-invalid': submitted && !item.prenom })} />
                            {submitted && !item.prenom && <small className="p-invalid">Prenom is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="dateNaissance">{t("utilisateur.dateNaissance")}</label>
                            <Calendar id="dateNaissance" value={adaptDate(item.dateNaissance)} onChange={(e) => onInputDateChange(e, 'dateNaissance')} dateFormat="dd/mm/yy" showIcon={true} />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="telephone">{t("utilisateur.telephone")}</label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-phone" />
                                <InputText id="telephone" value={item.telephone} onChange={(e) => onInputTextChange(e, 'telephone')} required className={classNames({ 'p-invalid': submitted && !item.telephone })} />
                            </span>
                            {submitted && !item.telephone && <small className="p-invalid">Telephone is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="gender">{t("utilisateur.gender")}</label>
                            <Dropdown id="genderDropdown" value={item.gender} options={genders} onChange={(e) => onDropdownChange(e, 'gender')} placeholder={t("utilisateur.genderPlaceHolder")} filter filterPlaceholder={t("utilisateur.genderPlaceHolderFilter")} optionLabel="libelle" showClear />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="entiteAdministrative">{t("utilisateur.entiteAdministrative")}</label>
                            <Dropdown id="entiteAdministrativeDropdown" value={item.entiteAdministrative} options={entiteAdministratives} onChange={(e) => onDropdownChange(e, 'entiteAdministrative')} placeholder={t("utilisateur.entiteAdministrativePlaceHolder")} filter filterPlaceholder={t("utilisateur.entiteAdministrativePlaceHolderFilter")} optionLabel="libelle" showClear />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="username">{t("utilisateur.username")}</label>
                            <span className="p-input-icon-left">
                                <i className="pi pi-user" />
                                <InputText id="username" value={item.username} onChange={(e) => onInputTextChange(e, 'username')} required className={classNames({ 'p-invalid': submitted && !item.username })} />
                            </span>
                            {submitted && !item.username && <small className="p-invalid">Username is required.</small>}
                        </div>
                        <div className="form-separator col-12"></div>
                        {/* <div className="field col-4">
                            <div className="label-inputswitch">
                                <label htmlFor="credentialsNonExpired">{t("utilisateur.credentialsNonExpired")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="credentialsNonExpired" checked={item.credentialsNonExpired} onChange={(e) => onBooleanInputChange(e, 'credentialsNonExpired')} />
                                </span>
                            </div>
                        </div> */}
                        <div className="field col-4">
                            <div className="label-inputswitch">
                                <label htmlFor="enabled">{t("utilisateur.enabled")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="enabled" checked={item.enabled} onChange={(e) => onBooleanInputChange(e, 'enabled')} />
                                </span>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="label-inputswitch">
                                <label htmlFor="accountNonExpired">{t("utilisateur.accountNonExpired")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="accountNonExpired" checked={item.accountNonExpired} onChange={(e) => onBooleanInputChange(e, 'accountNonExpired')} />
                                </span>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="label-inputswitch">
                                <label htmlFor="accountNonLocked">{t("utilisateur.accountNonLocked")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="accountNonLocked" checked={item.accountNonLocked} onChange={(e) => onBooleanInputChange(e, 'accountNonLocked')} />
                                </span>
                            </div>
                        </div>
                        <div className="field col-4">
                            <div className="label-inputswitch">
                                <label htmlFor="passwordChanged">{t("utilisateur.passwordChanged")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="passwordChanged" checked={item.passwordChanged} onChange={(e) => onBooleanInputChange(e, 'passwordChanged')} />
                                </span>
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel header="Change Password">
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="new_password">New Password</label>
                            <Password value={item.password} onChange={(e) => onInputTextChange(e, "password")} toggleMask />
                        </div>
                        <div className="field col-6">
                            <label htmlFor="new_password">Confirm Password</label>
                            <Password value={confirmPwd} onChange={(event) => setConfirmPwd(event.target.value)} toggleMask />
                        </div>
                        <div className="field col-2">
                            <Button label="Changer password" onClick={handlePwdChange} />
                        </div>
                    </div>
                </TabPanel>

            </TabView>
        </Dialog>
    );
};
export default Edit;
