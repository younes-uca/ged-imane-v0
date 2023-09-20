import { Button } from 'primereact/button';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';

import { MessageService } from 'app/zynerator/service/MessageService';

import { DocumentDto } from 'app/controller/model/Document.model';
import { DocumentAdminService } from 'app/controller/service/admin/DocumentAdminService.service';
import { TFunction } from "i18next";
import { Toast } from "primereact/toast";

import useEditHook from "app/component/zyhook/useEdit.hook";
import { DocumentCriteria } from "app/controller/criteria/DocumentCriteria.model";
import { AccessShareDto } from 'app/controller/model/AccessShare.model';
import { DocumentCategorieDto } from 'app/controller/model/DocumentCategorie.model';
import { DocumentCategorieModelDto } from 'app/controller/model/DocumentCategorieModel.model';
import { DocumentIndexElementDto } from 'app/controller/model/DocumentIndexElement.model';
import { DocumentPartageGroupeDto } from 'app/controller/model/DocumentPartageGroupe.model';
import { DocumentPartageUtilisateurDto } from 'app/controller/model/DocumentPartageUtilisateur.model';
import { DocumentStateDto } from 'app/controller/model/DocumentState.model';
import { DocumentTagDto } from 'app/controller/model/DocumentTag.model';
import { DocumentTypeDto } from 'app/controller/model/DocumentType.model';
import { EntiteAdministrativeDto } from 'app/controller/model/EntiteAdministrative.model';
import { GroupeDto } from 'app/controller/model/Groupe.model';
import { IndexElementDto } from 'app/controller/model/IndexElement.model';
import { TagDto } from 'app/controller/model/Tag.model';
import { UtilisateurDto } from 'app/controller/model/Utilisateur.model';
import { AccessShareAdminService } from 'app/controller/service/admin/AccessShareAdminService.service';
import { DocumentCategorieAdminService } from 'app/controller/service/admin/DocumentCategorieAdminService.service';
import { DocumentCategorieModelAdminService } from 'app/controller/service/admin/DocumentCategorieModelAdminService.service';
import { DocumentIndexElementAdminService } from 'app/controller/service/admin/DocumentIndexElementAdminService.service';
import { DocumentPartageGroupeAdminService } from 'app/controller/service/admin/DocumentPartageGroupeAdminService.service';
import { DocumentPartageUtilisateurAdminService } from 'app/controller/service/admin/DocumentPartageUtilisateurAdminService.service';
import { DocumentStateAdminService } from 'app/controller/service/admin/DocumentStateAdminService.service';
import { DocumentTagAdminService } from 'app/controller/service/admin/DocumentTagAdminService.service';
import { DocumentTypeAdminService } from 'app/controller/service/admin/DocumentTypeAdminService.service';
import { EntiteAdministrativeAdminService } from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import { GroupeAdminService } from 'app/controller/service/admin/GroupeAdminService.service';
import { IndexElementAdminService } from 'app/controller/service/admin/IndexElementAdminService.service';
import { TagAdminService } from 'app/controller/service/admin/TagAdminService.service';
import { UtilisateurAdminService } from 'app/controller/service/admin/UtilisateurAdminService.service';


type DocumentEditAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: DocumentDto
    update: (item: DocumentDto) => void,
    list: DocumentDto[],
    service: DocumentAdminService,
    t: TFunction
}
const Edit: React.FC<DocumentEditAdminType> = ({ visible, onClose, showToast, selectedItem, update, list, service, t }) => {


    const isFormValid = () => {
        let errorMessages = new Array<string>();
        if (item.reference == '')
            errorMessages.push("reference is required")
        return errorMessages.length == 0;
    }
    const emptyItem = new DocumentDto();

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
    } = useEditHook<DocumentDto, DocumentCriteria>({ list, selectedItem, onClose, update, showToast, service, t, isFormValid })


    const [utilisateurs, setUtilisateurs] = useState<UtilisateurDto[]>([]);
    const [entiteAdministratives, setEntiteAdministratives] = useState<EntiteAdministrativeDto[]>([]);
    const [groupes, setGroupes] = useState<GroupeDto[]>([]);
    const [documentTypes, setDocumentTypes] = useState<DocumentTypeDto[]>([]);
    const [documentCategorieModels, setDocumentCategorieModels] = useState<DocumentCategorieModelDto[]>([]);
    const [accessShares, setAccessShares] = useState<AccessShareDto[]>([]);
    const [indexElements, setIndexElements] = useState<IndexElementDto[]>([]);
    const [tags, setTags] = useState<TagDto[]>([]);
    const [documentCategories, setDocumentCategories] = useState<DocumentCategorieDto[]>([]);
    const [documentStates, setDocumentStates] = useState<DocumentStateDto[]>([]);

    const [documentIndexElements, setDocumentIndexElements] = useState<DocumentIndexElementDto>(new DocumentIndexElementDto());
    const [documentPartageGroupes, setDocumentPartageGroupes] = useState<DocumentPartageGroupeDto>(new DocumentPartageGroupeDto());
    const [documentPartageUtilisateurs, setDocumentPartageUtilisateurs] = useState<DocumentPartageUtilisateurDto>(new DocumentPartageUtilisateurDto());
    const [documentTags, setDocumentTags] = useState<DocumentTagDto>(new DocumentTagDto());

    const documentTagAdminService = new DocumentTagAdminService();
    const documentIndexElementAdminService = new DocumentIndexElementAdminService();
    const documentCategorieModelAdminService = new DocumentCategorieModelAdminService();
    const entiteAdministrativeAdminService = new EntiteAdministrativeAdminService();
    const accessShareAdminService = new AccessShareAdminService();
    const tagAdminService = new TagAdminService();
    const documentTypeAdminService = new DocumentTypeAdminService();
    const documentPartageGroupeAdminService = new DocumentPartageGroupeAdminService();
    const groupeAdminService = new GroupeAdminService();
    const indexElementAdminService = new IndexElementAdminService();
    const documentPartageUtilisateurAdminService = new DocumentPartageUtilisateurAdminService();
    const documentStateAdminService = new DocumentStateAdminService();
    const utilisateurAdminService = new UtilisateurAdminService();
    const documentCategorieAdminService = new DocumentCategorieAdminService();

    useEffect(() => {
        documentTypeAdminService.getList().then(({ data }) => setDocumentTypes(data)).catch(error => console.log(error));
        documentStateAdminService.getList().then(({ data }) => setDocumentStates(data)).catch(error => console.log(error));
        documentCategorieAdminService.getList().then(({ data }) => setDocumentCategories(data)).catch(error => console.log(error));
        utilisateurAdminService.getList().then(({ data }) => setUtilisateurs(data)).catch(error => console.log(error));
        entiteAdministrativeAdminService.getList().then(({ data }) => setEntiteAdministratives(data)).catch(error => console.log(error));
        documentCategorieModelAdminService.getList().then(({ data }) => setDocumentCategorieModels(data)).catch(error => console.log(error));
        indexElementAdminService.getList().then(({ data }) => setIndexElements(data)).catch(error => console.log(error));
        groupeAdminService.getList().then(({ data }) => setGroupes(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({ data }) => setAccessShares(data)).catch(error => console.log(error));
        utilisateurAdminService.getList().then(({ data }) => setUtilisateurs(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({ data }) => setAccessShares(data)).catch(error => console.log(error));
    }, []);

    const prepareDocumentTag = (tag: TagDto) => {
        const documentTag = new DocumentTagDto();
        documentTag.tag = tag;
        return documentTag;
    }

    const addDocumentIndexElements = () => {
        setSubmitted(true);
        if (item.documentIndexElements == null)
            item.documentIndexElements = new Array<DocumentIndexElementDto>();
        let _item = documentIndexElements;
        if (!_item.id) {
            item.documentIndexElements.push(_item);
            MessageService.showSuccess(showToast, 'DocumentIndexElements Created');
            setItem((prevState: any) => ({ ...prevState, documentIndexElements: item.documentIndexElements }));
        } else {
            const updatedItems = item.documentIndexElements.map((item) => item.id === documentIndexElements.id ? { ...documentIndexElements } : item);
            MessageService.showSuccess(showToast, 'DocumentIndexElements Updated');
            setItem((prevState: any) => ({ ...prevState, documentIndexElements: updatedItems }));
        }
        setDocumentIndexElements(new DocumentIndexElementDto());
    };

    const deleteDocumentIndexElements = (rowData: any) => {
        const updatedItems = item.documentIndexElements.filter((val) => val !== rowData);
        setItem((prevState) => ({ ...prevState, documentIndexElements: updatedItems }));
        setDocumentIndexElements(new DocumentIndexElementDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
    };

    const editDocumentIndexElements = (rowData: any) => {
        setActiveTab(0);
        setDocumentIndexElements(rowData);
    };

    const onInputNumerChangeDocumentIndexElements = (e: any, name: string) => {
        const val = e.value || 0;
        setDocumentIndexElements((prevDocumentIndexElements) => ({ ...prevDocumentIndexElements, [name]: val, }));
    };

    const onDropdownChangeDocumentIndexElements = (e: any, field: string) => {
        setDocumentIndexElements((prevState) => ({ ...prevState, [field]: e.value }));
    };


    const onMultiSelectChangeDocumentIndexElements = (e: any, field: string) => {
        if (e && e.value && Array.isArray(e.value)) {
            const selectedValues = e.value.map(option => option && option.value);
            setDocumentIndexElements(prevState => ({ ...prevState, [field]: selectedValues, }));
        }
    };

    const onBooleanInputChangeDocumentIndexElements = (e: any, name: string) => {
        const val = e.value;
        setDocumentIndexElements((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentIndexElements = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentIndexElements({ ...documentIndexElements, [name]: val })
    };

    const onInputTextChangeDocumentIndexElements = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentIndexElements({ ...documentIndexElements, [name]: val })
    };

    const editDocumentPartageGroupes = (rowData: any) => {
        setActiveTab(0);
        setDocumentPartageGroupes(rowData);
    };

    const onInputNumerChangeDocumentPartageGroupes = (e: any, name: string) => {
        const val = e.value || 0;
        setDocumentPartageGroupes((prevDocumentPartageGroupes) => ({ ...prevDocumentPartageGroupes, [name]: val, }));
    };

    const onDropdownChangeDocumentPartageGroupes = (e: any, field: string) => {
        setDocumentPartageGroupes((prevState) => ({ ...prevState, [field]: e.value }));
    };


    const onMultiSelectChangeDocumentPartageGroupes = (e: any, field: string) => {
        if (e && e.value && Array.isArray(e.value)) {
            const selectedValues = e.value.map(option => option && option.value);
            setDocumentPartageGroupes(prevState => ({ ...prevState, [field]: selectedValues, }));
        }
    };

    const onBooleanInputChangeDocumentPartageGroupes = (e: any, name: string) => {
        const val = e.value;
        setDocumentPartageGroupes((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentPartageGroupes = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageGroupes({ ...documentPartageGroupes, [name]: val })
    };

    const onInputTextChangeDocumentPartageGroupes = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageGroupes({ ...documentPartageGroupes, [name]: val })
    };
    const addDocumentPartageUtilisateurs = () => {
        setSubmitted(true);
        if (item.documentPartageUtilisateurs == null)
            item.documentPartageUtilisateurs = new Array<DocumentPartageUtilisateurDto>();
        let _item = documentPartageUtilisateurs;
        if (!_item.id) {
            item.documentPartageUtilisateurs.push(_item);
            MessageService.showSuccess(showToast, 'DocumentPartageUtilisateurs Created');
            setItem((prevState: any) => ({ ...prevState, documentPartageUtilisateurs: item.documentPartageUtilisateurs }));
        } else {
            const updatedItems = item.documentPartageUtilisateurs.map((item) => item.id === documentPartageUtilisateurs.id ? { ...documentPartageUtilisateurs } : item);
            MessageService.showSuccess(showToast, 'DocumentPartageUtilisateurs Updated');
            setItem((prevState: any) => ({ ...prevState, documentPartageUtilisateurs: updatedItems }));
        }
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
    };

    const deleteDocumentPartageUtilisateurs = (rowData: any) => {
        const updatedItems = item.documentPartageUtilisateurs.filter((val) => val !== rowData);
        setItem((prevState) => ({ ...prevState, documentPartageUtilisateurs: updatedItems }));
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
    };

    const editDocumentPartageUtilisateurs = (rowData: any) => {
        setActiveTab(0);
        setDocumentPartageUtilisateurs(rowData);
    };

    const onInputNumerChangeDocumentPartageUtilisateurs = (e: any, name: string) => {
        const val = e.value || 0;
        setDocumentPartageUtilisateurs((prevDocumentPartageUtilisateurs) => ({ ...prevDocumentPartageUtilisateurs, [name]: val, }));
    };

    const onDropdownChangeDocumentPartageUtilisateurs = (e: any, field: string) => {
        setDocumentPartageUtilisateurs((prevState) => ({ ...prevState, [field]: e.value }));
    };


    const onMultiSelectChangeDocumentPartageUtilisateurs = (e: any, field: string) => {
        if (e && e.value && Array.isArray(e.value)) {
            const selectedValues = e.value.map(option => option && option.value);
            setDocumentPartageUtilisateurs(prevState => ({ ...prevState, [field]: selectedValues, }));
        }
    };

    const onBooleanInputChangeDocumentPartageUtilisateurs = (e: any, name: string) => {
        const val = e.value;
        setDocumentPartageUtilisateurs((prevItem) => ({ ...prevItem, [name]: val, }));
    };

    const onInputDateChangeDocumentPartageUtilisateurs = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageUtilisateurs({ ...documentPartageUtilisateurs, [name]: val })
    };

    const onInputTextChangeDocumentPartageUtilisateurs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageUtilisateurs({ ...documentPartageUtilisateurs, [name]: val })
    };

    const itemDialogFooter = (<>
        <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog} />
        <Button label={t("save")} icon="pi pi-check" onClick={editItem} /> </>
    );

    return (
        <Dialog visible={visible} maximizable style={{ width: '70vw' }} header={t("document.tabPan")} modal className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("document.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <label htmlFor="reference">{t("document.reference")}</label>
                            <InputText id="reference" value={item.reference} onChange={(e) => onInputTextChange(e, 'reference')} required className={classNames({ 'p-invalid': submitted && !item.reference })} autoFocus />
                            {submitted && !item.reference && <small className="p-invalid">Reference is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentType">{t("document.documentType")}</label>
                            <Dropdown showClear id="documentTypeDropdown" value={item.documentType} options={documentTypes} onChange={(e) => onDropdownChange(e, 'documentType')} placeholder={t("document.documentTypePlaceHolder")} filter filterPlaceholder={t("document.documentTypePlaceHolderFilter")} optionLabel="libelle" />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentState">{t("document.documentState")}</label>
                            <Dropdown showClear id="documentStateDropdown" value={item.documentState} options={documentStates} onChange={(e) => onDropdownChange(e, 'documentState')} placeholder={t("document.documentStatePlaceHolder")} filter filterPlaceholder={t("document.documentStatePlaceHolderFilter")} optionLabel="libelle" />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentCategorie">{t("document.documentCategorie")}</label>
                            <Dropdown showClear id="documentCategorieDropdown" value={item.documentCategorie} options={documentCategories} onChange={(e) => onDropdownChange(e, 'documentCategorie')} placeholder={t("document.documentCategoriePlaceHolder")} filter filterPlaceholder={t("document.documentCategoriePlaceHolderFilter")} optionLabel="libelle" />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="uploadDate">{t("document.uploadDate")}</label>
                            <Calendar id="uploadDate" value={adaptDate(item.uploadDate)} onChange={(e) => onInputDateChange(e, 'uploadDate')} dateFormat="dd/mm/yy" showIcon={true} />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="size">{t("document.size")}</label>
                            <InputNumber id="size" value={item.size} onChange={(e) => onInputNumerChange(e, 'size')} disabled />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="utilisateur">{t("document.utilisateur")}</label>
                            <Dropdown showClear id="utilisateurDropdown" value={item.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChange(e, 'utilisateur')} placeholder={t("document.utilisateurPlaceHolder")} filter filterPlaceholder={t("document.utilisateurPlaceHolderFilter")} optionLabel="nom" disabled />
                        </div>
                        <div className="field col-4">
                            <label htmlFor="entiteAdministrative">{t("document.entiteAdministrative")}</label>
                            <Dropdown showClear id="entiteAdministrativeDropdown" value={item.entiteAdministrative} options={entiteAdministratives} onChange={(e) => onDropdownChange(e, 'entiteAdministrative')} placeholder={t("document.entiteAdministrativePlaceHolder")} filter filterPlaceholder={t("document.entiteAdministrativePlaceHolderFilter")} optionLabel="libelle" disabled />
                        </div>
                        <div className="field col-12">
                            <label htmlFor="description">{t("document.description")}</label>
                            <span className="p-float-label">
                                <InputTextarea id="description" value={item.description} onChange={(e) => onInputTextChange(e, 'description')} rows={5} cols={30} />
                            </span>
                        </div>

                        {/* <div className="field col-4">
                            <label htmlFor="documentCategorieModel">{t("document.documentCategorieModel")}</label>
                            <Dropdown id="documentCategorieModelDropdown" value={item.documentCategorieModel} options={documentCategorieModels} onChange={(e) => onDropdownChange(e, 'documentCategorieModel')} placeholder={t("document.documentCategorieModelPlaceHolder")} filter filterPlaceholder={t("document.documentCategorieModelPlaceHolderFilter")} optionLabel="libelle" />
                        </div> */}
                        {/* <div className="field col-6">
                            <label htmlFor="annee">{t("document.annee")}</label>
                            <InputNumber id="annee" value={item.annee} onChange={(e) => onInputNumerChange(e, 'annee')} />
                        </div> */}
                        {/* <div className="field col-6">
                            <label htmlFor="semstre">{t("document.semstre")}</label>
                            <InputNumber id="semstre" value={item.semstre} onChange={(e) => onInputNumerChange(e, 'semstre')} />
                        </div> */}
                        {/* <div className="field col-6">
                            <label htmlFor="mois">{t("document.mois")}</label>
                            <InputNumber id="mois" value={item.mois} onChange={(e) => onInputNumerChange(e, 'mois')} />
                        </div> */}
                        {/* <div className="field col-6">
                            <label htmlFor="jour">{t("document.jour")}</label>
                            <InputNumber id="jour" value={item.jour} onChange={(e) => onInputNumerChange(e, 'jour')} />
                        </div> */}
                        {/* <div className="field col-6">
                            <div className="label-inputswitch">
                                <label htmlFor="ocr">{t("document.ocr")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="ocr" checked={item.ocr} onChange={(e) => onBooleanInputChange(e, 'ocr')} />
                                </span>
                            </div>
                        </div> */}


                        {/* <div className="field col-6">
                            <div className="label-inputswitch">
                                <label htmlFor="archive">{t("document.archive")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="archive" checked={item.archive} onChange={(e) => onBooleanInputChange(e, 'archive')} />
                                </span>
                            </div>
                        </div> */}
                        {/* <div className="field col-6">
                            <div className="label-inputswitch">
                                <label htmlFor="versionne">{t("document.versionne")}</label>
                                <span className="p-float-label">
                                    <InputSwitch id="versionne" checked={item.versionne} onChange={(e) => onBooleanInputChange(e, 'versionne')} />
                                </span>
                            </div>
                        </div> */}

                        {/* <div className="field col-6">
                            <label htmlFor="documentTags">{t("documentTag.tag")}</label>
                            
                        <MultiSelect value={item.documentTags} options={documentTags}  optionLabel="tag.libelle" display="chip" placeholder={t("document.documentTagsPlaceHolder")}  maxSelectedLabels={3}  onChange={(e) => onMultiSelectChange(e, 'documentTags')} />
                       
                        </div> */}
                    </div>
                </TabPanel>
                <TabPanel header={t("document.documentIndexElements")}>
                    <div>
                        <div className="grid">
                            <div className="field col-4">
                                <label htmlFor="indexElement">{t("documentIndexElement.indexElement")}</label>
                                <Dropdown id="indexElementDropdown" value={documentIndexElements.indexElement} options={indexElements} onChange={(e) => onDropdownChangeDocumentIndexElements(e, 'indexElement')} placeholder={t("documentIndexElement.indexElementPlaceHolder")} filter filterPlaceholder={t("documentIndexElement.indexElementPlaceHolderFilter")} optionLabel="libelle" autoFocus />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="value">{t("documentIndexElement.value")}</label>
                                <InputTextarea id="value" value={documentIndexElements.value} onChange={(e) => onInputTextChangeDocumentIndexElements(e, 'value')} required className={classNames({ 'p-invalid': submitted && !item.documentIndexElements })} rows={4} />
                            </div>
                                {/* <div className="field col-12">
                                    <label htmlFor="description">{t("documentIndexElement.description")}</label>
                                    <InputText id="description" value={documentIndexElements.description} onChange={(e) => onInputTextChangeDocumentIndexElements(e, 'description')} required className={classNames({ 'p-invalid': submitted && !item.documentIndexElements })} />
                                </div> */}
                            <div className="field col-2">
                                <Button icon="pi pi-plus" label="Sauvegarder" onClick={addDocumentIndexElements} />
                            </div>
                        </div>
                        <div className="card">
                            <DataTable value={item.documentIndexElements} tableStyle={{ minWidth: '50rem' }} dataKey="id">
                                <Column field="indexElement.libelle" header={t("documentIndexElement.indexElement")}></Column>
                                <Column field="value" header={t("documentIndexElement.value")} ></Column>
                                <Column field="description" header={t("documentIndexElement.description")} hidden ></Column>
                                <Column header={t("actions")} body={(rowData) => (<div>
                                    <Button icon="pi pi-times" severity="warning" className="mr-2 p-button-danger" onClick={() => deleteDocumentIndexElements(rowData)} />
                                    <Button icon="pi pi-pencil" severity="success" className="mr-2" onClick={() => editDocumentIndexElements(rowData)} />
                                </div>)}></Column>
                            </DataTable>
                        </div>
                    </div>
                </TabPanel>
            </TabView>
        </Dialog>
    );
};
export default Edit;


