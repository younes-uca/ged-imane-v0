import {MessageService} from 'app/zynerator/service/MessageService';
import {Button} from 'primereact/button';
import {Calendar, CalendarChangeEvent} from 'primereact/calendar';
import {Column} from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import {Dialog} from 'primereact/dialog';
import {Dropdown, DropdownChangeEvent} from 'primereact/dropdown';
import {FileUpload} from 'primereact/fileupload';
import {InputNumber} from 'primereact/inputnumber';
import {InputSwitchChangeEvent} from 'primereact/inputswitch';
import {InputText} from 'primereact/inputtext';
import {InputTextarea} from 'primereact/inputtextarea';
import {TabPanel, TabView} from 'primereact/tabview';
import {classNames} from 'primereact/utils';
import React, {useEffect, useState} from 'react';

import {DocumentCriteria} from "app/controller/criteria/DocumentCriteria.model";
import {DocumentDto} from 'app/controller/model/Document.model';
import {DocumentAdminService} from 'app/controller/service/admin/DocumentAdminService.service';

import useCreateHook from "app/component/zyhook/useCreate.hook";
import {AccessShareDto} from 'app/controller/model/AccessShare.model';
import {DocumentCategorieDto} from 'app/controller/model/DocumentCategorie.model';
import {DocumentCategorieModelDto} from 'app/controller/model/DocumentCategorieModel.model';
import {DocumentIndexElementDto} from 'app/controller/model/DocumentIndexElement.model';
import {DocumentPartageGroupeDto} from 'app/controller/model/DocumentPartageGroupe.model';
import {DocumentPartageUtilisateurDto} from 'app/controller/model/DocumentPartageUtilisateur.model';
import {DocumentStateDto} from 'app/controller/model/DocumentState.model';
import {DocumentTagDto} from 'app/controller/model/DocumentTag.model';
import {DocumentTypeDto} from 'app/controller/model/DocumentType.model';
import {EntiteAdministrativeDto} from 'app/controller/model/EntiteAdministrative.model';
import {GroupeDto} from 'app/controller/model/Groupe.model';
import {IndexElementDto} from 'app/controller/model/IndexElement.model';
import {TagDto} from 'app/controller/model/Tag.model';
import {UtilisateurDto} from 'app/controller/model/Utilisateur.model';
import {AccessShareAdminService} from 'app/controller/service/admin/AccessShareAdminService.service';
import {DocumentCategorieAdminService} from 'app/controller/service/admin/DocumentCategorieAdminService.service';
import {
    DocumentCategorieModelAdminService
} from 'app/controller/service/admin/DocumentCategorieModelAdminService.service';
import {DocumentIndexElementAdminService} from 'app/controller/service/admin/DocumentIndexElementAdminService.service';
import {
    DocumentPartageGroupeAdminService
} from 'app/controller/service/admin/DocumentPartageGroupeAdminService.service';
import {
    DocumentPartageUtilisateurAdminService
} from 'app/controller/service/admin/DocumentPartageUtilisateurAdminService.service';
import {DocumentStateAdminService} from 'app/controller/service/admin/DocumentStateAdminService.service';
import {DocumentTagAdminService} from 'app/controller/service/admin/DocumentTagAdminService.service';
import {DocumentTypeAdminService} from 'app/controller/service/admin/DocumentTypeAdminService.service';
import {EntiteAdministrativeAdminService} from 'app/controller/service/admin/EntiteAdministrativeAdminService.service';
import {GroupeAdminService} from 'app/controller/service/admin/GroupeAdminService.service';
import {IndexElementAdminService} from 'app/controller/service/admin/IndexElementAdminService.service';
import {TagAdminService} from 'app/controller/service/admin/TagAdminService.service';
import {UtilisateurAdminService} from 'app/controller/service/admin/UtilisateurAdminService.service';
import axios from 'axios';
import {TFunction} from "i18next";
import {Toast} from "primereact/toast";
import {AuthService} from "../../../../../../zynerator/security/Auth.service";
import {
    DocumentCategorieIndexAdminService
} from "../../../../../../controller/service/admin/DocumentCategorieIndexAdminService.service";


type DocumentCreateAdminType = {
    visible: boolean,
    onClose: () => void,
    add: (item: DocumentDto) => void,
    showToast: React.Ref<Toast>,
    list: DocumentDto[],
    service: DocumentAdminService,
    t: TFunction
}
const Create: React.FC<DocumentCreateAdminType> = ({visible, onClose, add, showToast, list, service, t}) => {


    const authService = new AuthService();
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
        onTabChange,
        onDropdownChange,
        hideDialog,
        saveItem,
        formateDate
    } = useCreateHook<DocumentDto, DocumentCriteria>({list, emptyItem, onClose, add, showToast, service, isFormValid})

    const [documentFile, setDocumentFile] = useState<File>({} as File);
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

    const documentCategorieIndexAdminService = new DocumentCategorieIndexAdminService();
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
        documentTypeAdminService.getList().then(({data}) => setDocumentTypes(data)).catch(error => console.log(error));
        documentStateAdminService.getList().then(({data}) => setDocumentStates(data)).catch(error => console.log(error));
        documentCategorieAdminService.getList().then(({data}) => setDocumentCategories(data)).catch(error => console.log(error));
        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        entiteAdministrativeAdminService.getList().then(({data}) => setEntiteAdministratives(data)).catch(error => console.log(error));
        documentCategorieModelAdminService.getList().then(({data}) => setDocumentCategorieModels(data)).catch(error => console.log(error));
        indexElementAdminService.getList().then(({data}) => setIndexElements(data)).catch(error => console.log(error));
        groupeAdminService.getList().then(({data}) => setGroupes(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));
        utilisateurAdminService.getList().then(({data}) => setUtilisateurs(data)).catch(error => console.log(error));
        accessShareAdminService.getList().then(({data}) => setAccessShares(data)).catch(error => console.log(error));
    }, []);


    const prepareDocumentTag = (tag: TagDto) => {
        const documentTag = new DocumentTagDto();
        documentTag.tag = tag;
        return documentTag;
    }

    const saveItemOverride = () => {
        const documentFormData = new FormData();
        documentFormData.append("file", documentFile);
        documentFormData.append("documentDTO", JSON.stringify(item));

        setSubmitted(true);
        if (isFormValid()) {
            service.saveFormData(documentFormData).then(({data}) => {
                add(item);
                MessageService.showSuccess(showToast, "Création!", "Opération faite avec success.");
                onClose();
                setSubmitted(false);
            });
        }
    }

    const onUpload = (event: any) => {
        alert("alert upload")
        // const entiteAdministrative = item.entiteAdministrative.libelle;
        // const user = item.utilisateur.nom
        // const minioFormData = new FormData();
        // minioFormData.append('file', event.files[0]);
        // minioFormData.append('superior', user)
        // minioFormData.append('entity', entiteAdministrative)
        // axios.post('http://localhost:8037/minio/upload/file-structured/ged', minioFormData).then(response => {
        //     console.log('Upload successful:', response.data);
        // }).catch(error => {
        //     console.error('Upload error:', error);
        // });

        setDocumentFile(event.files[0])
        const ocrFormData = new FormData();
        ocrFormData.append('destinationLanguage', 'fra');
        ocrFormData.append('image', event.files[0])

        axios.post('http://34.125.71.106:8038/api/admin/ocr/', ocrFormData).then(response => {
            console.log('OCR successful:', response.data);
            setItem({...item, content: response.data});
        }).catch(error => {
            console.error('OCR error:', error);
        });
    }

    const addDocumentIndexElements = () => {
        setSubmitted(true);
        if (item.documentIndexElements == null)
            item.documentIndexElements = new Array<DocumentIndexElementDto>();
        let _item = documentIndexElements;
        if (!_item.id) {
            item.documentIndexElements.push(_item);
            MessageService.showSuccess(showToast, "Création!", 'DocumentIndexElements Created');
            setItem((prevState: any) => ({...prevState, documentIndexElements: item.documentIndexElements}));
        } else {
            const updatedItems = item.documentIndexElements.map((item) => item.id === documentIndexElements.id ? {...documentIndexElements} : item);
            MessageService.showSuccess(showToast, "Mise à jour!", 'DocumentIndexElements Updated');
            setItem((prevState: any) => ({...prevState, documentIndexElements: updatedItems}));
        }
        setDocumentIndexElements(new DocumentIndexElementDto());
    };

    const deleteDocumentIndexElements = (rowData: any) => {
        const updatedItems = item.documentIndexElements.filter((val) => val !== rowData);
        setItem((prevState) => ({...prevState, documentIndexElements: updatedItems}));
        setDocumentIndexElements(new DocumentIndexElementDto());
        MessageService.showSuccess(showToast, "Suppression", 'DocumentItem Deleted');
    };

    const editDocumentIndexElements = (rowData: any) => {
        setActiveTab(0);
        setDocumentIndexElements(rowData);

    };

    const onInputNumerChangeDocumentIndexElements = (e: any, name: string) => {
        const val = e.value || 0;
        setDocumentIndexElements((prevDocumentIndexElements) => ({...prevDocumentIndexElements, [name]: val,}));
    };
    const onDropdownChangeDocumentIndexElements = (e: any, field: string) => {
        setDocumentIndexElements((prevState) => ({...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentIndexElements = (e: InputSwitchChangeEvent, name: string) => {
        const val = e.value;
        setDocumentIndexElements((prevItem) => ({...prevItem, [name]: val,}));
    };

    const onInputDateChangeDocumentIndexElements = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentIndexElements({...documentIndexElements, [name]: val})
    };

    const onInputTextChangeDocumentIndexElements = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentIndexElements({...documentIndexElements, [name]: val})
    };
    const addDocumentPartageGroupes = () => {
        setSubmitted(true);
        if (item.documentPartageGroupes == null)
            item.documentPartageGroupes = new Array<DocumentPartageGroupeDto>();
        let _item = documentPartageGroupes;
        if (!_item.id) {
            item.documentPartageGroupes.push(_item);
            MessageService.showSuccess(showToast, "Création!", 'DocumentPartageGroupes Created');
            setItem((prevState: any) => ({...prevState, documentPartageGroupes: item.documentPartageGroupes}));
        } else {
            const updatedItems = item.documentPartageGroupes.map((item) => item.id === documentPartageGroupes.id ? {...documentPartageGroupes} : item);
            MessageService.showSuccess(showToast, "Mise à jour!", 'DocumentPartageGroupes Updated');
            setItem((prevState: any) => ({...prevState, documentPartageGroupes: updatedItems}));
        }
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
    };

    const deleteDocumentPartageGroupes = (rowData: any) => {
        const updatedItems = item.documentPartageGroupes.filter((val) => val !== rowData);
        setItem((prevState) => ({...prevState, documentPartageGroupes: updatedItems}));
        setDocumentPartageGroupes(new DocumentPartageGroupeDto());
        MessageService.showSuccess(showToast, "Suppression!", 'DocumentItem Deleted');
    };

    const editDocumentPartageGroupes = (rowData: any) => {
        setActiveTab(0);
        setDocumentPartageGroupes(rowData);

    };

    const onInputNumerChangeDocumentPartageGroupes = (e: any, name: string) => {
        const val = e.value || 0;
        setDocumentPartageGroupes((prevDocumentPartageGroupes) => ({...prevDocumentPartageGroupes, [name]: val,}));
    };
    const onDropdownChangeDocumentPartageGroupes = (e: any, field: string) => {
        setDocumentPartageGroupes((prevState) => ({...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentPartageGroupes = (e: InputSwitchChangeEvent, name: string) => {
        const val = e.value;
        setDocumentPartageGroupes((prevItem) => ({...prevItem, [name]: val,}));
    };

    const onInputDateChangeDocumentPartageGroupes = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageGroupes({...documentPartageGroupes, [name]: val})
    };

    const onInputTextChangeDocumentPartageGroupes = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageGroupes({...documentPartageGroupes, [name]: val})
    };
    const addDocumentPartageUtilisateurs = () => {
        setSubmitted(true);
        if (item.documentPartageUtilisateurs == null)
            item.documentPartageUtilisateurs = new Array<DocumentPartageUtilisateurDto>();
        let _item = documentPartageUtilisateurs;
        if (!_item.id) {
            item.documentPartageUtilisateurs.push(_item);
            MessageService.showSuccess(showToast, "Création!", 'DocumentPartageUtilisateurs Created');
            setItem((prevState: any) => ({
                ...prevState,
                documentPartageUtilisateurs: item.documentPartageUtilisateurs
            }));
        } else {
            const updatedItems = item.documentPartageUtilisateurs.map((item) => item.id === documentPartageUtilisateurs.id ? {...documentPartageUtilisateurs} : item);
            MessageService.showSuccess(showToast, "Mise à jour!", 'DocumentPartageUtilisateurs Updated');
            setItem((prevState: any) => ({...prevState, documentPartageUtilisateurs: updatedItems}));
        }
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
    };

    const deleteDocumentPartageUtilisateurs = (rowData: any) => {
        const updatedItems = item.documentPartageUtilisateurs.filter((val) => val !== rowData);
        setItem((prevState) => ({...prevState, documentPartageUtilisateurs: updatedItems}));
        setDocumentPartageUtilisateurs(new DocumentPartageUtilisateurDto());
        MessageService.showSuccess(showToast, "Suppression!", 'DocumentItem Deleted');
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
        setDocumentPartageUtilisateurs((prevState) => ({...prevState, [field]: e.value}));
    };

    const onBooleanInputChangeDocumentPartageUtilisateurs = (e: InputSwitchChangeEvent, name: string) => {
        const val = e.value;
        setDocumentPartageUtilisateurs((prevItem) => ({...prevItem, [name]: val,}));
    };

    const onInputDateChangeDocumentPartageUtilisateurs = (e: CalendarChangeEvent, name: string) => {
        const val = e.value || '';
        setDocumentPartageUtilisateurs({...documentPartageUtilisateurs, [name]: val})
    };

    const onInputTextChangeDocumentPartageUtilisateurs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setDocumentPartageUtilisateurs({...documentPartageUtilisateurs, [name]: val})
    };

    const itemDialogFooter = (<>
            <Button label={t("cancel")} icon="pi pi-times" text onClick={hideDialog}/>
            <Button label={t("save")} icon="pi pi-check" onClick={saveItemOverride}/> </>
    );


    const onCategorieChange = (e: DropdownChangeEvent, field: string) => {
        setItem((prevState) => ({...prevState, [field]: e.value}));
        console.log(e.value)
        documentCategorieIndexAdminService.findByDocumentCategorieId(e.value.id).then(({data}) => setIndexElements(data.map(e => e.indexElement))).catch(error => console.log(error));
    };

    return (
        <Dialog visible={visible} maximizable style={{width: '70vw'}} header={t("document.tabPan")} modal
                className="p-fluid" footer={itemDialogFooter} onHide={hideDialog}>
            <TabView activeIndex={activeIndex} onTabChange={onTabChange}>
                <TabPanel header={t("document.tabPan")}>
                    <div className="formgrid grid">
                        <div className="field col-4">
                            <label htmlFor="reference">{t("document.reference")}</label>
                            <InputText id="reference" value={item.reference}
                                       onChange={(e) => onInputTextChange(e, 'reference')} required
                                       className={classNames({'p-invalid': submitted && !item.reference})} autoFocus/>
                            {submitted && !item.reference &&
                                <small className="p-invalid">Reference is required.</small>}
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentType">{t("document.documentType")}</label>
                            <Dropdown showClear id="documentTypeDropdown" value={item.documentType}
                                      options={documentTypes} onChange={(e) => onDropdownChange(e, 'documentType')}
                                      placeholder={t("document.documentTypePlaceHolder")} filter
                                      filterPlaceholder={t("document.documentTypePlaceHolderFilter")}
                                      optionLabel="libelle"/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentState">{t("document.documentState")}</label>
                            <Dropdown showClear id="documentStateDropdown" value={item.documentState}
                                      options={documentStates} onChange={(e) => onDropdownChange(e, 'documentState')}
                                      placeholder={t("document.documentStatePlaceHolder")} filter
                                      filterPlaceholder={t("document.documentStatePlaceHolderFilter")}
                                      optionLabel="libelle"/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="documentCategorie">{t("document.documentCategorie")}</label>
                            <Dropdown showClear id="documentCategorieDropdown" value={item.documentCategorie}
                                      options={documentCategories}
                                      onChange={(e) => onCategorieChange(e, 'documentCategorie')}
                                      placeholder={t("document.documentCategoriePlaceHolder")} filter
                                      filterPlaceholder={t("document.documentCategoriePlaceHolderFilter")}
                                      optionLabel="libelle"/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="uploadDate">{t("document.uploadDate")}</label>
                            <Calendar id="uploadDate" value={item.uploadDate}
                                      onChange={(e) => onInputDateChange(e, 'uploadDate')} dateFormat="dd/mm/yy"
                                      showIcon={true}/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="size">{t("document.size")}</label>
                            <InputNumber id="size" value={item.size} onChange={(e) => onInputNumerChange(e, 'size')}/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="utilisateur">{t("document.utilisateur")}</label>
                            <Dropdown showClear id="utilisateurDropdown" value={item.utilisateur} options={utilisateurs}
                                      onChange={(e) => onDropdownChange(e, 'utilisateur')}
                                      placeholder={t("document.utilisateurPlaceHolder")} filter
                                      filterPlaceholder={t("document.utilisateurPlaceHolderFilter")} optionLabel="nom"/>
                        </div>
                        <div className="field col-4">
                            <label htmlFor="entiteAdministrative">{t("document.entiteAdministrative")}</label>
                            <Dropdown showClear id="entiteAdministrativeDropdown" value={item.entiteAdministrative}
                                      options={entiteAdministratives}
                                      onChange={(e) => onDropdownChange(e, 'entiteAdministrative')}
                                      placeholder={t("document.entiteAdministrativePlaceHolder")} filter
                                      filterPlaceholder={t("document.entiteAdministrativePlaceHolderFilter")}
                                      optionLabel="libelle"/>
                        </div>
                        <div className="field col-12">
                            <FileUpload chooseLabel="Choisir un fichier"
                                        uploadLabel="Traitement OCR" cancelLabel="Annuler" customUpload
                                        uploadHandler={onUpload} maxFileSize={1000000}/>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="content">{t("document.content")}</label>
                            <span className="p-float-label">
                                <InputTextarea id="content" value={item.content}
                                               onChange={(e) => onInputTextChange(e, 'content')} rows={8} cols={30}/>
                            </span>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="description">{t("document.description")}</label>
                            <span className="p-float-label">
                                <InputTextarea id="description" value={item.description}
                                               onChange={(e) => onInputTextChange(e, 'description')} rows={5}
                                               cols={30}/>
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
                                <Dropdown id="indexElementDropdown" value={documentIndexElements.indexElement}
                                          options={indexElements}
                                          onChange={(e) => onDropdownChangeDocumentIndexElements(e, 'indexElement')}
                                          placeholder={t("documentIndexElement.indexElementPlaceHolder")} filter
                                          filterPlaceholder={t("documentIndexElement.indexElementPlaceHolderFilter")}
                                          optionLabel="libelle" autoFocus/>
                            </div>
                            {/* <div className="field col-8">
                                <label htmlFor="description">{t("documentIndexElement.description")}</label>
                                <InputText id="description" value={documentIndexElements.description}
                                           onChange={(e) => onInputTextChangeDocumentIndexElements(e, 'description')}
                                           className={classNames({'p-invalid': submitted && !item.documentIndexElements})}/>
                            </div> */}
                            <div className="field col-12">
                                <label htmlFor="value">{t("documentIndexElement.value")}</label>
                                <InputTextarea id="value" value={documentIndexElements.value}
                                               onChange={(e) => onInputTextChangeDocumentIndexElements(e, 'value')}
                                               className={classNames({'p-invalid': submitted && !item.documentIndexElements})}
                                               rows={4}/>
                            </div>

                            <div className="field col-2">
                                <Button icon="pi pi-plus" label="Sauvegarder" onClick={addDocumentIndexElements}/>
                            </div>
                        </div>
                        <div className="card">
                            <DataTable value={item.documentIndexElements} tableStyle={{minWidth: '50rem'}} dataKey="id">
                                <Column field="indexElement.libelle"
                                        header={t("documentIndexElement.indexElement")}></Column>
                                <Column field="value" header={t("documentIndexElement.value")}></Column>
                                <Column field="description" header={t("documentIndexElement.description")} hidden></Column>
                                <Column header={t("actions")} body={(rowData) => (<div>
                                    <Button icon="pi pi-times" severity="warning" className="mr-2 p-button-danger"
                                            onClick={() => deleteDocumentIndexElements(rowData)}/>
                                    {/* <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editDocumentIndexElements(rowData)} />  */}
                                </div>)}></Column>
                            </DataTable>
                        </div>
                    </div>
                    {/* <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header={t("document.documentIndexElements")}>
                        </TabPanel>
                        <TabPanel header={t("list")}>
                        </TabPanel>
                    </TabView> */}
                </TabPanel>
                {/* <TabPanel header={t("document.documentPartageGroupes")}>
                    <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header={t("creation")}>
                            <div className="grid">
                                <div className="field col-6">
                                    <label htmlFor="groupe">{t("documentPartageGroupe.groupe")}</label>
                                    <Dropdown id="groupeDropdown" value={documentPartageGroupes.groupe} options={groupes} onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'groupe')} placeholder={t("documentPartageGroupe.groupePlaceHolder")} filter filterPlaceholder={t("documentPartageGroupe.groupePlaceHolderFilter")} optionLabel="libelle" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="dateShare">{t("documentPartageGroupe.dateShare")}</label>
                                    <Calendar id="dateShare" value={documentPartageGroupes.dateShare} onChange={(e) => onInputDateChangeDocumentPartageGroupes(e, 'dateShare')} dateFormat="dd/mm/yy" showIcon={true} />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="accessShare">{t("documentPartageGroupe.accessShare")}</label>
                                    <Dropdown id="accessShareDropdown" value={documentPartageGroupes.accessShare} options={accessShares} onChange={(e) => onDropdownChangeDocumentPartageGroupes(e, 'accessShare')} placeholder={t("documentPartageGroupe.accessSharePlaceHolder")} filter filterPlaceholder={t("documentPartageGroupe.accessSharePlaceHolderFilter")} optionLabel="libelle" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="description">{t("documentPartageGroupe.description")}</label>
                                    <InputText id="description" value={documentPartageGroupes.description} onChange={(e) => onInputTextChangeDocumentPartageGroupes(e, 'description')} required className={classNames({ 'p-invalid': submitted && !item.documentPartageGroupes })} />
                                </div>
                                <div className="field col-1">
                                    <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addDocumentPartageGroupes} />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header={t("list")}>
                            <div className="card">
                                <DataTable value={item.documentPartageGroupes} tableStyle={{ minWidth: '50rem' }} dataKey="id">
                                    <Column field="groupe.libelle" header={t("documentPartageGroupe.groupe")}></Column>
                                    <Column field="dateShare" header={t("documentPartageGroupe.dateShare")} body={formateDate("dateShare")}></Column>
                                    <Column field="accessShare.libelle" header={t("documentPartageGroupe.accessShare")}></Column>
                                    <Column field="description" header={t("documentPartageGroupe.description")} ></Column>
                                    <Column header={t("actions")} body={(rowData) => (<div>
                                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={() => deleteDocumentPartageGroupes(rowData)} />
                                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editDocumentPartageGroupes(rowData)} /> </div>)}></Column>
                                </DataTable>
                            </div>
                        </TabPanel>
                    </TabView>
                </TabPanel>
                <TabPanel header={t("document.documentPartageUtilisateurs")}>
                    <TabView activeIndex={activeTab} onTabChange={(e) => setActiveTab(e.index)}>
                        <TabPanel header={t("creation")}>
                            <div className="grid">
                                <div className="field col-6">
                                    <label htmlFor="utilisateur">{t("documentPartageUtilisateur.utilisateur")}</label>
                                    <Dropdown id="utilisateurDropdown" value={documentPartageUtilisateurs.utilisateur} options={utilisateurs} onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'utilisateur')} placeholder={t("documentPartageUtilisateur.utilisateurPlaceHolder")} filter filterPlaceholder={t("documentPartageUtilisateur.utilisateurPlaceHolderFilter")} optionLabel="nom" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="dateShare">{t("documentPartageUtilisateur.dateShare")}</label>
                                    <Calendar id="dateShare" value={documentPartageUtilisateurs.dateShare} onChange={(e) => onInputDateChangeDocumentPartageUtilisateurs(e, 'dateShare')} dateFormat="dd/mm/yy" showIcon={true} />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="accessShare">{t("documentPartageUtilisateur.accessShare")}</label>
                                    <Dropdown id="accessShareDropdown" value={documentPartageUtilisateurs.accessShare} options={accessShares} onChange={(e) => onDropdownChangeDocumentPartageUtilisateurs(e, 'accessShare')} placeholder={t("documentPartageUtilisateur.accessSharePlaceHolder")} filter filterPlaceholder={t("documentPartageUtilisateur.accessSharePlaceHolderFilter")} optionLabel="libelle" />
                                </div>
                                <div className="field col-6">
                                    <label htmlFor="description">{t("documentPartageUtilisateur.description")}</label>
                                    <InputText id="description" value={documentPartageUtilisateurs.description} onChange={(e) => onInputTextChangeDocumentPartageUtilisateurs(e, 'description')} required className={classNames({ 'p-invalid': submitted && !item.documentPartageUtilisateurs })} />
                                </div>
                                <div className="field col-1">
                                    <Button icon="pi pi-plus" label="OK" className="mt-4" onClick={addDocumentPartageUtilisateurs} />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header={t("list")}>
                            <div className="card">
                                <DataTable value={item.documentPartageUtilisateurs} tableStyle={{ minWidth: '50rem' }} dataKey="id">
                                    <Column field="utilisateur.nom" header={t("documentPartageUtilisateur.utilisateur")}></Column>
                                    <Column field="dateShare" header={t("documentPartageUtilisateur.dateShare")} body={formateDate("dateShare")}></Column>
                                    <Column field="accessShare.libelle" header={t("documentPartageUtilisateur.accessShare")}></Column>
                                    <Column field="description" header={t("documentPartageUtilisateur.description")} ></Column>
                                    <Column header={t("actions")} body={(rowData) => (<div>
                                        <Button icon="pi pi-times" rounded severity="warning" className="mr-2 p-button-danger" onClick={() => deleteDocumentPartageUtilisateurs(rowData)} />
                                        <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editDocumentPartageUtilisateurs(rowData)} /> </div>)}></Column>
                                </DataTable>
                            </div>
                        </TabPanel>
                    </TabView>
                </TabPanel> */}
            </TabView>
        </Dialog>
    );
};
export default Create;
