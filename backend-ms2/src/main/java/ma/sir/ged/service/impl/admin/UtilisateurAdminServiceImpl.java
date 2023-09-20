package ma.sir.ged.service.impl.admin;


import ma.sir.ged.bean.core.*;
import ma.sir.ged.bean.history.UtilisateurHistory;
import ma.sir.ged.dao.criteria.core.UtilisateurCriteria;
import ma.sir.ged.dao.criteria.history.UtilisateurHistoryCriteria;
import ma.sir.ged.dao.facade.core.UtilisateurDao;
import ma.sir.ged.dao.facade.history.UtilisateurHistoryDao;
import ma.sir.ged.dao.specification.core.UtilisateurSpecification;
import ma.sir.ged.service.facade.admin.*;
import ma.sir.ged.zynerator.security.bean.Role;
import ma.sir.ged.zynerator.security.service.facade.RoleService;
import ma.sir.ged.zynerator.security.service.facade.UserService;
import ma.sir.ged.zynerator.service.AbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UtilisateurAdminServiceImpl extends AbstractServiceImpl<Utilisateur, UtilisateurHistory, UtilisateurCriteria, UtilisateurHistoryCriteria, UtilisateurDao,
        UtilisateurHistoryDao> implements UtilisateurAdminService {


    public Utilisateur findByReferenceEntity(Utilisateur t) {
        return dao.findByEmail(t.getEmail());
    }

    public List<Utilisateur> findByGenderId(Long id) {
        return dao.findByGenderId(id);
    }

    public int deleteByGenderId(Long id) {
        return dao.deleteByGenderId(id);
    }

    public List<Utilisateur> findByEntiteAdministrativeId(Long id) {
        return dao.findByEntiteAdministrativeId(id);
    }

    public int deleteByEntiteAdministrativeId(Long id) {
        return dao.deleteByEntiteAdministrativeId(id);
    }


    @Override
    public Utilisateur update(Utilisateur t) {
        Utilisateur loadedUtilisateur = findById(t.getId());
        t.setPassword(loadedUtilisateur.getPassword());
        return super.update(t);
    }


    @Override
    public Utilisateur create(Utilisateur t) {
        if (findByUsername(t.getUsername()) != null || t.getPassword() == null) return null;
        t.setPassword(userService.cryptPassword(t.getPassword()));
        t.setEnabled(true);
        t.setAccountNonExpired(true);
        t.setAccountNonLocked(true);
        t.setCredentialsNonExpired(true);
        t.setPasswordChanged(false);
        if (t.getRoles() != null) {
            Collection<Role> roles = new ArrayList<Role>();
            for (Role role : t.getRoles()) {
                roles.add(roleService.save(role));
            }
            t.setRoles(roles);
        }
        Utilisateur mySaved = super.create(t);
        if (mySaved.getEntiteAdministrative() != null && mySaved.getEntiteAdministrative().getId() != null) {
            Long id = mySaved.getEntiteAdministrative().getId();
            EntiteAdministrative entiteAdministrative = entiteAdministrativeService.findById(id);
            if (entiteAdministrative != null) {
                Groupe groupe = groupeService.findByCode(entiteAdministrative.getCode());
                GroupeUtilisateur groupeUtilisateur = new GroupeUtilisateur();
                RoleUtilisateur roleUtilisateur = roleUtilisateurService.findOrSave(new RoleUtilisateur("membre"));
                EtatUtilisateur etatUtilisateur = etatUtilisateurService.findOrSave(new EtatUtilisateur("actif"));
                groupeUtilisateur.setEtatUtilisateur(etatUtilisateur);
                groupeUtilisateur.setRoleUtilisateur(roleUtilisateur);
                groupeUtilisateur.setUtilisateur(mySaved);
                groupeUtilisateur.setGroupe(groupe);
                groupeUtilisateur.setDateAjout(LocalDateTime.now());
                groupeUtilisateurService.create(groupeUtilisateur);
            }

        }
        return mySaved;
    }

    @Override
    public Utilisateur findByUsername(String username) {
        return dao.findByUsername(username);
    }

    public boolean changePassword(String username, String newPassword) {
        return userService.changePassword(username, newPassword);
    }

    public void configure() {
        super.configure(Utilisateur.class, UtilisateurHistory.class, UtilisateurHistoryCriteria.class, UtilisateurSpecification.class);
    }

    @Autowired
    private EtatUtilisateurAdminService etatUtilisateurService;
    @Autowired
    private RoleUtilisateurAdminService roleUtilisateurService;
    @Autowired
    private GroupeAdminService groupeService;
    @Autowired
    private GroupeUtilisateurAdminService groupeUtilisateurService;

    @Autowired
    private UserService userService;


    @Autowired
    private RoleService roleService;

    @Autowired
    private EntiteAdministrativeAdminService entiteAdministrativeService;
    @Autowired
    private GenderAdminService genderService;

    public UtilisateurAdminServiceImpl(UtilisateurDao dao, UtilisateurHistoryDao historyDao) {
        super(dao, historyDao);
    }

}