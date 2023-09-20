import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { TabView, TabPanel } from 'primereact/tabview';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputNumber, InputNumberChangeEvent } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Calendar, CalendarChangeEvent } from 'primereact/calendar';
import { format } from 'date-fns';
import { parse } from 'date-fns';
import { InputSwitch } from 'primereact/inputswitch';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';

import { MessageService } from 'app/zynerator/service/MessageService';
import { FileUpload, FileUploadHandlerEvent } from 'primereact/fileupload';

import { DocumentAdminService } from 'app/controller/service/admin/DocumentAdminService.service';
import { DocumentDto } from 'app/controller/model/Document.model';
import { TFunction } from "i18next";
import { Toast } from "primereact/toast";

import { DocumentTagDto } from 'app/controller/model/DocumentTag.model';
import { DocumentTagAdminService } from 'app/controller/service/admin/DocumentTagAdminService.service';
import { DocumentIndexElementDto } from 'app/controller/model/DocumentIndexElement.model';
import { DocumentIndexElementAdminService } from 'app/controller/service/admin/DocumentIndexElementAdminService.service';
import { DocumentCategorieModelDto } from 'app/controller/model/DocumentCategorieModel.model';
import {
    DocumentCategorieModelAdminService
} from 'app/controller/service/admin/DocumentCategorieModelAdminService.service';
import { EntiteAdministrativeDto } from 'app/controller/model/EntiteAdministrative.model';
import { EntiteAdministrativeAdminService } from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import { AccessShareDto } from 'app/controller/model/AccessShare.model';
import { AccessShareAdminService } from 'app/controller/service/admin/AccessShareAdminService.service';
import { TagDto } from 'app/controller/model/Tag.model';
import { TagAdminService } from 'app/controller/service/admin/TagAdminService.service';
import { DocumentTypeDto } from 'app/controller/model/DocumentType.model';
import { DocumentTypeAdminService } from 'app/controller/service/admin/DocumentTypeAdminService.service';
import { DocumentPartageGroupeDto } from 'app/controller/model/DocumentPartageGroupe.model';
import {
    DocumentPartageGroupeAdminService
} from 'app/controller/service/admin/DocumentPartageGroupeAdminService.service';
import { GroupeDto } from 'app/controller/model/Groupe.model';
import { GroupeAdminService } from 'app/controller/service/admin/GroupeAdminService.service';
import { IndexElementDto } from 'app/controller/model/IndexElement.model';
import { IndexElementAdminService } from 'app/controller/service/admin/IndexElementAdminService.service';
import { DocumentPartageUtilisateurDto } from 'app/controller/model/DocumentPartageUtilisateur.model';
import {
    DocumentPartageUtilisateurAdminService
} from 'app/controller/service/admin/DocumentPartageUtilisateurAdminService.service';
import { DocumentStateDto } from 'app/controller/model/DocumentState.model';
import { DocumentStateAdminService } from 'app/controller/service/admin/DocumentStateAdminService.service';
import { UtilisateurDto } from 'app/controller/model/Utilisateur.model';
import { UtilisateurAdminService } from 'app/controller/service/admin/UtilisateurAdminService.service';
import { DocumentCategorieDto } from 'app/controller/model/DocumentCategorie.model';
import { DocumentCategorieAdminService } from 'app/controller/service/admin/DocumentCategorieAdminService.service';
import { DocumentCriteria } from "app/controller/criteria/DocumentCriteria.model";
import useEditHook from "app/component/zyhook/useEdit.hook";


type DocumentShareAdminType = {
    visible: boolean,
    onClose: () => void,
    showToast: React.Ref<Toast>,
    selectedItem: DocumentDto
    update: (item: DocumentDto) => void,
    list: DocumentDto[],
    service: DocumentAdminService,
    t: TFunction
}
const Share: React.FC<DocumentShareAdminType> = ({
    visible,
    onClose,
    showToast,
    selectedItem,
    update,
    list,
    service,
    t
}) => {


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
    } = useEditHook<DocumentDto, DocumentCriteria>({
        list,
        selectedItem,
        onClose,
        update,
        showToast,
        service,
        t,
        isFormValid
    })

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

    const [daysInput, setDaysInput] = useState(7);
    const [hoursInput, setHoursInput] = useState(0);
    const [minutesInput, setMinutesInput] = useState(0);
    const [linkValue, setLinkValue] = useState<string>(
        "https://127.0.0.1:9000/ged/MicrosoftTeams-image%20%284%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=98TGOWACNZ0QLXJ001U1%2F20230810%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230810T214950Z&X-Amz-Expires=604800&X-Amz-Security-Token=eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhY2Nlc3NLZXkiOiI5OFRHT1dBQ05aMFFMWEowMDFVMSIsImV4cCI6MTY5MTc0MzgwNSwicGFyZW50IjoiUTNBTTNVUTg2N1NQUVFBNDNQMkYifQ.HeWnEDYpY6NNh8CIPW3_G_ZqwxTA4SWjfPD4aucrm8-S4uJ1cfHD1OJkDtCeMwwRcivKE1HnnDfqgX0Khui00Q&X-Amz-SignedHeaders=host&versionId=5235e398-63cc-4227-9c31-263097b08790&X-Amz-Signature=2684e66962e5f699dc1ffb7338ba9a9f8e0ad896ba6e5f3e907de96e3da17a5f"
    );

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
        // tagAdminService.getList().then(({ data }) => {
        //     const DocumentTags = data?.map(prepareDocumentTag)
        //     setDocumentTags(documentTags)
        // })

    }, []);


    const prepareDocumentTag = (tag: TagDto) => {
        const documentTag = new DocumentTagDto();
        documentTag.tag = tag;
        return documentTag;
    }

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

    const addDocumentPartageGroupes = () => {
        setSubmitted(true);
        if (item.documentPartageGroupes == null)
            item.documentPartageGroupes = new Array<DocumentPartageGroupeDto>();
        let _item = documentPartageGroupes;
        if (!_item.id) {
            item.documentPartageGroupes.push(_item);
            MessageService.showSuccess(showToast, 'DocumentPartageGroupes Created');
            setItem((prevState: any) => ({ ...prevState, documentPartageGroupes: item.documentPartageGroupes }));
        } else {
            const updatedItems = item.documentPartageGroupes.map((item) => item.id === documentPartageGroupes.id ? { ...documentPartageGroupes } : item);
            MessageService.showSuccess(showToast, 'DocumentPartageGroupes Updated');
            setItem((prevState: any) => ({ ...prevState, documentPartageGroupes: updatedItems }));
        }
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
    };

    const deleteDocumentPartageGroupes = (rowData: any) => {
        const updatedItems = item.documentPartageGroupes.filter((val) => val !== rowData);
        setItem((prevState) => ({ ...prevState, documentPartageGroupes: updatedItems }));
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
        MessageService.showSuccess(showToast, 'DocumentItem Deleted');
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
            setItem((prevState: any) => ({
                ...prevState,
                documentPartageUtilisateurs: item.documentPartageUtilisateurs
            }));
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
        setDocumentPartageUtilisateurs((prevDocumentPartageUtilisateurs) => ({
            ...prevDocumentPartageUtilisateurs,
            [name]: val,
        }));
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
        <Dialog visible={visible} maximizable style={{ width: '70vw' }} header={t("document.tabPan")} modal className="p-fluid"
            footer={itemDialogFooter} onHide={hideDialog}>
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("document.tabPan")}>
                    <div className="flex flex-column gap-2 px-3">
                        <p className="mt-3">
                            Il s'agit d'une URL temporaire avec des identifiants d'accès intégrés, permettant de partager  et de visualiser le document, valables pendant une période maximale de 7 jours.
                        </p>
                        <p>L'URL temporaire expire après la durée configurée.</p>
                        <h6>Durée de validité :</h6>
                        <div className="flex align-items-center">
                            <div className="mr-8">
                                <InputTime
                                    text="Jours"
                                    value={daysInput.toString()}
                                    onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                        setDaysInput(+e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mr-8">
                                <InputTime
                                    text="Heures"
                                    value={hoursInput.toString()}
                                    onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                        setHoursInput(+e.target.value);
                                    }}
                                />
                            </div>
                            <div className="mr-8">
                                <InputTime
                                    text="Minutes"
                                    value={minutesInput.toString()}
                                    onChangeValue={(e: ChangeEvent<HTMLInputElement>) => {
                                        setMinutesInput(+e.target.value);
                                    }}
                                />
                            </div>
                            <Button
                                label="Génerer le lien"
                                className="w-2"
                                onClick={(event) => {
                                    navigator.clipboard.writeText(linkValue);
                                }}
                            />
                        </div>
                        <div className="flex gap-1 mt-3">
                            <InputText value={linkValue} disabled />
                            <Button
                                className="w-1"
                                icon="pi pi-copy"
                                onClick={(event) => {
                                    navigator.clipboard.writeText(linkValue);
                                }}
                            />
                        </div>
                    </div>
                </TabPanel>
                <TabPanel header={t("document.documentPartageGroupes")}>
                    <div>
                        <div className="grid">
                            <div className="field col-4">
                                <label htmlFor="groupe">{t("documentPartageGroupe.groupe")}</label>
                                <Dropdown id="groupeDropdown" value={documentPartageGroupes.groupe}
                                    options={groupes}
                                    autoFocus required
                                    onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'groupe')}
                                    placeholder="Sélectionnez un groupe" filter
                                    filterPlaceholder="Rechercher un groupe" optionLabel="libelle" />
                            </div>
                            <div className="field col-4">
                                <label htmlFor="accessShare">{t("documentPartageGroupe.accessShare")}</label>
                                <Dropdown id="accessShareDropdown" value={documentPartageGroupes.accessShare}
                                    options={accessShares}
                                    onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'accessShare')}
                                    showClear
                                    placeholder="Sélectionnez un accessShare" filter
                                    filterPlaceholder="Rechercher un accessShare" optionLabel="libelle" />
                            </div>
                            <div className="field col-4">
                                <label htmlFor="dateShare">{t("documentPartageGroupe.dateShare")}</label>
                                <Calendar id="dateShare" value={adaptDate(documentPartageGroupes?.dateShare)}
                                    onChange={(e) => onInputDateChangeDocumentPartageGroupes(e, 'dateShare')}
                                    dateFormat="dd/mm/yy" showIcon={true} disabled />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="description">{t("documentPartageGroupe.description")}</label>
                                <InputTextarea id="description" value={documentPartageGroupes.description}
                                    onChange={(e) => onInputTextChangeDocumentPartageGroupes(e, 'description')}
                                    className={classNames({ 'p-invalid': submitted && !item.documentPartageGroupes })} />
                            </div>
                            <div className="field col-2">
                                <Button icon="pi pi-plus" label="Ajouter" onClick={addDocumentPartageGroupes} />
                            </div>
                        </div>
                        <div className="card">
                            <DataTable value={item.documentPartageGroupes} tableStyle={{ minWidth: '50rem' }}
                                dataKey="id">
                                <Column field="groupe.libelle" header={t("documentPartageGroupe.groupe")}></Column>
                                <Column field="dateShare" header={t("documentPartageGroupe.dateShare")}
                                    body={formateDate("dateShare")}></Column>
                                <Column field="accessShare.libelle"
                                    header={t("documentPartageGroupe.accessShare")}></Column>
                                <Column field="description"
                                    header={t("documentPartageGroupe.description")}></Column>
                                <Column header="Actions" body={(rowData) => (
                                    <div>
                                        <Button icon="pi pi-times" severity="warning"
                                            className="mr-2 p-button-danger"
                                            onClick={() => deleteDocumentPartageGroupes(rowData)} />
                                        {/* <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"
                                            onClick={() => editDocumentPartageGroupes(rowData)} /> */}
                                    </div>
                                )}></Column>
                            </DataTable>
                        </div>
                    </div>
                    {/* <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header="Creation">
                        </TabPanel>
                        <TabPanel header="Liste">
                        </TabPanel>
                    </TabView> */}
                </TabPanel>
                <TabPanel header={t("document.documentPartageUtilisateurs")}>
                    <div>
                        <div className="grid">
                            <div className="field col-4">
                                <label htmlFor="utilisateur">{t("documentPartageUtilisateur.utilisateur")}</label>
                                <Dropdown id="utilisateurDropdown" value={documentPartageUtilisateurs.utilisateur}
                                    options={utilisateurs}
                                    autoFocus
                                    onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'utilisateur')}
                                    placeholder="Sélectionnez un utilisateur" filter
                                    filterPlaceholder="Rechercher un utilisateur" optionLabel="nom" />
                            </div>
                            <div className="field col-4">
                                <label htmlFor="accessShare">{t("documentPartageUtilisateur.accessShare")}</label>
                                <Dropdown id="accessShareDropdown" value={documentPartageUtilisateurs.accessShare}
                                    options={accessShares}
                                    onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'accessShare')}
                                    placeholder="Sélectionnez un accessShare" filter
                                    filterPlaceholder="Rechercher un accessShare" optionLabel="libelle" />
                            </div>
                            <div className="field col-4">
                                <label htmlFor="dateShare">{t("documentPartageUtilisateur.dateShare")}</label>
                                <Calendar id="dateShare" value={adaptDate(documentPartageUtilisateurs?.dateShare)}
                                    onChange={(e) => onInputDateChangeDocumentPartageUtilisateurs(e, 'dateShare')}
                                    dateFormat="dd/mm/yy" showIcon={true} disabled />
                            </div>
                            <div className="field col-12">
                                <label htmlFor="description">{t("documentPartageUtilisateur.description")}</label>
                                <InputTextarea id="description" value={documentPartageUtilisateurs.description}
                                    onChange={(e) => onInputTextChangeDocumentPartageUtilisateurs(e, 'description')}
                                    className={classNames({ 'p-invalid': submitted && !item.documentPartageUtilisateurs })} />
                            </div>
                            <div className="field col-2">
                                <Button icon="pi pi-plus" label="Ajouter" onClick={addDocumentPartageUtilisateurs} />
                            </div>
                        </div>
                        <div className="card">
                            <DataTable value={item.documentPartageUtilisateurs} tableStyle={{ minWidth: '50rem' }}
                                dataKey="id">
                                <Column field="utilisateur.nom"
                                    header={t("documentPartageUtilisateur.utilisateur")}></Column>
                                <Column field="dateShare" header={t("documentPartageUtilisateur.dateShare")}
                                    body={formateDate("dateShare")}></Column>
                                <Column field="accessShare.libelle"
                                    header={t("documentPartageUtilisateur.accessShare")}></Column>
                                <Column field="description"
                                    header={t("documentPartageUtilisateur.description")}></Column>
                                <Column header="Actions" body={(rowData) => (
                                    <div>
                                        <Button icon="pi pi-times" severity="warning"
                                            className="mr-2 p-button-danger"
                                            onClick={() => deleteDocumentPartageUtilisateurs(rowData)} />
                                        {/* <Button icon="pi pi-pencil" rounded severity="success" className="mr-2"
                                            onClick={() => editDocumentPartageUtilisateurs(rowData)} /> */}
                                    </div>
                                )}></Column>
                            </DataTable>
                        </div>
                    </div>
                    {/* <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header="Creation">
                        </TabPanel>
                        <TabPanel header="Liste">
                        </TabPanel>
                    </TabView> */}
                </TabPanel>
            </TabView>
        </Dialog >
    );
};
export default Share;


const InputTime = ({ value, text, onChangeValue }: InputType) => (
    <div className="flex align-items-center justify-content-center gap-2">
        <InputText
            keyfilter="int"
            style={{ width: "35px" }}
            value={value}
            defaultValue={0}
            onChange={onChangeValue}
        />
        <p>{text}</p>
    </div>
);

interface InputType {
    value?: string;
    text: string;
    onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void;
}


