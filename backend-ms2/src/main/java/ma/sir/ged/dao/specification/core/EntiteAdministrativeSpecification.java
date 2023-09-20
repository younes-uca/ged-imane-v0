package  ma.sir.ged.dao.specification.core;

import ma.sir.ged.zynerator.specification.AbstractSpecification;
import ma.sir.ged.dao.criteria.core.EntiteAdministrativeCriteria;
import ma.sir.ged.bean.core.EntiteAdministrative;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

public class EntiteAdministrativeSpecification extends  AbstractSpecification<EntiteAdministrativeCriteria, EntiteAdministrative>  {

    @Override
    public void constructPredicates() {
        addPredicateId("id", criteria);
        addPredicate("code", criteria.getCode(),criteria.getCodeLike());
        addPredicate("referenceGed", criteria.getReferenceGed(),criteria.getReferenceGedLike());
        addPredicate("libelle", criteria.getLibelle(),criteria.getLibelleLike());
        addPredicateFk("entiteAdministrativeParent","id", criteria.getEntiteAdministrativeParent()==null?null:criteria.getEntiteAdministrativeParent().getId());
        addPredicateFk("entiteAdministrativeParent","id", criteria.getEntiteAdministrativeParents());
        addPredicateFk("entiteAdministrativeParent","code", criteria.getEntiteAdministrativeParent()==null?null:criteria.getEntiteAdministrativeParent().getCode());
        addPredicateFk("chef","id", criteria.getChef()==null?null:criteria.getChef().getId());
        addPredicateFk("chef","id", criteria.getChefs());
        addPredicateFk("chef","email", criteria.getChef()==null?null:criteria.getChef().getEmail());
        addPredicateFk("entiteAdministrativeType","id", criteria.getEntiteAdministrativeType()==null?null:criteria.getEntiteAdministrativeType().getId());
        addPredicateFk("entiteAdministrativeType","id", criteria.getEntiteAdministrativeTypes());
        addPredicateFk("entiteAdministrativeType","code", criteria.getEntiteAdministrativeType()==null?null:criteria.getEntiteAdministrativeType().getCode());
    }

    public EntiteAdministrativeSpecification(EntiteAdministrativeCriteria criteria) {
        super(criteria);
    }

    public EntiteAdministrativeSpecification(EntiteAdministrativeCriteria criteria, boolean distinct) {
        super(criteria, distinct);
    }

}
