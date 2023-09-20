import {BaseCriteria} from 'app/zynerator/criteria/BaseCriteria.model';

import {DocumentStateCriteria} from './DocumentStateCriteria.model';
import {DocumentPartageGroupeCriteria} from './DocumentPartageGroupeCriteria.model';
import {DocumentTagCriteria} from './DocumentTagCriteria.model';
import {DocumentCategorieCriteria} from './DocumentCategorieCriteria.model';
import {DocumentIndexElementCriteria} from './DocumentIndexElementCriteria.model';
import {DocumentPartageUtilisateurCriteria} from './DocumentPartageUtilisateurCriteria.model';
import {DocumentCategorieModelCriteria} from './DocumentCategorieModelCriteria.model';
import {DocumentTypeCriteria} from './DocumentTypeCriteria.model';
import {EntiteAdministrativeCriteria} from './EntiteAdministrativeCriteria.model';
import {UtilisateurCriteria} from './UtilisateurCriteria.model';




export class DocumentCriteria  extends  BaseCriteria {

    public id: number;

    public reference: string;
    public referenceLike: string;
    public uploadDate: Date;
    public uploadDateFrom: Date;
    public uploadDateTo: Date;
     public annee: null | number;
     public anneeMin: null | number;
     public anneeMax: null | number;
     public semstre: null | number;
     public semstreMin: null | number;
     public semstreMax: null | number;
     public mois: null | number;
     public moisMin: null | number;
     public moisMax: null | number;
     public jour: null | number;
     public jourMin: null | number;
     public jourMax: null | number;
    public ocr: null | boolean;
    public content: string;
    public contentLike: string;
     public size: null | number;
     public sizeMin: null | number;
     public sizeMax: null | number;
    public description: string;
    public descriptionLike: string;
    public archive: null | boolean;
    public versionne: null | boolean;
  public documentType: DocumentTypeCriteria ;
  public documentTypes: Array<DocumentTypeCriteria> ;
  public documentState: DocumentStateCriteria ;
  public documentStates: Array<DocumentStateCriteria> ;
  public documentCategorie: DocumentCategorieCriteria ;
  public documentCategories: Array<DocumentCategorieCriteria> ;
  public utilisateur: UtilisateurCriteria ;
  public utilisateurs: Array<UtilisateurCriteria> ;
  public entiteAdministrative: EntiteAdministrativeCriteria ;
  public entiteAdministratives: Array<EntiteAdministrativeCriteria> ;
  public documentCategorieModel: DocumentCategorieModelCriteria ;
  public documentCategorieModels: Array<DocumentCategorieModelCriteria> ;
      public documentIndexElements: Array<DocumentIndexElementCriteria>;
      public documentPartageGroupes: Array<DocumentPartageGroupeCriteria>;
      public documentPartageUtilisateurs: Array<DocumentPartageUtilisateurCriteria>;
      public documentTags: Array<DocumentTagCriteria>;

    constructor() {
        super();
        this.reference = '';
        this.referenceLike = '';
        this.uploadDate = null;
        this.uploadDateFrom  = null;
        this.uploadDateTo = null;
        this.annee = null;
        this.anneeMin = null;
        this.anneeMax = null;
        this.semstre = null;
        this.semstreMin = null;
        this.semstreMax = null;
        this.mois = null;
        this.moisMin = null;
        this.moisMax = null;
        this.jour = null;
        this.jourMin = null;
        this.jourMax = null;
        this.ocr = null;
        this.content = '';
        this.contentLike = '';
        this.size = null;
        this.sizeMin = null;
        this.sizeMax = null;
        this.description = '';
        this.descriptionLike = '';
        this.archive = null;
        this.versionne = null;
        this.documentType = new DocumentTypeCriteria() ;
        this.documentTypes = new Array<DocumentTypeCriteria>() ;
        this.documentState = new DocumentStateCriteria() ;
        this.documentStates = new Array<DocumentStateCriteria>() ;
        this.documentCategorie = new DocumentCategorieCriteria() ;
        this.documentCategories = new Array<DocumentCategorieCriteria>() ;
        this.utilisateur = new UtilisateurCriteria() ;
        this.utilisateurs = new Array<UtilisateurCriteria>() ;
        this.entiteAdministrative = new EntiteAdministrativeCriteria() ;
        this.entiteAdministratives = new Array<EntiteAdministrativeCriteria>() ;
        this.documentCategorieModel = new DocumentCategorieModelCriteria() ;
        this.documentCategorieModels = new Array<DocumentCategorieModelCriteria>() ;
    }

}
