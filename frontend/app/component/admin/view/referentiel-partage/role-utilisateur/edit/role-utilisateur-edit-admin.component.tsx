import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { useEffect } from 'react';


import { RoleUtilisateurDto } from 'app/controller/model/RoleUtilisateur.model';
import { RoleUtilisateurAdminService } from 'app/controller/service/admin/RoleUtilisateurAdminService.service';
import { TFunction } from "i18next";
import { Toast } from "primereact/toast";

import useEditHook from "app/component/zyhook/useEdit.hook";
import { RoleUtilisateurCriteria } from "app/controller/criteria/RoleUtilisateurCriteria.model";


type RoleUtilisateurEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: RoleUtilisateurDto
    update: (item: RoleUtilisateurDto) => void,
    list: RoleUtilisateurDto[],
    service: RoleUtilisateurAdminService,
    t: TFunction
}
const Edit: React.FC<RoleUtilisateurEditAdminType> = ({ visible, onClose, showToast, selectedItem, update, list, service, t }) => {


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if (item.code == '')
            errorMessages.push("code is required")
        if (item.libelle == '')
            errorMessages.push("libelle is required")
        return errorMessages.length == 0;
    }
    const emptyItem = new RoleUtilisateurDto();


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
    } = useEditHook<RoleUtilisateurDto, RoleUtilisateurCriteria>({ list, selectedItem, onClose, update, showToast, service, t, isFormValid })





    useEffect(() => {

    }, []);







    const itemDialogFooter = (<>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={editItem} /> </>
    );



    return (
        <Dialog visible={visible} style={{ width: '70vw' }} header={t("roleUtilisateur.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("roleUtilisateur.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="code">{t("roleUtilisateur.code")}</label>
                            <InputText id="code" value={item ? item.code : ''} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.code })} />
                            {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="libelle">{t("roleUtilisateur.libelle")}</label>
                            <InputText id="libelle" value={item ? item.libelle : ''} onChange={(e) => onInputTextChange(e, 'libelle')} required className={classNames({ 'p-invalid': submitted && !item.libelle })} />
                            {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="description">{t("roleUtilisateur.description")}</label>
                            <span className="p-float-label">
                                <InputTextarea id="description" value={item ? item.description : ''} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30} />
                            </span>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </Dialog>
    );
};
export default Edit;


