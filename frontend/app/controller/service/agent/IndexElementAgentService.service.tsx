import { AGENT_URL } from 'layout/AppConfig';
import AbstractService from "app/zynerator/service/AbstractService";

import {IndexElementDto} from 'app/controller/model/IndexElement.model';
import {IndexElementCriteria} from 'app/controller/criteria/IndexElementCriteria.model';

export class IndexElementAgentService extends AbstractService<IndexElementDto, IndexElementCriteria>{

    constructor() {
        super(AGENT_URL , 'indexElement/');
    }

};