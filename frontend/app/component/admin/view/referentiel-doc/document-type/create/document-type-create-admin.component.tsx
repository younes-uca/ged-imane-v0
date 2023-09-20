import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { useEffect } from 'react';

import { DocumentTypeCriteria } from "app/controller/criteria/DocumentTypeCriteria.model";
import { DocumentTypeDto } from 'app/controller/model/DocumentType.model';
import { DocumentTypeAdminService } from 'app/controller/service/admin/DocumentTypeAdminService.service';

import useCreateHook from "app/component/zyhook/useCreate.hook";
import { TFunction } from "i18next";
import { Toast } from "primereact/toast";



type DocumentTypeCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: DocumentTypeDto) => void,
    showToast: React.Ref<Toast>,
    list: DocumentTypeDto[],
    service: DocumentTypeAdminService,
    t: TFunction
}
const Create: React.FC<DocumentTypeCreateAdminType> = ({ visible, onClose, add, showToast, list, service, t }) => {


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if (item.code == '')
            errorMessages.push("code is required")
        if (item.libelle == '')
            errorMessages.push("libelle is required")
        return errorMessages.length == 0;
    }
    const emptyItem = new DocumentTypeDto();
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
        onTabChange,
        onDropdownChange,
        hideDialog,
        saveItem,
        formateDate
    } = useCreateHook<DocumentTypeDto, DocumentTypeCriteria>({ list, emptyItem, onClose, add, showToast, service, isFormValid })


    useEffect(() => {
    }, []);

    const itemDialogFooter = (<>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={saveItem} /> </>
    );

    return (
        <Dialog visible={visible} style={{ width: '70vw' }} header={t("documentType.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog} >
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("documentType.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-6">
                            <label htmlFor="code">{t("documentType.code")}</label>
                            <InputText id="code" value={item.code} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({ 'p-invalid': submitted && !item.code })} />
                            {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="libelle">{t("documentType.libelle")}</label>
                            <InputText id="libelle" value={item.libelle} onChange={(e) => onInputTextChange(e, 'libelle')} required className={classNames({ 'p-invalid': submitted && !item.libelle })} />
                            {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                        </div>
                        <div className="field col-6">
                            <label htmlFor="description">{t("documentType.description")}</label>
                            <span className="p-float-label">
                                <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30} />
                            </span>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </Dialog>
    );
};

export default Create;
