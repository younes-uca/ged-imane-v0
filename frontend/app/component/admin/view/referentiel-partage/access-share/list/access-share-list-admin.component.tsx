import { Button } from 'primereact/button';
import { Column } from 'primereact/column';


import useListHook from "app/component/zyhook/useListhook";
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Paginator } from 'primereact/paginator';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { useEffect } from 'react';


import { AccessShareCriteria } from 'app/controller/criteria/AccessShareCriteria.model';
import { AccessShareDto } from 'app/controller/model/AccessShare.model';
import { AccessShareAdminService } from 'app/controller/service/admin/AccessShareAdminService.service';


import { useTranslation } from 'react-i18next';

import Create from '../create/access-share-create-admin.component';
import Edit from '../edit/access-share-edit-admin.component';
import View from '../view/access-share-view-admin.component';


const List = () => {

    const { t } = useTranslation();

    const emptyItem = new AccessShareDto();
    const emptyCriteria = new AccessShareCriteria();
    const service = new AccessShareAdminService();


    const {
        items,
        showSearch,
        deleteItemDialog,
        item,
        selectedItems,
        setSelectedItems,
        hideDeleteItemDialog,
        globalFilter,
        setGlobalFilter,
        showCreateDialog,
        setShowCreateDialog,
        showEditDialog,
        setShowEditDialog,
        showViewDialog,
        setShowViewDialog,
        selectedItem,
        setSelectedItem,
        rows,
        totalRecords,
        criteria,
        setCriteria,
        first,
        fetchItems,
        toast,
        dt,
        findByCriteriaShow,
        handleCancelClick,
        confirmDeleteSelected,
        exportCSV,
        deleteItem,
        deleteItemDialogFooter,
        leftToolbarTemplate,
        rightToolbarTemplate,
        actionBodyTemplate,
        CustomBooleanCell,
        handleValidateClick,
        onPage,
        showCreateModal,
        showEditModal,
        showViewModal,
        add,
        update,
        confirmDeleteItem,
        statusBodyTemplate,
        formateDate,
        deleteSelectedItems,
        deleteItemsDialog,
        deleteItemsDialogFooter,
        hideDeleteItemsDialog
    } = useListHook<AccessShareDto, AccessShareCriteria>({ emptyItem, emptyCriteria, service, t })

    useEffect(() => {
        fetchItems(criteria);
    }, []);

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">{t("accessShare.header", { totalRecords: totalRecords })}</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left"><i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)}
                    placeholder={t("search")} /> </span>
        </div>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                    {findByCriteriaShow && (
                        <Card title={t("search")} className="mb-5">
                            <div className="grid">
                                <div className="flex flex-column col-3">
                                    <label className="mb-1" htmlFor="1">{t("accessShare.code")}</label>
                                    <InputText id="1" value={criteria.code} onChange={(e) => setCriteria({ ...criteria, code: e.target.value })} />
                                </div>
                                <div className="flex flex-column col-3">
                                    <label className="mb-1" htmlFor="2">{t("accessShare.libelle")}</label>
                                    <InputText id="2" value={criteria.libelle} onChange={(e) => setCriteria({ ...criteria, libelle: e.target.value })} />
                                </div>
                                <div className="flex flex-column col-3">
                                    <label className="mb-1" htmlFor="3">{t("accessShare.description")}</label>
                                    <InputText id="3" value={criteria.description} onChange={(e) => setCriteria({ ...criteria, description: e.target.value })} />
                                </div>
                            </div>
                            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end' }} >
                                <Button label={t("validate")} icon="pi pi-sort-amount-down" className="p-button-info mr-2" onClick={handleValidateClick} />
                                <Button label="Reinitialiser" className="p-button-secondary mr-2" icon="pi pi-times" onClick={handleCancelClick} />
                            </div>
                        </Card>
                    )}
                    <DataTable ref={dt} value={items} selection={selectedItems} onSelectionChange={(e) => setSelectedItems(e.value as AccessShareDto[])} dataKey="id" className="datatable-responsive" globalFilter={globalFilter} header={header} responsiveLayout="scroll" >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}> </Column><Column field="code" header={t("accessShare.code")} sortable></Column>
                        <Column field="libelle" header={t("accessShare.libelle")} sortable></Column>
                        <Column className='max-w-20rem' field="description" header={t("accessShare.description")} sortable></Column>
                        <Column header={t("actions")} body={actionBodyTemplate}></Column>
                    </DataTable>
                    <div className="p-d-flex p-ai-center p-jc-between">
                        <Paginator onPageChange={onPage} first={first} rows={rows} totalRecords={totalRecords} />
                    </div>
                    {showCreateDialog && <Create visible={showCreateDialog} onClose={() => setShowCreateDialog(false)} add={add} showToast={toast} list={items} service={service} t={t} />}

                    {showEditDialog && <Edit visible={showEditDialog} onClose={() => { setShowEditDialog(false); setSelectedItem(emptyItem); }} showToast={toast} selectedItem={selectedItem} update={update} list={items} service={service} t={t} />}

                    {showViewDialog && <View visible={showViewDialog} onClose={() => { setShowViewDialog(false); setSelectedItem(emptyItem); }} selectedItem={selectedItem} t={t} />}
                    <Dialog visible={deleteItemDialog} style={{ width: '450px' }} header={t("confirm")} modal footer={deleteItemDialogFooter} onHide={hideDeleteItemDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {item && (<span>{t("accessShare.deleteAccessShareConfirmationMessage")}</span>)}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteItemsDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteItemsDialogFooter} onHide={hideDeleteItemsDialog} >
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {item && <span>accessShare.deleteAccessSharesConfirmationMessage</span>}
                        </div>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};
export default List;

