import { ADMIN_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {DocumentCategorieIndexRuleDto} from 'app/controller/model/DocumentCategorieIndexRule.model';
import {DocumentCategorieIndexRuleCriteria} from 'app/controller/criteria/DocumentCategorieIndexRuleCriteria.model';

export class DocumentCategorieIndexRuleAdminService extends AbstractService<DocumentCategorieIndexRuleDto, DocumentCategorieIndexRuleCriteria>{

    constructor() {
        super(ADMIN_URL , 'documentCategorieIndexRule/');
    }

};