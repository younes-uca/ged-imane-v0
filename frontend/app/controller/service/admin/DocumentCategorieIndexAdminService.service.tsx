import {ADMIN_URL} from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentCategorieIndexDto} from 'app/controller/model/DocumentCategorieIndex.model';
import {DocumentCategorieIndexCriteria} from 'app/controller/criteria/DocumentCategorieIndexCriteria.model';
import axios, {AxiosResponse} from "axios";

export class DocumentCategorieIndexAdminService extends AbstractService<DocumentCategorieIndexDto, DocumentCategorieIndexCriteria> {

    findByDocumentCategorieId(id: number): Promise<AxiosResponse<DocumentCategorieIndexDto[]>> {
        return axios.get(this._url + 'documentCategorieOptimized/id/' + id);
    }

    constructor() {
        super(ADMIN_URL, 'documentCategorieIndex/');
    }

};