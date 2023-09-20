package ma.sir.ged.service.impl.collaborateur;


import ma.sir.ged.bean.core.DocumentType;
import ma.sir.ged.bean.history.DocumentTypeHistory;
import ma.sir.ged.dao.criteria.core.DocumentTypeCriteria;
import ma.sir.ged.dao.criteria.history.DocumentTypeHistoryCriteria;
import ma.sir.ged.dao.facade.core.DocumentTypeDao;
import ma.sir.ged.dao.facade.history.DocumentTypeHistoryDao;
import ma.sir.ged.dao.specification.core.DocumentTypeSpecification;
import ma.sir.ged.service.facade.collaborateur.DocumentTypeCollaborateurService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;






import java.util.List;
@Service
public class DocumentTypeCollaborateurServiceImpl extends AbstractServiceImpl<DocumentType,DocumentTypeHistory, DocumentTypeCriteria, DocumentTypeHistoryCriteria, DocumentTypeDao,
DocumentTypeHistoryDao> implements DocumentTypeCollaborateurService {



    public DocumentType findByReferenceEntity(DocumentType t){
        return  dao.findByCode(t.getCode());
    }






    public void configure() {
        super.configure(DocumentType.class,DocumentTypeHistory.class, DocumentTypeHistoryCriteria.class, DocumentTypeSpecification.class);
    }



    public DocumentTypeCollaborateurServiceImpl(DocumentTypeDao dao, DocumentTypeHistoryDao historyDao) {
        super(dao, historyDao);
    }

}