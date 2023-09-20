package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.DocumentCategorieModelCriteria;
import ma.sir.ged.bean.core.DocumentCategorieModel;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class DocumentCategorieModelSpecification extends  AbstractSpecification<DocumentCategorieModelCriteria, DocumentCategorieModel>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
        addPredicate("libelle", criteria.getLibelle(),criteria.getLibelleLike());
        addPredicate("referenceGed", criteria.getReferenceGed(),criteria.getReferenceGedLike());
        addPredicateFk("documentCategorie","id", criteria.getDocumentCategorie()==null?null:criteria.getDocumentCategorie().getId());
        addPredicateFk("documentCategorie","id", criteria.getDocumentCategories());
        addPredicateFk("documentCategorie","code", criteria.getDocumentCategorie()==null?null:criteria.getDocumentCategorie().getCode());
    }

    public DocumentCategorieModelSpecification(DocumentCategorieModelCriteria criteria) {
        super(criteria);
    }

    public DocumentCategorieModelSpecification(DocumentCategorieModelCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
