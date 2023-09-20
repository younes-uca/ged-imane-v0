package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.DocumentIndexElementCriteria;
import ma.sir.ged.bean.core.DocumentIndexElement;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class DocumentIndexElementSpecification extends  AbstractSpecification<DocumentIndexElementCriteria, DocumentIndexElement>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("value", criteria.getValue(),criteria.getValueLike());
        addPredicateFk("indexElement","id", criteria.getIndexElement()==null?null:criteria.getIndexElement().getId());
        addPredicateFk("indexElement","id", criteria.getIndexElements());
        addPredicateFk("indexElement","code", criteria.getIndexElement()==null?null:criteria.getIndexElement().getCode());
        addPredicateFk("document","id", criteria.getDocument()==null?null:criteria.getDocument().getId());
        addPredicateFk("document","id", criteria.getDocuments());
        addPredicateFk("document","reference", criteria.getDocument()==null?null:criteria.getDocument().getReference());
    }

    public DocumentIndexElementSpecification(DocumentIndexElementCriteria criteria) {
        super(criteria);
    }

    public DocumentIndexElementSpecification(DocumentIndexElementCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
