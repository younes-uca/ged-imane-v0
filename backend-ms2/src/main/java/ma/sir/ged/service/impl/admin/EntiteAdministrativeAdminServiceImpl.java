package ma.sir.ged.service.impl.admin;

import ma.sir.ged.bean.core.*;
import ma.sir.ged.bean.history.EntiteAdministrativeHistory;
import ma.sir.ged.dao.criteria.core.EntiteAdministrativeCriteria;
import ma.sir.ged.dao.criteria.history.EntiteAdministrativeHistoryCriteria;
import ma.sir.ged.dao.facade.core.EntiteAdministrativeDao;
import ma.sir.ged.dao.facade.history.EntiteAdministrativeHistoryDao;
import ma.sir.ged.dao.specification.core.EntiteAdministrativeSpecification;
import ma.sir.ged.service.facade.admin.*;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import ma.sir.ged.zynerator.util.ListUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EntiteAdministrativeAdminServiceImpl extends AbstractServiceImpl<EntiteAdministrative, EntiteAdministrativeHistory, EntiteAdministrativeCriteria, EntiteAdministrativeHistoryCriteria, EntiteAdministrativeDao,
        EntiteAdministrativeHistoryDao> implements EntiteAdministrativeAdminService {


    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Exception.class, readOnly = false)
    public EntiteAdministrative create(EntiteAdministrative t) {
        Groupe groupe = constructGroup(t);
        super.create(t);
        groupeService.create(groupe);
        if (t.getChef() != null) {
            t.getChef().setEntiteAdministrative(t);
            GroupeUtilisateur groupeUtilisateur = new GroupeUtilisateur();
            RoleUtilisateur roleUtilisateur = roleUtilisateurService.findOrSave(new RoleUtilisateur("admin"));
            EtatUtilisateur etatUtilisateur = etatUtilisateurService.findOrSave(new EtatUtilisateur("actif"));

            groupeUtilisateur.setUtilisateur(t.getChef());
            groupeUtilisateur.setEtatUtilisateur(etatUtilisateur);
            utilisateurService.create(t.getChef());
            groupeUtilisateur.setGroupe(groupe);
            groupeUtilisateur.setDateAjout(LocalDateTime.now());
            groupeUtilisateur.setRoleUtilisateur(roleUtilisateur);
            groupeUtilisateurService.create(groupeUtilisateur);
        }

        return t;
    }

    private Groupe constructGroup(EntiteAdministrative t) {
        Groupe groupe = new Groupe();
        groupe.setCode(t.getCode());
        groupe.setLibelle(t.getLibelle());
        groupe.setUtilisateur(t.getChef());
        return groupe;
    }


    public EntiteAdministrative findWithAssociatedLists(Long id) {
        EntiteAdministrative result = dao.findById(id).orElse(null);
        if (result != null && result.getId() != null) {
            result.setUtilisateurs(utilisateurService.findByEntiteAdministrativeId(id));
        }
        return result;
    }

    @Transactional
    public void deleteAssociatedLists(Long id) {
        utilisateurService.deleteByEntiteAdministrativeId(id);
    }


    public void updateWithAssociatedLists(EntiteAdministrative entiteAdministrative) {
        if (entiteAdministrative != null && entiteAdministrative.getId() != null) {
            List<List<Utilisateur>> resultUtilisateurs = utilisateurService.getToBeSavedAndToBeDeleted(utilisateurService.findByEntiteAdministrativeId(entiteAdministrative.getId()), entiteAdministrative.getUtilisateurs());
            utilisateurService.delete(resultUtilisateurs.get(1));
            ListUtil.emptyIfNull(resultUtilisateurs.get(0)).forEach(e -> e.setEntiteAdministrative(entiteAdministrative));
            utilisateurService.update(resultUtilisateurs.get(0), true);
        }
    }

    public EntiteAdministrative findByReferenceEntity(EntiteAdministrative t) {
        return dao.findByCode(t.getCode());
    }

    public List<EntiteAdministrative> findByEntiteAdministrativeParentId(Long id) {
        return dao.findByEntiteAdministrativeParentId(id);
    }

    public int deleteByEntiteAdministrativeParentId(Long id) {
        return dao.deleteByEntiteAdministrativeParentId(id);
    }

    public List<EntiteAdministrative> findByChefId(Long id) {
        return dao.findByChefId(id);
    }

    public int deleteByChefId(Long id) {
        return dao.deleteByChefId(id);
    }

    public List<EntiteAdministrative> findByEntiteAdministrativeTypeId(Long id) {
        return dao.findByEntiteAdministrativeTypeId(id);
    }

    public int deleteByEntiteAdministrativeTypeId(Long id) {
        return dao.deleteByEntiteAdministrativeTypeId(id);
    }


    public void configure() {
        super.configure(EntiteAdministrative.class, EntiteAdministrativeHistory.class, EntiteAdministrativeHistoryCriteria.class, EntiteAdministrativeSpecification.class);
    }


    @Autowired
    private EtatUtilisateurAdminService etatUtilisateurService;
    @Autowired
    private GroupeAdminService groupeService;
    @Autowired
    private GroupeUtilisateurAdminService groupeUtilisateurService;
    @Autowired
    private RoleUtilisateurAdminService roleUtilisateurService;
    @Autowired
    private UtilisateurAdminService utilisateurService;
    @Autowired
    private EntiteAdministrativeTypeAdminService entiteAdministrativeTypeService;

    public EntiteAdministrativeAdminServiceImpl(EntiteAdministrativeDao dao, EntiteAdministrativeHistoryDao historyDao) {
        super(dao, historyDao);
    }

}