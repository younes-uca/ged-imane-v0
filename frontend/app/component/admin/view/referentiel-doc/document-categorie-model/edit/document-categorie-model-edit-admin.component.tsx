import {Button} from 'primereact/button';
import {Column} from 'primereact/column';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {TabView, TabPanel} from 'primereact/tabview';
import {Dialog} from 'primereact/dialog';
import {InputNumber, InputNumberChangeEvent} from 'primereact/inputnumber';
import {InputText} from 'primereact/inputtext';
import {classNames} from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, {useEffect, useState} from 'react';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import {MultiSelect, MultiSelectChangeEvent} from 'primereact/multiselect';

import {MessageService} from 'app/zynerator/service/MessageService';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';

import {DocumentCategorieModelAdminService} from 'app/controller/service/admin/DocumentCategorieModelAdminService.service';
import  {DocumentCategorieModelDto}  from 'app/controller/model/DocumentCategorieModel.model';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";

import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieAdminService} from 'app/controller/service/admin/DocumentCategorieAdminService.service';
import {DocumentCategorieModelCriteria} from "app/controller/criteria/DocumentCategorieModelCriteria.model";
import useEditHook from "app/component/zyhook/useEdit.hook";


type DocumentCategorieModelEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: DocumentCategorieModelDto
    update: (item: DocumentCategorieModelDto) => void,
    list: DocumentCategorieModelDto[],
    service: DocumentCategorieModelAdminService,
    t: TFunction
}
const Edit: React.FC<DocumentCategorieModelEditAdminType> = ({visible, onClose, showToast, selectedItem, update, list, service, t}) => {


    const isFormValid = () => {
    let errorMessages = new Array<string>();
                if(item.code == '')
                errorMessages.push("code is required")
                if(item.libelle == '')
                errorMessages.push("libelle is required")
        return errorMessages.length == 0 ;
    }
    const emptyItem = new DocumentCategorieModelDto();


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
        } = useEditHook<DocumentCategorieModelDto, DocumentCategorieModelCriteria>({list, selectedItem, onClose, update, showToast,service, t, isFormValid})


    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);


    const documentCategorieAdminService = new DocumentCategorieAdminService();

    useEffect(() => {
    documentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));

        }, []);





    const onUpload = (event:any) => {
    service.uploadAndOcr(event);
    }


    const itemDialogFooter = ( <>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={editItem} /> </>
    );



    return(
    <Dialog visible={visible} style={{width: '70vw'}} header={t("documentCategorieModel.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
        <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
            <TabPanel header={t("documentCategorieModel.tabPan")}>
                <div className="formgrid grid">
                    <div className="field col-6">
                        <label htmlFor="code">{t("documentCategorieModel.code")}</label>
                        <InputText id="code" value={item ? item.code : ''} onChange={(e) => onInputTextChange(e, 'code')} required autoFocus className={classNames({'p-invalid': submitted && !item.code})} />
                        {submitted && !item.code && <small className="p-invalid">Code is required.</small>}
                    </div>
                    <div className="field col-6">
                        <label htmlFor="libelle">{t("documentCategorieModel.libelle")}</label>
                        <InputText id="libelle" value={item ? item.libelle : ''} onChange={(e) => onInputTextChange(e, 'libelle')} required autoFocus className={classNames({'p-invalid': submitted && !item.libelle})} />
                        {submitted && !item.libelle && <small className="p-invalid">Libelle is required.</small>}
                    </div>
                        <div className="field col-6">
                            <FileUpload accept=".pdf,.jpg,.png" chooseLabel="Choose File" uploadLabel="Upload" customUpload uploadHandler={onUpload}/>
                        </div>
                    <div className="field col-6">
                        <label htmlFor="description">{t("documentCategorieModel.description")}</label>
                        <span className="p-float-label">
                            <InputTextarea id="description" value={item ? item.description : ''} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30}/>
                        </span>
                    </div>
                    <div className="field col-6">
                        <label htmlFor="documentCategorie">{t("documentCategorieModel.documentCategorie")}</label>
                        <Dropdown  id="documentCategorieDropdown"  value={item ? item.documentCategorie : ''} options={documentCategories} onChange={(e) => onDropdownChange(e, 'documentCategorie')}   placeholder="Sélectionnez un documentCategorie" filter filterPlaceholder="Rechercher un documentCategorie" optionLabel="libelle" />
                    </div>
                </div>
            </TabPanel>
        </TabView>
    </Dialog>
);
};
export default Edit;


